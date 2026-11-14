
package com.mvp.jobportal.subscription.gateway.impl;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

import lombok.RequiredArgsConstructor;
import com.mvp.jobportal.common.exception.BadRequestException;
import com.mvp.jobportal.subscription.enums.PaymentGateway;
import com.mvp.jobportal.subscription.enums.PaymentStatus;
import com.mvp.jobportal.subscription.gateway.PaymentGatewayService;
import com.mvp.jobportal.subscription.gateway.config.RazorpayProperties;
import com.mvp.jobportal.subscription.gateway.dto.GatewayOrderRequest;
import com.mvp.jobportal.subscription.gateway.dto.GatewayOrderResponse;
import com.mvp.jobportal.subscription.gateway.dto.GatewayVerificationRequest;
import com.mvp.jobportal.subscription.gateway.dto.GatewayVerificationResponse;

@Service
@RequiredArgsConstructor
public class RazorpayPaymentGatewayService implements PaymentGatewayService {
    private final RazorpayClient razorpayClient;
    private final RazorpayProperties razorpayProperties;

    @Override
    public String getGatewayKeyId() {
        return razorpayProperties.keyId();
    }

    @Override
    public PaymentGateway getGatewayType() {
        return PaymentGateway.RAZORPAY;
    }

    @Override
    public GatewayOrderResponse createOrder(GatewayOrderRequest request) {
        if (request == null || request.paymentId() == null) {
            throw new BadRequestException("Payment ID is required.");
        }

        if (request.amount() == null || request.amount().signum() <= 0) {
            throw new BadRequestException("Payment amount must be greater than zero.");
        }

        if (!"INR".equalsIgnoreCase(request.currency())) {
            throw new BadRequestException("Razorpay integration currently supports INR only.");
        }

        try {
            long amountInPaise = request.amount().movePointRight(2).longValueExact();
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", request.currency().toUpperCase());
            orderRequest.put("receipt", request.paymentId().toString());
            JSONObject notes = new JSONObject();
            notes.put("payment_id", request.paymentId().toString());
            orderRequest.put("notes", notes);
            Order razorpayOrder = razorpayClient.orders.create(orderRequest);
            return GatewayOrderResponse.builder()
                    .gatewayOrderId(razorpayOrder.get("id"))
                    .gatewayKeyId(razorpayProperties.keyId())
                    .build();

        } catch (RazorpayException ex) {
            throw new BadRequestException("Unable to create Razorpay order: " + ex.getMessage());
        } catch (ArithmeticException ex) {
            throw new BadRequestException("Invalid payment amount precision.");
        }
    }

    @Override
    public GatewayVerificationResponse verifyPayment(GatewayVerificationRequest request) {
        if (request == null
                || request.gatewayOrderId() == null
                || request.gatewayOrderId().isBlank()
                || request.gatewayTransactionId() == null
                || request.gatewayTransactionId().isBlank()
                || request.signature() == null
                || request.signature().isBlank()
                || request.expectedAmount() == null
                || request.expectedAmount().signum() <= 0
                || request.expectedCurrency() == null
                || request.expectedCurrency().isBlank()) {

            throw new BadRequestException("Payment verification details are incomplete.");
        }
        try {
            // 1. Verify Razorpay signature
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", request.gatewayOrderId());
            options.put("razorpay_payment_id", request.gatewayTransactionId());
            options.put("razorpay_signature", request.signature());

            boolean signatureValid = Utils.verifyPaymentSignature(options, razorpayProperties.keySecret());

            if (!signatureValid) {
                return GatewayVerificationResponse.builder()
                        .verified(false)
                        .failureReason("Invalid Razorpay payment signature.")
                        .build();
            }

            // 2. Fetch actual payment details from Razorpay
            Payment razorpayPayment = razorpayClient.payments.fetch(request.gatewayTransactionId());
            String actualOrderId = razorpayPayment.get("order_id");
            String actualStatus = razorpayPayment.get("status");
            String actualCurrency = razorpayPayment.get("currency");
            long actualAmount = ((Number) razorpayPayment.get("amount")).longValue();

            // 3. Convert expected amount into paise
            long expectedAmount = request.expectedAmount().movePointRight(2).longValueExact();

            // 4. Verify order association
            if (!request.gatewayOrderId().equals(actualOrderId)) {
                return GatewayVerificationResponse.builder()
                        .verified(false)
                        .failureReason("Payment does not belong to the expected order.")
                        .build();
            }

            // 5. Verify amount
            if (actualAmount != expectedAmount) {
                return GatewayVerificationResponse.builder()
                        .verified(false)
                        .failureReason("Payment amount mismatch.")
                        .build();
            }

            // 6. Verify currency
            if (!request.expectedCurrency().equalsIgnoreCase(actualCurrency)) {
                return GatewayVerificationResponse.builder()
                        .verified(false)
                        .failureReason("Payment currency mismatch.")
                        .build();
            }

            // 7. Verify payment status
            if ("failed".equalsIgnoreCase(actualStatus)) {
                return GatewayVerificationResponse.builder()
                        .verified(true)
                        .paymentStatus(PaymentStatus.FAILED)
                        .gatewayOrderId(actualOrderId)
                        .gatewayTransactionId(request.gatewayTransactionId())
                        .amount(request.expectedAmount())
                        .currency(actualCurrency)
                        .failureReason("Razorpay payment failed.")
                        .build();
            }

            if (!"captured".equalsIgnoreCase(actualStatus)) {
                return GatewayVerificationResponse.builder()
                        .verified(false)
                        .failureReason("Payment has not been captured.")
                        .build();
            }

            // 8. All checks passed
            return GatewayVerificationResponse.builder()
                    .verified(true)
                    .gatewayOrderId(actualOrderId)
                    .gatewayTransactionId(request.gatewayTransactionId())
                    .amount(request.expectedAmount())
                    .currency(actualCurrency)
                    .build();

        } catch (RazorpayException ex) {
            throw new BadRequestException("Unable to verify Razorpay payment: " + ex.getMessage());
        } catch (ArithmeticException ex) {
            throw new BadRequestException("Invalid expected payment amount.");
        }
    }

}
