package com.mvp.jobportal.jobs.service;

import java.util.UUID;

import org.springframework.data.domain.Page;

import com.mvp.jobportal.jobs.dto.JobResponse;
import com.mvp.jobportal.jobs.dto.JobSearchRequest;

public interface JobsService {

    Page<JobResponse> searchJobs(JobSearchRequest request);

    JobResponse getJobById(UUID id);
}