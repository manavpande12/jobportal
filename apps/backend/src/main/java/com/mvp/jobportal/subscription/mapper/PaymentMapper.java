package com.mvp.jobportal.subscription.mapper;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.subscription.dto.payment.PaymentCheckoutResponse;
import com.mvp.jobportal.subscription.dto.payment.PaymentResponse;
import com.mvp.jobportal.subscription.entity.Payment;

@Component
public class PaymentMapper {

    public PaymentResponse toResponse(Payment payment) {

        return PaymentResponse.builder()
                .id(payment.getId())
                .subscriptionId(payment.getSubscription().getId())
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .gatewayTransactionId(payment.getGatewayTransactionId())
                .gatewayOrderId(payment.getGatewayOrderId())
                .paymentGateway(payment.getPaymentGateway())
                .status(payment.getStatus())
                .failureReason(payment.getFailureReason())
                .paidAt(payment.getPaidAt())
                .createdAt(payment.getCreatedAt())
                .build();
    }

    public PaymentCheckoutResponse toCheckoutResponse(Payment payment, String gatewayKeyId) {
        return PaymentCheckoutResponse.builder()
                .paymentId(payment.getId())
                .gatewayOrderId(payment.getGatewayOrderId())
                .gatewayKeyId(gatewayKeyId)
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .build();
    }
}