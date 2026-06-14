package com.mvp.jobportal.jobs.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.jobs.dto.JobResponse;
import com.mvp.jobportal.jobs.dto.JobSearchRequest;
import com.mvp.jobportal.jobs.service.JobsService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@PreAuthorize("permitAll()")
@RestController
@Tag(name = "Public Job")
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobsController {
    private final JobsService jobsService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> getJobPostById(@PathVariable UUID id) {
        JobResponse post = jobsService.getJobById(id);
        return ResponseEntity.ok(ApiResponse.success("Job fetched successfully.", post));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<JobResponse>>> searchJobs(@Valid JobSearchRequest request) {
        Page<JobResponse> page = jobsService.searchJobs(request);
        return ResponseEntity.ok(ApiResponse.success("Search Job fetched successfully.", page));
    }
}
