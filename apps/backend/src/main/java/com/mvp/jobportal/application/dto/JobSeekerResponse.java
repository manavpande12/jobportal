package com.mvp.jobportal.application.dto;

import java.util.UUID;

import lombok.Builder;

@Builder
public record JobSeekerResponse(
        UUID id,
        String firstName,
        String lastName,
        String email) {
}