package com.mvp.jobportal.skill.service;

import java.util.List;
import java.util.Set;

import com.mvp.jobportal.skill.dto.SkillResponse;
import com.mvp.jobportal.skill.entity.Skill;

public interface SkillService {
    List<SkillResponse> getSkills();

    Set<Skill> getValidatedSkills(Set<Long> skillIds);
}