package com.mvp.jobportal.subscription.gateway.dto;

import lombok.Builder;

@Builder
public record GatewayOrderResponse(
                String gatewayOrderId,
                String gatewayKeyId) {
}