package com.mvp.jobportal.jobs.service;

import java.util.UUID;

import com.mvp.jobportal.common.dto.PageResponse;
import com.mvp.jobportal.jobs.dto.JobResponse;
import com.mvp.jobportal.jobs.dto.JobSearchRequest;

public interface JobsService {

    PageResponse<JobResponse> searchJobs(JobSearchRequest request);

    JobResponse getJobById(UUID id);
}