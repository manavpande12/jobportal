package com.mvp.jobportal.company.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;

@Builder
public record CompanyResponse(
                UUID id,
                String name,
                String slug,
                String headline,
                String industry,
                String domain,
                Integer companySize,
                Integer foundedYear,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {
}