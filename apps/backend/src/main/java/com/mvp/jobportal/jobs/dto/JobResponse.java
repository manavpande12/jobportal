package com.mvp.jobportal.jobs.dto;

import com.mvp.jobportal.jobpost.enums.JobPostStatus;
import com.mvp.jobportal.skill.dto.SkillResponse;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
public record JobResponse(
                UUID id,
                String title,
                String description,
                String companyName,
                JobPostStatus status,
                String slug,
                List<SkillResponse> skills,
                LocalDateTime publishedOn) {
}