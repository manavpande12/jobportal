package com.mvp.jobportal.application.service;

import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Pageable;

import com.mvp.jobportal.application.dto.ApplicationFilterRequest;
import com.mvp.jobportal.application.dto.ApplicationResponse;
import com.mvp.jobportal.application.enums.ApplicationStatus;
import com.mvp.jobportal.common.dto.PageResponse;

public interface ApplicationService {

    void apply(UUID jobPostId, UUID userId);

    PageResponse<ApplicationResponse> getForJobSeeker(UUID userId, ApplicationFilterRequest request, Pageable pageable);

    PageResponse<ApplicationResponse> getForRecruiter(UUID userId, ApplicationFilterRequest request, Pageable pageable);

    PageResponse<ApplicationResponse> getForJob(UUID jobPostId, Pageable pageable);

    void updateStatus(UUID applicationId, ApplicationStatus status);

    boolean hasApplied(UUID jobPostId, UUID userId);

    Map<ApplicationStatus, Long> getJobSeekerApplicationStatusCount(UUID userId);

}