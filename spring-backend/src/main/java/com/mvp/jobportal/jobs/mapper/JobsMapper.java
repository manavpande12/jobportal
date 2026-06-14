package com.mvp.jobportal.jobs.mapper;

import org.springframework.stereotype.Component;
import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobs.dto.JobResponse;
import com.mvp.jobportal.skill.mapper.SkillMapper;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JobsMapper {
        private final SkillMapper skillMapper;

        public JobResponse toResponse(JobPost jobPost) {
                return JobResponse.builder()
                                .id(jobPost.getId())
                                .title(jobPost.getTitle())
                                .description(jobPost.getDescription())
                                .companyName(jobPost.getCompany().getName())
                                .slug(jobPost.getCompany().getSlug())
                                .skills(skillMapper.toResponseList(jobPost.getSkills()))
                                .postedOn(jobPost.getPostedOn())
                                .build();
        }
}
