package com.mvp.jobportal.application.controller;

import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mvp.jobportal.application.dto.ApplicationResponse;
import com.mvp.jobportal.application.dto.UpdateApplicationStatusRequest;
import com.mvp.jobportal.application.service.ApplicationService;
import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.dto.PageResponse;
import com.mvp.jobportal.common.util.SecurityUtils;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/applications")
@Tag(name = "Applications")
@RequiredArgsConstructor
public class ApplicationController {

        private final ApplicationService applicationService;

        @PreAuthorize("hasRole('JOB_SEEKER')")
        @PostMapping("/job-posts/{jobPostId}")
        public ResponseEntity<ApiResponse<Void>> apply(@PathVariable UUID jobPostId) {
                UUID userId = SecurityUtils.getAuthenticatedUserId();
                applicationService.apply(jobPostId, userId);
                return ResponseEntity.ok(ApiResponse.success("Application submitted successfully.", null));
        }

        @PreAuthorize("hasRole('JOB_SEEKER')")
        @GetMapping("/me")
        public ResponseEntity<ApiResponse<PageResponse<ApplicationResponse>>> getMine(Pageable pageable) {
                UUID userId = SecurityUtils.getAuthenticatedUserId();
                PageResponse<ApplicationResponse> applications = applicationService.getMine(userId, pageable);
                return ResponseEntity.ok(ApiResponse.success("Applications fetched successfully.", applications));
        }

        @PreAuthorize("hasRole('RECRUITER')")
        @GetMapping("/job-posts/{jobPostId}")
        public ResponseEntity<ApiResponse<PageResponse<ApplicationResponse>>> getForJob(
                        @PathVariable UUID jobPostId, Pageable pageable) {
                PageResponse<ApplicationResponse> applications = applicationService.getForJob(jobPostId, pageable);
                return ResponseEntity.ok(ApiResponse.success("Applications fetched successfully.", applications));
        }

        @PatchMapping("/{id}/status")
        public ResponseEntity<ApiResponse<Void>> updateStatus(
                        @PathVariable UUID id,
                        @Valid @RequestBody UpdateApplicationStatusRequest request) {
                applicationService.updateStatus(id, request.status());
                return ResponseEntity.ok(ApiResponse.success("Application status updated successfully.", null));
        }

        @PreAuthorize("hasRole('JOB_SEEKER')")
        @GetMapping("/job-posts/{jobPostId}/has-applied")
        public ResponseEntity<ApiResponse<Boolean>> hasApplied(@PathVariable UUID jobPostId) {
                UUID userId = SecurityUtils.getAuthenticatedUserId();
                boolean hasApplied = applicationService.hasApplied(jobPostId, userId);
                return ResponseEntity.ok(ApiResponse.success("Application status fetched successfully.", hasApplied));
        }
}