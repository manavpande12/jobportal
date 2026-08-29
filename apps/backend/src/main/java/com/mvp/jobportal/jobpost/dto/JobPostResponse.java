package com.mvp.jobportal.jobpost.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.mvp.jobportal.jobpost.enums.JobPostStatus;
import com.mvp.jobportal.skill.dto.SkillResponse;

@Builder
public record JobPostResponse(
                UUID id,
                String title,
                String description,
                JobPostStatus status,
                String createdBy,
                String companyName,
                String slug,
                List<SkillResponse> skills,
                LocalDateTime publishedOn,
                LocalDateTime draftedOn,
                LocalDateTime closedOn,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {
}