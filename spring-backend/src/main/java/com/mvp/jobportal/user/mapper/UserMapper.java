package com.mvp.jobportal.user.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.mvp.jobportal.common.util.PatchUtils;
import com.mvp.jobportal.user.dto.CreateUserRequest;
import com.mvp.jobportal.user.dto.UpdateUserRequest;
import com.mvp.jobportal.user.dto.UserResponse;
import com.mvp.jobportal.user.entity.User;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final PasswordEncoder passwordEncoder;

    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }

        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public User toEntity(CreateUserRequest request) {
        return User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email().trim().toLowerCase())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .build();
    }

    public void patchEntity(User user, UpdateUserRequest request) {
        PatchUtils.setIfNotNull(user::setFirstName, request.firstName());
        PatchUtils.setIfNotNull(user::setLastName, request.lastName());
    }
}
