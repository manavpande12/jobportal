package com.mvp.jobportal.jobpost.mapper;

import com.mvp.jobportal.common.util.PatchUtils;
import com.mvp.jobportal.company.entity.Company;
import com.mvp.jobportal.jobpost.dto.CreateJobPostRequest;
import com.mvp.jobportal.jobpost.dto.JobPostResponse;
import com.mvp.jobportal.jobpost.dto.UpdateJobPostRequest;
import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobpost.enums.JobPostStatus;
import com.mvp.jobportal.skill.entity.Skill;
import com.mvp.jobportal.skill.mapper.SkillMapper;
import com.mvp.jobportal.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class JobPostMapper {
        private final SkillMapper skillMapper;

        public JobPostResponse toResponse(JobPost jobPost) {
                return JobPostResponse.builder()
                                .id(jobPost.getId())
                                .title(jobPost.getTitle())
                                .description(jobPost.getDescription())
                                .status(jobPost.getStatus())
                                .createdBy(jobPost.getCreatedBy().getFirstName() + " "
                                                + jobPost.getCreatedBy().getLastName())
                                .companyName(jobPost.getCompany().getName())
                                .slug(jobPost.getCompany().getSlug())
                                .skills(skillMapper.toResponseList(jobPost.getSkills()))
                                .publishedOn(jobPost.getPublishedOn())
                                .closedOn(jobPost.getClosedOn())
                                .draftedOn(jobPost.getDraftedOn())
                                .createdAt(jobPost.getCreatedAt())
                                .updatedAt(jobPost.getUpdatedAt())
                                .build();
        }

        public JobPost toEntity(CreateJobPostRequest request, User user, Company company, Set<Skill> skills) {
                return JobPost.builder()
                                .title(request.title())
                                .description(request.description())
                                .status(JobPostStatus.DRAFT)
                                .createdBy(user)
                                .company(company)
                                .skills(skills)
                                .build();
        }

        public void patchEntity(JobPost jobPost, UpdateJobPostRequest request, Set<Skill> skills) {
                PatchUtils.setIfNotNull(jobPost::setTitle, request.title());
                PatchUtils.setIfNotNull(jobPost::setDescription, request.description());
                PatchUtils.setIfNotNull(jobPost::setSkills, skills);
        }
}