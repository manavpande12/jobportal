package com.mvp.jobportal.jobseeker.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.mvp.jobportal.skill.dto.SkillResponse;

import lombok.Builder;

@Builder
public record JobSeekerProfileResponse(
        String email,
        String firstName,
        String lastName,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String resumeUrl,
        Integer yearsOfExperience,
        String headline,
        String aboutMe,
        List<SkillResponse> skills) {
}
