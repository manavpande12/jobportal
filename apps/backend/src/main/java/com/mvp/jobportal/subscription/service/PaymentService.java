package com.mvp.jobportal.subscription.service;

import java.util.List;
import java.util.UUID;

import com.mvp.jobportal.subscription.dto.payment.PaymentCheckoutResponse;
import com.mvp.jobportal.subscription.dto.payment.PaymentRequest;
import com.mvp.jobportal.subscription.dto.payment.PaymentResponse;
import com.mvp.jobportal.subscription.dto.payment.PaymentVerificationRequest;

public interface PaymentService {

    PaymentCheckoutResponse initiatePayment(UUID userId, PaymentRequest request);

    List<PaymentResponse> getSubscriptionPayments(UUID userId, UUID subscriptionId);

    PaymentResponse verifyPayment(UUID userId, PaymentVerificationRequest request);

}