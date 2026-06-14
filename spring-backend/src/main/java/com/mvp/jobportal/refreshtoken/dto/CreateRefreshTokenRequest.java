package com.mvp.jobportal.refreshtoken.dto;

import java.time.LocalDateTime;

import com.mvp.jobportal.user.entity.User;

import lombok.Builder;

@Builder
public record CreateRefreshTokenRequest(
        String token,
        User user,
        String userAgent,
        String ipAddress,
        String sessionId,
        DeviceMetaData device,
        LocalDateTime expiryDate) {
}