package com.mvp.jobportal.refreshtoken.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.refreshtoken.dto.CreateRefreshTokenRequest;
import com.mvp.jobportal.refreshtoken.entity.RefreshToken;

@Component
public class RefreshTokenMapper {
    public RefreshToken toEntity(CreateRefreshTokenRequest request) {
        return RefreshToken.builder()
                .token(request.token())
                .user(request.user())
                .expiryDate(request.expiryDate())
                .revoked(false)
                .userAgent(request.userAgent())
                .ipAddress(request.ipAddress())
                .sessionId(request.sessionId())
                .browser(request.device().getBrowser())
                .operatingSystem(request.device().getOperatingSystem())
                .deviceName(request.device().getDeviceName())
                .deviceType(request.device().getDeviceType())
                .lastUsedAt(LocalDateTime.now())
                .build();
    }
}
