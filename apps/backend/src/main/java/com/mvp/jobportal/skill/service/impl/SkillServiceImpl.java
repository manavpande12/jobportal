package com.mvp.jobportal.skill.service.impl;

import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.skill.dto.SkillResponse;
import com.mvp.jobportal.skill.entity.Skill;
import com.mvp.jobportal.skill.mapper.SkillMapper;
import com.mvp.jobportal.skill.repository.SkillRepository;
import com.mvp.jobportal.skill.service.SkillService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    @Override
    public List<SkillResponse> getSkills() {
        return skillMapper.toResponseList(skillRepository.findAll());
    }

    @Override
    public Set<Skill> getValidatedSkills(Set<Long> skillIds) {
        Set<Skill> skills = new HashSet<>(skillRepository.findAllById(skillIds));

        if (skills.size() != skillIds.size()) {
            throw new ResourceNotFoundException("One or more skills not found.");
        }

        return skills;
    }
}