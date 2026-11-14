package com.mvp.jobportal.subscription.dto.payment;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PaymentVerificationRequest(

                @NotNull(message = "Payment ID is required.") UUID paymentId,
                @NotBlank(message = "Gateway order ID is required.") String gatewayOrderId,
                @NotBlank(message = "Gateway transaction ID is required.") String gatewayTransactionId,
                @NotBlank(message = "Payment signature is required.") String signature

) {

}