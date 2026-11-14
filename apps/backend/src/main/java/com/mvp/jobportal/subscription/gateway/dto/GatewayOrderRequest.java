package com.mvp.jobportal.subscription.gateway.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Builder;

@Builder
public record GatewayOrderRequest(
        UUID paymentId,
        BigDecimal amount,
        String currency) {
}