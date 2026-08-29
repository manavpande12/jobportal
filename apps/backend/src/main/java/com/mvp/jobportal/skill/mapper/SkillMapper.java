package com.mvp.jobportal.skill.mapper;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.skill.dto.SkillResponse;
import com.mvp.jobportal.skill.entity.Skill;

@Component
public class SkillMapper {

    public SkillResponse toResponse(Skill skill) {
        if (skill == null) {
            return null;
        }

        return SkillResponse.builder()
                .id(skill.getId())
                .name(skill.getName())
                .build();
    }

    public List<SkillResponse> toResponseList(Set<Skill> skills) {
        return skills.stream()
                .sorted(Comparator.comparing(Skill::getName))
                .map(this::toResponse)
                .toList();

    }

    public List<SkillResponse> toResponseList(List<Skill> skills) {
        return skills.stream()
                .sorted(Comparator.comparing(Skill::getName))
                .map(this::toResponse)
                .toList();

    }
}
