package com.mvp.jobportal.jobpost.controller;

import com.mvp.jobportal.jobpost.dto.CreateJobPostRequest;
import com.mvp.jobportal.jobpost.dto.JobPostFilterRequest;
import com.mvp.jobportal.jobpost.dto.JobPostResponse;
import com.mvp.jobportal.jobpost.dto.UpdateJobPostRequest;
import com.mvp.jobportal.jobpost.service.JobPostService;
import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.util.SecurityUtils;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@PreAuthorize("hasRole('RECRUITER')")
@RestController
@Tag(name = "Job Posts")
@RequestMapping("/api/job-posts")
@RequiredArgsConstructor
public class JobPostController {

    private final JobPostService jobPostService;

    @PostMapping("/me")
    public ResponseEntity<ApiResponse<Void>> createJobPost(@Valid @RequestBody CreateJobPostRequest request) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        jobPostService.createJobPost(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Job post created successfully.", null));
    }

    @PatchMapping("/me/{id}")
    public ResponseEntity<ApiResponse<Void>> updateJobPost(@PathVariable UUID id,
            @Valid @RequestBody UpdateJobPostRequest request) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        jobPostService.updateJobPost(userId, id, request);
        return ResponseEntity.ok(ApiResponse.success("Job post updated successfully.", null));
    }

    @DeleteMapping("/me/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJobPost(@PathVariable UUID id) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        jobPostService.deleteJobPost(userId, id);
        return ResponseEntity.ok(ApiResponse.success("Job post deleted successfully.", null));
    }

    @PatchMapping("/me/{id}/close")
    public ResponseEntity<ApiResponse<Void>> closeJobPost(@PathVariable UUID id) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        jobPostService.closeJobPost(userId, id);
        return ResponseEntity.ok(ApiResponse.success("Job post closed successfully.", null));
    }

    @PatchMapping("/me/{id}/active")
    public ResponseEntity<ApiResponse<Void>> activeJobPost(@PathVariable UUID id) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        jobPostService.activeJobPost(userId, id);
        return ResponseEntity.ok(ApiResponse.success("Job post active successfully.", null));
    }

    @PatchMapping("/me/{id}/draft")
    public ResponseEntity<ApiResponse<Void>> draftJobPost(@PathVariable UUID id) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        jobPostService.draftJobPost(userId, id);
        return ResponseEntity.ok(ApiResponse.success("Job post moved to draft successfully.", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Page<JobPostResponse>>> getJobPosts(
            @Valid JobPostFilterRequest request) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        Page<JobPostResponse> posts = jobPostService.getJobPosts(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Job posts fetched successfully.", posts));
    }

    @GetMapping("/me/{id}")
    public ResponseEntity<ApiResponse<JobPostResponse>> getJobPostById(@PathVariable UUID id) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        JobPostResponse post = jobPostService.getJobPostById(userId, id);
        return ResponseEntity.ok(ApiResponse.success("Job post fetched successfully.", post));
    }

}