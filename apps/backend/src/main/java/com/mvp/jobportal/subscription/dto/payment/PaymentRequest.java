package com.mvp.jobportal.subscription.dto.payment;

import java.util.UUID;

import com.mvp.jobportal.subscription.enums.PaymentGateway;

import jakarta.validation.constraints.NotNull;

public record PaymentRequest(

                @NotNull(message = "Subscription ID is required.") UUID subscriptionId,

                @NotNull(message = "Payment gateway is required.") PaymentGateway paymentGateway

) {
}