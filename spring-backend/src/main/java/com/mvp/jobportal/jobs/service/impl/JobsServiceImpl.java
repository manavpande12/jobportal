package com.mvp.jobportal.jobs.service.impl;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.mvp.jobportal.common.dto.PageResponse;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobpost.repository.JobPostRepository;
import com.mvp.jobportal.jobs.dto.JobResponse;
import com.mvp.jobportal.jobs.dto.JobSearchRequest;
import com.mvp.jobportal.jobs.mapper.JobsMapper;
import com.mvp.jobportal.jobs.service.JobsService;
import com.mvp.jobportal.jobs.specification.JobsSpecification;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobsServiceImpl implements JobsService {
    private final JobPostRepository jobPostRepository;
    private final JobsMapper jobsMapper;

    @Override
    public JobResponse getJobById(UUID jobPostId) {
        JobPost jobPost = jobPostRepository.findPublicDetailedById(jobPostId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found."));
        return jobsMapper.toResponse(jobPost);
    }

    @Override
    public PageResponse<JobResponse> searchJobs(JobSearchRequest request) {
        if (request == null) {
            request = new JobSearchRequest(null, null, 0, 12);
        }
        Pageable pageable = PageRequest.of(request.page() == null ? 0 : request.page(),
                request.size() == null ? 12 : request.size());
        String title = request.title();
        if (title != null) {
            title = title.trim();
            if (title.isEmpty()) {
                title = null;
            }
        }

        List<Long> skillIds = request.skillIds();
        if (skillIds != null && skillIds.isEmpty()) {
            skillIds = null;
        }

        Page<JobResponse> page = jobPostRepository.findAll(JobsSpecification.search(title, skillIds), pageable)
                .map(jobsMapper::toResponse);
        return PageResponse.of(page);
    }

}
