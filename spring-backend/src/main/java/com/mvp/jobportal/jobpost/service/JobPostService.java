package com.mvp.jobportal.jobpost.service;

import java.util.UUID;

import org.springframework.data.domain.Page;

import com.mvp.jobportal.jobpost.dto.CreateJobPostRequest;
import com.mvp.jobportal.jobpost.dto.JobPostFilterRequest;
import com.mvp.jobportal.jobpost.dto.JobPostResponse;
import com.mvp.jobportal.jobpost.dto.UpdateJobPostRequest;

public interface JobPostService {
    void createJobPost(UUID userId, CreateJobPostRequest request);

    void updateJobPost(UUID userId, UUID jobPostId, UpdateJobPostRequest request);

    void deleteJobPost(UUID userId, UUID jobPostId);

    void closeJobPost(UUID userId, UUID jobPostId);

    void draftJobPost(UUID userId, UUID jobPostId);

    void activeJobPost(UUID userId, UUID jobPostId);

    Page<JobPostResponse> getJobPosts(UUID userId, JobPostFilterRequest request);

    JobPostResponse getJobPostById(UUID userId, UUID jobPostId);
}
