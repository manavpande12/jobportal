
package com.mvp.jobportal.subscription.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.subscription.dto.plan.PlanRequest;
import com.mvp.jobportal.subscription.dto.plan.PlanResponse;
import com.mvp.jobportal.subscription.dto.plan.PlanStatusRequest;
import com.mvp.jobportal.subscription.service.PlanService;
import com.mvp.jobportal.user.enums.RoleType;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Plan Services")
@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createPlan(
            @Valid @RequestBody PlanRequest request) {
        planService.createPlan(request);
        return ResponseEntity.ok(ApiResponse.success("Plan created successfully.", null));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updatePlan(
            @PathVariable UUID id,
            @Valid @RequestBody PlanRequest request) {
        planService.updatePlan(id, request);
        return ResponseEntity.ok(ApiResponse.success("Plan updated successfully.", null));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PlanResponse>>> getAllPlans() {
        List<PlanResponse> plans = planService.getAllPlans();
        return ResponseEntity.ok(ApiResponse.success("Plans fetched successfully.", plans));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PlanResponse>> getPlanById(@PathVariable UUID id) {
        PlanResponse response = planService.getPlanById(id);
        return ResponseEntity.ok(ApiResponse.success("Plan fetched successfully.", response));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<?>> updatePlanStatus(
            @PathVariable UUID id,
            @Valid @RequestBody PlanStatusRequest request) {
        planService.updatePlanStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Plan status updated successfully.", null));
    }

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<PlanResponse>>> getActivePlans(@RequestParam RoleType role) {
        List<PlanResponse> plans = planService.getActivePlansByRole(role);
        return ResponseEntity.ok(ApiResponse.success("Available plans fetched successfully.", plans));
    }
}
