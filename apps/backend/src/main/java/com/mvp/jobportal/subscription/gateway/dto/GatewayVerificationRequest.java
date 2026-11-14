package com.mvp.jobportal.subscription.gateway.dto;

import java.math.BigDecimal;
import lombok.Builder;

@Builder
public record GatewayVerificationRequest(
                String gatewayOrderId,
                String gatewayTransactionId,
                String signature,
                BigDecimal expectedAmount,
                String expectedCurrency) {
}