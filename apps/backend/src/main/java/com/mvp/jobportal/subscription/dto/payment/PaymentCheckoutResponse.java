package com.mvp.jobportal.subscription.dto.payment;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Builder;

@Builder
public record PaymentCheckoutResponse(
        UUID paymentId,
        String gatewayOrderId,
        String gatewayKeyId,
        BigDecimal amount,
        String currency) {
}