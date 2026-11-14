package com.mvp.jobportal.subscription.gateway;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.common.exception.BadRequestException;
import com.mvp.jobportal.common.exception.ConflictException;
import com.mvp.jobportal.subscription.enums.PaymentGateway;

@Component
public class PaymentGatewayFactory {

    private final Map<PaymentGateway, PaymentGatewayService> gateways;

    public PaymentGatewayFactory(List<PaymentGatewayService> gatewayServices) {
        Map<PaymentGateway, PaymentGatewayService> gatewayMap = new EnumMap<>(PaymentGateway.class);
        for (PaymentGatewayService gateway : gatewayServices) {
            if (gatewayMap.put(gateway.getGatewayType(), gateway) != null) {
                throw new ConflictException("Duplicate payment gateway: " + gateway.getGatewayType());
            }
        }
        this.gateways = Map.copyOf(gatewayMap);
    }

    public PaymentGatewayService getGateway(PaymentGateway gateway) {
        PaymentGatewayService service = gateways.get(gateway);
        if (service == null) {
            throw new BadRequestException("Unsupported payment gateway: " + gateway);
        }
        return service;
    }
}