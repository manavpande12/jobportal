package com.mvp.jobportal.jobs.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobpost.repository.JobPostRepository;
import com.mvp.jobportal.jobs.dto.JobResponse;
import com.mvp.jobportal.jobs.dto.JobSearchRequest;
import com.mvp.jobportal.jobs.mapper.JobsMapper;
import com.mvp.jobportal.jobs.service.JobsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobsServiceImpl implements JobsService {
    private final JobPostRepository jobPostRepository;
    private final JobsMapper jobsMapper;

    @Override
    public JobResponse getJobById(UUID jobPostId) {
        JobPost jobPost = jobPostRepository.findPublicDetailedById(jobPostId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Job not found."));
        return jobsMapper.toResponse(jobPost);
    }

    @Override

    public Page<JobResponse> searchJobs(JobSearchRequest request) {

        Pageable pageable = PageRequest.of(
                request.page() == null ? 0 : request.page(),
                request.size() == null ? 12 : request.size());

        String title = request.title();

        if (title != null) {
            title = title.trim();
            if (title.isBlank()) {
                title = null;
            }
        }

        List<Long> skillIds = request.skillIds();

        if (skillIds != null && skillIds.isEmpty()) {
            skillIds = null;
        }

        return jobPostRepository
                .searchJobs(title, skillIds, pageable)
                .map(jobsMapper::toResponse);
    }

}
