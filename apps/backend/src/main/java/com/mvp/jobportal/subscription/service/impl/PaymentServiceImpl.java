package com.mvp.jobportal.subscription.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mvp.jobportal.common.exception.BadRequestException;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.subscription.dto.payment.PaymentCheckoutResponse;
import com.mvp.jobportal.subscription.dto.payment.PaymentRequest;
import com.mvp.jobportal.subscription.dto.payment.PaymentResponse;
import com.mvp.jobportal.subscription.dto.payment.PaymentVerificationRequest;
import com.mvp.jobportal.subscription.entity.Payment;
import com.mvp.jobportal.subscription.entity.UserSubscription;
import com.mvp.jobportal.subscription.enums.PaymentStatus;
import com.mvp.jobportal.subscription.enums.PlanStatus;
import com.mvp.jobportal.subscription.enums.SubscriptionStatus;
import com.mvp.jobportal.subscription.gateway.PaymentGatewayFactory;
import com.mvp.jobportal.subscription.gateway.PaymentGatewayService;
import com.mvp.jobportal.subscription.gateway.dto.GatewayOrderRequest;
import com.mvp.jobportal.subscription.gateway.dto.GatewayOrderResponse;
import com.mvp.jobportal.subscription.gateway.dto.GatewayVerificationRequest;
import com.mvp.jobportal.subscription.gateway.dto.GatewayVerificationResponse;
import com.mvp.jobportal.subscription.mapper.PaymentMapper;
import com.mvp.jobportal.subscription.repository.PaymentRepository;
import com.mvp.jobportal.subscription.repository.UserSubscriptionRepository;
import com.mvp.jobportal.subscription.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserSubscriptionRepository userSubscriptionRepository;
    private final PaymentMapper paymentMapper;
    private final PaymentGatewayFactory paymentGatewayFactory;

    @Override
    @Transactional
    public PaymentCheckoutResponse initiatePayment(UUID userId, PaymentRequest request) {
        UserSubscription subscription = userSubscriptionRepository
                .findByIdAndUser_Id(request.subscriptionId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found."));

        if (subscription.getStatus() != SubscriptionStatus.PENDING) {
            throw new BadRequestException("Payment can only be initiated for pending subscriptions.");
        }

        if (!subscription.getPricing().isActive()) {
            throw new BadRequestException("Selected pricing option is no longer active.");
        }

        if (subscription.getPlan().getStatus() != PlanStatus.ACTIVE) {
            throw new BadRequestException("Selected plan is no longer active.");
        }

        boolean paymentExists = paymentRepository.existsBySubscription_IdAndStatus(subscription.getId(),
                PaymentStatus.SUCCESS);

        if (paymentExists) {
            throw new BadRequestException("Payment has already been completed for this subscription.");
        }

        // Reusing same gateway order
        Payment existingPayment = paymentRepository
                .findFirstBySubscription_IdAndStatusOrderByCreatedAtDesc(
                        subscription.getId(),
                        PaymentStatus.INITIATED)
                .orElse(null);

        if (existingPayment != null) {
            PaymentGatewayService existingGateway = paymentGatewayFactory
                    .getGateway(existingPayment.getPaymentGateway());
            return paymentMapper.toCheckoutResponse(existingPayment, existingGateway.getGatewayKeyId());
        }

        // Validate selected payment gateway
        PaymentGatewayService gatewayService = paymentGatewayFactory.getGateway(request.paymentGateway());

        Payment payment = Payment.builder()
                .subscription(subscription)
                .amount(subscription.getAmountPaid())
                .currency(subscription.getCurrency())
                .paymentGateway(request.paymentGateway())
                .status(PaymentStatus.INITIATED)
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        // Create gateway order
        GatewayOrderResponse gatewayOrder = gatewayService.createOrder(
                GatewayOrderRequest.builder()
                        .paymentId(savedPayment.getId())
                        .amount(savedPayment.getAmount())
                        .currency(savedPayment.getCurrency())
                        .build());

        // Save Razorpay order ID
        savedPayment.setGatewayOrderId(gatewayOrder.gatewayOrderId());

        paymentRepository.save(savedPayment);

        return paymentMapper.toCheckoutResponse(savedPayment, gatewayOrder.gatewayKeyId());
    }

    @Override
    public List<PaymentResponse> getSubscriptionPayments(UUID userId, UUID subscriptionId) {

        UserSubscription subscription = userSubscriptionRepository
                .findByIdAndUser_Id(subscriptionId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription not found."));

        return paymentRepository
                .findBySubscription_IdAndSubscription_User_IdOrderByCreatedAtDesc(
                        subscription.getId(), userId)
                .stream()
                .map(paymentMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public PaymentResponse verifyPayment(UUID userId, PaymentVerificationRequest request) {

        Payment payment = paymentRepository
                .findById(request.paymentId())
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found."));

        if (!payment.getSubscription().getUser().getId().equals(userId)) {
            throw new BadRequestException("You are not authorized to verify this payment.");
        }

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            return paymentMapper.toResponse(payment);
        }

        if (payment.getStatus() != PaymentStatus.INITIATED) {
            throw new BadRequestException("Payment cannot be verified in its current status.");
        }

        if (payment.getGatewayOrderId() == null
                || !payment.getGatewayOrderId().equals(request.gatewayOrderId())) {
            throw new BadRequestException("Gateway order ID does not match.");
        }

        PaymentGatewayService gatewayService = paymentGatewayFactory.getGateway(payment.getPaymentGateway());

        GatewayVerificationResponse verification = gatewayService.verifyPayment(
                GatewayVerificationRequest.builder()
                        .gatewayOrderId(payment.getGatewayOrderId())
                        .gatewayTransactionId(request.gatewayTransactionId())
                        .signature(request.signature())
                        .expectedAmount(payment.getAmount())
                        .expectedCurrency(payment.getCurrency())
                        .build());

        if (!verification.verified()) {
            throw new BadRequestException(verification.failureReason());
        }

        if (verification.paymentStatus() == PaymentStatus.FAILED) {
            payment.setStatus(PaymentStatus.FAILED);
            payment.setGatewayTransactionId(verification.gatewayTransactionId());
            return paymentMapper.toResponse(payment);
        }

        if (verification.paymentStatus() == PaymentStatus.SUCCESS) {
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setGatewayTransactionId(verification.gatewayTransactionId());
            payment.setPaidAt(LocalDateTime.now());
            payment.getSubscription().setStatus(SubscriptionStatus.ACTIVE);
        }

        return paymentMapper.toResponse(payment);
    }
}