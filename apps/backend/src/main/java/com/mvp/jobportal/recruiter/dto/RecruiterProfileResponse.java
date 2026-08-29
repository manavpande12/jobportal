package com.mvp.jobportal.recruiter.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;

@Builder
public record RecruiterProfileResponse(
                UUID userId,
                UUID companyId,
                String email,
                String firstName,
                String lastName,
                LocalDateTime createdAt,
                LocalDateTime updatedAt,
                String designation) {

}