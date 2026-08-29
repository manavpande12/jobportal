package com.mvp.jobportal.application.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.mvp.jobportal.application.enums.ApplicationStatus;

import lombok.Builder;

@Builder
public record ApplicationResponse(
                UUID id,
                JobPostResponse jobPost,
                JobSeekerResponse jobseeker,
                ApplicationStatus status,
                LocalDateTime appliedAt) {
}