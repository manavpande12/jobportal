package com.mvp.jobportal.skill.dto;

import lombok.Builder;

@Builder
public record SkillResponse(
        Long id,
        String name) {
};