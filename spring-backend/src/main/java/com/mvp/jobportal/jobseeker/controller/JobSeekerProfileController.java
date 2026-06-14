package com.mvp.jobportal.jobseeker.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mvp.jobportal.jobseeker.dto.JobSeekerProfileResponse;
import com.mvp.jobportal.jobseeker.dto.UpdateJobSeekerProfileRequest;
import com.mvp.jobportal.jobseeker.service.JobSeekerProfileService;
import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.util.SecurityUtils;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@PreAuthorize("hasRole('JOB_SEEKER')")
@RestController
@Tag(name = "Job Seeker Profile")
@RequestMapping("/api/job-seeker-profiles")
@RequiredArgsConstructor
public class JobSeekerProfileController {

    private final JobSeekerProfileService jobSeekerProfileService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<JobSeekerProfileResponse>> getProfile() {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        JobSeekerProfileResponse profile = jobSeekerProfileService.getByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Profile Fetched Successfully.", profile));

    }

    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<Void>> updateProfile(
            @Valid @RequestBody UpdateJobSeekerProfileRequest request) {

        UUID userId = SecurityUtils.getAuthenticatedUserId();
        jobSeekerProfileService.update(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Profile Update Successfully.", null));
    }

}
