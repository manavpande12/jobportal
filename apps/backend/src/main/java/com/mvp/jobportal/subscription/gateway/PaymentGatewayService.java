package com.mvp.jobportal.subscription.gateway;

import com.mvp.jobportal.subscription.enums.PaymentGateway;
import com.mvp.jobportal.subscription.gateway.dto.GatewayOrderRequest;
import com.mvp.jobportal.subscription.gateway.dto.GatewayOrderResponse;
import com.mvp.jobportal.subscription.gateway.dto.GatewayVerificationRequest;
import com.mvp.jobportal.subscription.gateway.dto.GatewayVerificationResponse;

public interface PaymentGatewayService {
    String getGatewayKeyId();

    PaymentGateway getGatewayType();

    GatewayOrderResponse createOrder(GatewayOrderRequest request);

    GatewayVerificationResponse verifyPayment(GatewayVerificationRequest request);
}