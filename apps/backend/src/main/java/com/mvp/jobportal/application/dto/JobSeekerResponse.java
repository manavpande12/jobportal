package com.mvp.jobportal.application.dto;

import java.util.List;
import java.util.UUID;

import com.mvp.jobportal.skill.dto.SkillResponse;

import lombok.Builder;

@Builder
public record JobSeekerResponse(
                UUID id,
                String firstName,
                String lastName,
                String headline,
                Integer yearsOfExperience,
                List<SkillResponse> skills,
                String email) {
}