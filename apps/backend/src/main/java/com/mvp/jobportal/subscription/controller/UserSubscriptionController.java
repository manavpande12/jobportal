
package com.mvp.jobportal.subscription.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.util.SecurityUtils;
import com.mvp.jobportal.subscription.dto.subscription.SubscriptionRequest;
import com.mvp.jobportal.subscription.dto.subscription.SubscriptionResponse;
import com.mvp.jobportal.subscription.service.UserSubscriptionService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "User Subscription Services")
@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class UserSubscriptionController {

    private final UserSubscriptionService userSubscriptionService;

    @PreAuthorize("hasAnyRole('JOB_SEEKER', 'RECRUITER')")
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createSubscription(@Valid @RequestBody SubscriptionRequest request) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        userSubscriptionService.createSubscription(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Subscription created successfully. Proceed to payment.", null));
    }

    @PreAuthorize("hasAnyRole('JOB_SEEKER', 'RECRUITER')")
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<SubscriptionResponse>>> getMySubscriptions() {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        List<SubscriptionResponse> subscriptions = userSubscriptionService.getMySubscriptions(userId);
        return ResponseEntity.ok(ApiResponse.success("Subscriptions fetched successfully.", subscriptions));
    }
}
