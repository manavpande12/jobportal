package com.mvp.jobportal.refreshtoken.service;

import java.util.UUID;

import com.mvp.jobportal.refreshtoken.entity.RefreshToken;
import com.mvp.jobportal.user.entity.User;

import jakarta.servlet.http.HttpServletRequest;

public interface RefreshTokenService {

    String generateRefreshToken();

    RefreshToken createRefreshToken(User user, HttpServletRequest request, String refreshTokenValue, String sessionId);

    RefreshToken validateRefreshToken(String token);

    void revokeRefreshToken(RefreshToken refreshToken);

    void revokeAllUserTokens(UUID userId);

    void revokeSession(String sessionId);
}