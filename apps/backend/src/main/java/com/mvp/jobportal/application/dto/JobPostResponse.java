package com.mvp.jobportal.application.dto;

import java.util.List;
import java.util.UUID;

import com.mvp.jobportal.jobpost.enums.JobPostStatus;
import com.mvp.jobportal.skill.dto.SkillResponse;

import lombok.Builder;

@Builder
public record JobPostResponse(
        UUID id,
        String title,
        String companyName,
        String companySlug,
        JobPostStatus status,
        List<SkillResponse> skills) {

}
