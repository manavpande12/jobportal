package com.mvp.jobportal.user.controller;

import com.mvp.jobportal.user.dto.ChangePasswordRequest;
import com.mvp.jobportal.user.dto.UserResponse;
import com.mvp.jobportal.user.enums.RoleType;
import com.mvp.jobportal.user.service.UserService;
import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.util.SecurityUtils;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User Services")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasAnyRole('JOB_SEEKER', 'RECRUITER', 'ADMIN')")
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getUser() {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        UserResponse userResponse = userService.getById(userId);
        return ResponseEntity.ok(ApiResponse.success("User fetched successfully.", userResponse));
    }

    @PreAuthorize("hasAnyRole('JOB_SEEKER', 'RECRUITER', 'ADMIN')")
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<?>> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        userService.changePassword(userId, request);
        return ResponseEntity.ok(
                ApiResponse.success("Password changed successfully.", null));

    }

    @PreAuthorize("hasAnyRole('JOB_SEEKER', 'RECRUITER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable UUID id) {
        UserResponse res = userService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("User fetched successfully.", res));
    }

    @GetMapping("/roles/{id}")
    public ResponseEntity<ApiResponse<RoleType>> getRoleById(@PathVariable UUID id) {
        RoleType res = userService.getRoleById(id);
        return ResponseEntity.ok(ApiResponse.success("User role fetched successfully.", res));
    }
}
