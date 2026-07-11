package com.mvp.jobportal.jobpost.service.impl;

import com.mvp.jobportal.common.dto.SortDirection;
import com.mvp.jobportal.common.exception.BadRequestException;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.jobpost.dto.CreateJobPostRequest;
import com.mvp.jobportal.jobpost.dto.JobPostFilterRequest;
import com.mvp.jobportal.jobpost.dto.JobPostResponse;
import com.mvp.jobportal.jobpost.dto.UpdateJobPostRequest;
import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobpost.enums.JobPostStatus;
import com.mvp.jobportal.jobpost.mapper.JobPostMapper;
import com.mvp.jobportal.jobpost.repository.JobPostRepository;
import com.mvp.jobportal.jobpost.service.JobPostService;
import com.mvp.jobportal.recruiter.entity.RecruiterProfile;
import com.mvp.jobportal.recruiter.repository.RecruiterProfileRepository;
import com.mvp.jobportal.skill.entity.Skill;
import com.mvp.jobportal.skill.service.SkillService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.jsoup.Jsoup;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobPostServiceImpl implements JobPostService {
    private final JobPostRepository jobPostRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final SkillService skillService;
    private final JobPostMapper jobPostMapper;

    @Transactional
    @Override
    public void createJobPost(UUID userId, CreateJobPostRequest request) {
        RecruiterProfile recruiterProfile = recruiterProfileRepository
                .findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found."));

        String plainText = Jsoup.parse(request.description()).text().trim();
        if (plainText.length() < 100 || plainText.length() > 3000) {
            throw new BadRequestException("Description must be between 100 and 3000 characters");
        }

        Set<Skill> skills = skillService.getValidatedSkills(request.skillIds());
        JobPost jobPost = jobPostMapper.toEntity(request, recruiterProfile.getUser(), recruiterProfile.getCompany(),
                skills);
        jobPost.setStatus(JobPostStatus.DRAFT);
        jobPost.setDraftedOn(LocalDateTime.now());
        jobPostRepository.save(jobPost);
    }

    @Transactional
    @Override
    public void updateJobPost(UUID userId, UUID jobPostId, UpdateJobPostRequest request) {
        JobPost jobPost = jobPostRepository.findOwnedDetailedByJobPostIdAndUserId(jobPostId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found."));
        Set<Skill> skills = null;
        if (request.skillIds() != null) {
            skills = skillService.getValidatedSkills(request.skillIds());
        }
        jobPostMapper.patchEntity(jobPost, request, skills);
        jobPostRepository.save(jobPost);
    }

    @Transactional
    @Override
    public void deleteJobPost(UUID userId, UUID jobPostId) {
        JobPost jobPost = jobPostRepository.findOwnedDetailedByJobPostIdAndUserId(jobPostId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found."));
        jobPostRepository.delete(jobPost);
    }

    @Transactional
    @Override
    public void closeJobPost(UUID userId, UUID jobPostId) {
        JobPost jobPost = jobPostRepository.findOwnedDetailedByJobPostIdAndUserId(jobPostId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found."));
        jobPost.setStatus(JobPostStatus.CLOSED);
        jobPost.setClosedOn(LocalDateTime.now());
        jobPostRepository.save(jobPost);
    }

    @Transactional
    @Override
    public void activeJobPost(UUID userId, UUID jobPostId) {
        JobPost jobPost = jobPostRepository.findOwnedDetailedByJobPostIdAndUserId(jobPostId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found."));
        jobPost.setStatus(JobPostStatus.ACTIVE);
        jobPost.setPublishedOn(LocalDateTime.now());
        jobPostRepository.save(jobPost);
    }

    @Transactional
    @Override
    public void draftJobPost(UUID userId, UUID jobPostId) {
        JobPost jobPost = jobPostRepository.findOwnedDetailedByJobPostIdAndUserId(jobPostId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found."));
        jobPost.setStatus(JobPostStatus.DRAFT);
        jobPost.setDraftedOn(LocalDateTime.now());
        jobPostRepository.save(jobPost);
    }

    @Override
    public JobPostResponse getJobPostById(UUID userId, UUID jobPostId) {
        JobPost jobPost = jobPostRepository.findOwnedDetailedByJobPostIdAndUserId(jobPostId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found."));
        return jobPostMapper.toResponse(jobPost);
    }

    @Override
    public Page<JobPostResponse> getJobPosts(UUID userId, JobPostFilterRequest request) {
        Sort sort = Sort.by(request.direction() == SortDirection.ASC
                ? Sort.Direction.ASC
                : Sort.Direction.DESC,
                request.sortBy());

        Pageable pageable = PageRequest.of(request.page(), request.size(), sort);

        Page<JobPost> posts;

        if (request.status() != null) {
            posts = jobPostRepository.findByCreatedBy_IdAndStatus(userId, request.status(), pageable);
        } else {
            posts = jobPostRepository.findByCreatedBy_Id(userId, pageable);
        }

        return posts.map(jobPostMapper::toResponse);
    }

}
