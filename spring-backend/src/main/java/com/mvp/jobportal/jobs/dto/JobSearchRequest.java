package com.mvp.jobportal.jobs.dto;

import java.util.List;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record JobSearchRequest(
        String title,
        List<Long> skillIds,
        @Min(0) Integer page,
        @Min(1) @Max(50) Integer size) {
}