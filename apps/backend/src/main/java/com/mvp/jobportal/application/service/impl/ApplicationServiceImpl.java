package com.mvp.jobportal.application.service.impl;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mvp.jobportal.application.dto.ApplicationResponse;
import com.mvp.jobportal.application.entity.Application;
import com.mvp.jobportal.application.enums.ApplicationStatus;
import com.mvp.jobportal.application.mapper.ApplicationMapper;
import com.mvp.jobportal.application.repository.ApplicationRepository;
import com.mvp.jobportal.application.service.ApplicationService;
import com.mvp.jobportal.common.dto.PageResponse;
import com.mvp.jobportal.common.exception.ConflictException;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobpost.enums.JobPostStatus;
import com.mvp.jobportal.jobpost.repository.JobPostRepository;
import com.mvp.jobportal.user.entity.User;
import com.mvp.jobportal.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ApplicationServiceImpl implements ApplicationService {
    private final JobPostRepository jobPostRepository;
    private final UserRepository userRepository;
    private final ApplicationMapper applicationMapper;
    private final ApplicationRepository applicationRepository;

    @Override
    @Transactional
    public void apply(UUID jobPostId, UUID userId) {
        JobPost jobPost = jobPostRepository.findByIdAndDeletedFalseAndCreatedBy_DeletedFalse(jobPostId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found."));
        User user = userRepository.findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        if (hasApplied(jobPostId, userId)) {
            throw new ConflictException("You already applied for this job.");
        }
        if (jobPost.getStatus() != JobPostStatus.ACTIVE) {
            throw new ConflictException("Job post is not accepting applications.");
        }

        Application application = applicationMapper.toEntity(jobPost, user, ApplicationStatus.APPLIED);
        applicationRepository.save(application);
    }

    @Override
    public PageResponse<ApplicationResponse> getMine(UUID userId, Pageable pageable) {
        Page<ApplicationResponse> page = applicationRepository
                .findByUserIdWithRelations(userId, pageable)
                .map(applicationMapper::toResponse);
        return PageResponse.of(page);
    }

    @Override
    public PageResponse<ApplicationResponse> getForJob(UUID jobPostId, Pageable pageable) {
        Page<ApplicationResponse> page = applicationRepository
                .findByJobPostIdWithRelations(jobPostId, pageable)
                .map(applicationMapper::toResponse);
        return PageResponse.of(page);
    }

    @Override
    @Transactional
    public void updateStatus(UUID applicationId, ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found."));
        application.setStatus(status);
        applicationRepository.save(application);
    }

    @Override
    public boolean hasApplied(UUID jobPostId, UUID userId) {
        return applicationRepository.existsByJobPostIdAndUserId(jobPostId, userId);
    }

}
