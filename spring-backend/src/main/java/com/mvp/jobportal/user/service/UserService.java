package com.mvp.jobportal.user.service;

import java.util.UUID;

import com.mvp.jobportal.user.dto.ChangePasswordRequest;
import com.mvp.jobportal.user.dto.CreateUserRequest;
import com.mvp.jobportal.user.dto.UpdatePasswordRequest;
import com.mvp.jobportal.user.dto.UpdateUserRequest;
import com.mvp.jobportal.user.dto.UserResponse;
import com.mvp.jobportal.user.entity.User;

public interface UserService {
    UserResponse getById(UUID id);

    User create(CreateUserRequest request);

    void update(UUID id, UpdateUserRequest request);

    void changePassword(UUID id, ChangePasswordRequest request);

    void updatePassword(UUID id, UpdatePasswordRequest request);
}