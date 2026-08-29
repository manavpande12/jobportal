package com.mvp.jobportal.user.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.mvp.jobportal.user.enums.RoleType;

import lombok.Builder;

@Builder
public record UserResponse(
                UUID id,
                String firstName,
                String lastName,
                String email,
                RoleType role,
                LocalDateTime createdAt,
                LocalDateTime updatedAt) {

}
