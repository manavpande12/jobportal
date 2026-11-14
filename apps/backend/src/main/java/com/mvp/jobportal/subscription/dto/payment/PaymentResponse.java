package com.mvp.jobportal.subscription.dto.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.mvp.jobportal.subscription.enums.PaymentGateway;
import com.mvp.jobportal.subscription.enums.PaymentStatus;

import lombok.Builder;

@Builder
public record PaymentResponse(
        UUID id,
        UUID subscriptionId,
        BigDecimal amount,
        String currency,
        String gatewayTransactionId,
        String gatewayOrderId,
        PaymentGateway paymentGateway,
        PaymentStatus status,
        String failureReason,
        LocalDateTime paidAt,
        LocalDateTime createdAt) {
}