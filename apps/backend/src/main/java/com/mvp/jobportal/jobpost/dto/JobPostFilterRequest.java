package com.mvp.jobportal.jobpost.dto;

import com.mvp.jobportal.common.dto.SortDirection;
import com.mvp.jobportal.jobpost.enums.JobPostStatus;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record JobPostFilterRequest(
        JobPostStatus status,
        @Min(0) int page,
        @Min(1) @Max(100) int size,
        String sortBy,
        SortDirection direction) {
    public JobPostFilterRequest {
        if (sortBy == null || sortBy.isBlank()) {
            sortBy = "createdAt";
        }
        if (size == 0) {
            size = 10;
        }
    }
}