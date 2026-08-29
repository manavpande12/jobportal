package com.mvp.jobportal.user.dto;

import com.mvp.jobportal.user.enums.RoleType;

import lombok.Builder;

@Builder
public record CreateUserRequest(
                String firstName,
                String lastName,
                String email,
                String password,
                RoleType role) {
}
