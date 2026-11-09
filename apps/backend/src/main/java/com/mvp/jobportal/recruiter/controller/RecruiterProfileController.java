package com.mvp.jobportal.recruiter.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.util.SecurityUtils;
import com.mvp.jobportal.recruiter.dto.RecruiterPublicProfileResponse;
import com.mvp.jobportal.recruiter.dto.RecruiterProfileResponse;
import com.mvp.jobportal.recruiter.dto.UpdateRecruiterProfileRequest;
import com.mvp.jobportal.recruiter.service.RecruiterProfileService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@Tag(name = "Recruiter Profile")
@RequestMapping("/api/recruiter-profiles")
@RequiredArgsConstructor

public class RecruiterProfileController {
    private final RecruiterProfileService recruiterProfileService;

    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<RecruiterProfileResponse>> getProfile() {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        RecruiterProfileResponse recruiterProfileResponse = recruiterProfileService.getByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Profile Fetched Fuccessfully", recruiterProfileResponse));
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<Void>> updateProfile(
            @Valid @RequestBody UpdateRecruiterProfileRequest request) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        recruiterProfileService.updateProfile(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Profile Updated Fuccessfully", null));

    }

    @GetMapping("/public/{id}")
    public ResponseEntity<ApiResponse<RecruiterPublicProfileResponse>> getRecruiterPublicProfileById(
            @PathVariable UUID id) {
        RecruiterPublicProfileResponse res = recruiterProfileService.getRecruiterPublicProfileById(id);
        return ResponseEntity.ok(ApiResponse.success("Profile Fetched Fuccessfully", res));
    }

}
