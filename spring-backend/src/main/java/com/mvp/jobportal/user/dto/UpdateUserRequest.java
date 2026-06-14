package com.mvp.jobportal.user.dto;

import lombok.Builder;

@Builder
public record UpdateUserRequest(
        String firstName,
        String lastName) {
}