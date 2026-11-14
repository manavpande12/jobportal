package com.mvp.jobportal.subscription.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.util.SecurityUtils;
import com.mvp.jobportal.subscription.dto.payment.PaymentCheckoutResponse;
import com.mvp.jobportal.subscription.dto.payment.PaymentRequest;
import com.mvp.jobportal.subscription.dto.payment.PaymentResponse;
import com.mvp.jobportal.subscription.service.PaymentService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Payment Services")
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PreAuthorize("hasAnyRole('JOB_SEEKER', 'RECRUITER')")
    @PostMapping("/initiate")
    public ResponseEntity<ApiResponse<PaymentCheckoutResponse>> initiatePayment(
            @Valid @RequestBody PaymentRequest request) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        PaymentCheckoutResponse response = paymentService.initiatePayment(userId, request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Payment initiated successfully.", response));
    }

    @PreAuthorize("hasAnyRole('JOB_SEEKER', 'RECRUITER')")
    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getPayment(@PathVariable UUID paymentId) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        List<PaymentResponse> response = paymentService.getSubscriptionPayments(userId, paymentId);
        return ResponseEntity.ok(ApiResponse.success("Payments fetched successfully.", response));
    }
}