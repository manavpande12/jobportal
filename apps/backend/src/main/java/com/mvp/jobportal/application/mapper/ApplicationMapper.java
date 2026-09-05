package com.mvp.jobportal.application.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.application.dto.ApplicationResponse;
import com.mvp.jobportal.application.dto.JobPostResponse;
import com.mvp.jobportal.application.dto.JobSeekerResponse;
import com.mvp.jobportal.application.entity.Application;
import com.mvp.jobportal.application.enums.ApplicationStatus;
import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.skill.mapper.SkillMapper;
import com.mvp.jobportal.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApplicationMapper {
    private final SkillMapper skillMapper;

    public Application toEntity(JobPost jobPost, User user, ApplicationStatus applicationStatus) {
        return Application.builder()
                .appliedAt(LocalDateTime.now())
                .jobPost(jobPost)
                .user(user)
                .status(applicationStatus)
                .build();
    }

    public ApplicationResponse toResponse(Application application) {
        return ApplicationResponse.builder()
                .id(application.getId())
                .jobPost(toResponse(application.getJobPost()))
                .jobseeker(toResponse(application.getUser()))
                .appliedAt(application.getAppliedAt())
                .status(application.getStatus())
                .build();
    }

    private JobPostResponse toResponse(JobPost jobPost) {
        return JobPostResponse.builder()
                .id(jobPost.getId())
                .title(jobPost.getTitle())
                .status(jobPost.getStatus())
                .companyName(jobPost.getCompany().getName())
                .companySlug(jobPost.getCompany().getSlug())
                .skills(skillMapper.toResponseList(jobPost.getSkills()))
                .build();
    }

    private JobSeekerResponse toResponse(User user) {
        return JobSeekerResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

}
