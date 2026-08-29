package com.mvp.jobportal.user.service.impl;

import com.mvp.jobportal.common.exception.BadRequestException;
import com.mvp.jobportal.common.exception.ConflictException;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.refreshtoken.repository.RefreshTokenRepository;
import com.mvp.jobportal.user.dto.ChangePasswordRequest;
import com.mvp.jobportal.user.dto.CreateUserRequest;
import com.mvp.jobportal.user.dto.UpdatePasswordRequest;
import com.mvp.jobportal.user.dto.UpdateUserRequest;
import com.mvp.jobportal.user.dto.UserResponse;
import com.mvp.jobportal.user.entity.User;
import com.mvp.jobportal.user.enums.RoleType;
import com.mvp.jobportal.user.mapper.UserMapper;
import com.mvp.jobportal.user.repository.UserRepository;
import com.mvp.jobportal.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserMapper userMapper;

    @Transactional
    @Override
    public void changePassword(UUID userId, ChangePasswordRequest request) {

        User user = userRepository.findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password is wrong.");
        }

        if (passwordEncoder.matches(request.newPassword(), user.getPassword())) {
            throw new BadRequestException("New password must be different from current password.");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));

        refreshTokenRepository.deleteByUser(user); // invalidate sessions
    }

    @Override
    public UserResponse getById(UUID id) {
        User user = userRepository.findActiveUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        return userMapper.toResponse(user);
    }

    @Transactional
    @Override
    public User create(CreateUserRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new ConflictException("Email already exists.");
        }
        if (request.role() == RoleType.ROLE_ADMIN) {
            throw new BadRequestException("role not found.");
        }
        User user = userMapper.toEntity(request);
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void update(UUID id, UpdateUserRequest request) {
        User user = userRepository.findActiveUserById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found."));
        userMapper.patchEntity(user, request);
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void updatePassword(UUID id, UpdatePasswordRequest request) {
        User user = userRepository.findActiveUserById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found."));

        if (passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadRequestException("New password must be different from old password.");
        }
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);
    }
}
