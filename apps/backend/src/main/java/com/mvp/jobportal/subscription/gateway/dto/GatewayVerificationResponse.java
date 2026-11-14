package com.mvp.jobportal.subscription.gateway.dto;

import java.math.BigDecimal;

import com.mvp.jobportal.subscription.enums.PaymentStatus;

import lombok.Builder;

@Builder
public record GatewayVerificationResponse(
                PaymentStatus paymentStatus,
                boolean verified,
                String gatewayOrderId,
                String gatewayTransactionId,
                BigDecimal amount,
                String currency,
                String failureReason) {
}