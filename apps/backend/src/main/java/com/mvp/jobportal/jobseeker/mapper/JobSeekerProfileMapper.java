package com.mvp.jobportal.jobseeker.mapper;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.common.util.PatchUtils;
import com.mvp.jobportal.jobseeker.dto.JobSeekerProfileResponse;
import com.mvp.jobportal.jobseeker.dto.UpdateJobSeekerProfileRequest;
import com.mvp.jobportal.jobseeker.entity.JobSeekerProfile;
import com.mvp.jobportal.skill.entity.Skill;
import com.mvp.jobportal.skill.mapper.SkillMapper;
import com.mvp.jobportal.skill.service.SkillService;
import com.mvp.jobportal.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JobSeekerProfileMapper {
    private final SkillMapper skillMapper;
    private final SkillService skillService;

    public JobSeekerProfileResponse toResponse(JobSeekerProfile jobSeekerProfile) {
        return JobSeekerProfileResponse.builder()
                .email(jobSeekerProfile.getUser().getEmail())
                .firstName(jobSeekerProfile.getUser().getFirstName())
                .lastName(jobSeekerProfile.getUser().getLastName())
                .createdAt(jobSeekerProfile.getUser().getCreatedAt())
                .updatedAt(jobSeekerProfile.getUpdatedAt())
                .resumeUrl(jobSeekerProfile.getResumeUrl())
                .yearsOfExperience(jobSeekerProfile.getYearsOfExperience())
                .headline(jobSeekerProfile.getHeadline())
                .aboutMe(jobSeekerProfile.getAboutMe())
                .skills(skillMapper.toResponseList(jobSeekerProfile.getSkills()))
                .build();
    }

    public JobSeekerProfile toEntity(User user) {
        return JobSeekerProfile.builder()
                .user(user)
                .build();
    }

    public void patchEntity(JobSeekerProfile jobSeekerProfile, UpdateJobSeekerProfileRequest request) {
        PatchUtils.setIfNotNull(jobSeekerProfile::setResumeUrl, request.resumeUrl());
        PatchUtils.setIfNotNull(jobSeekerProfile::setYearsOfExperience, request.yearsOfExperience());
        PatchUtils.setIfNotNull(jobSeekerProfile::setHeadline, request.headline());
        PatchUtils.setIfNotNull(jobSeekerProfile::setAboutMe, request.aboutMe());
        if (request.skills() != null) {
            Set<Skill> skills = new HashSet<>(skillService.getValidatedSkills(request.skills()));
            jobSeekerProfile.setSkills(skills);
        }
    }
}
