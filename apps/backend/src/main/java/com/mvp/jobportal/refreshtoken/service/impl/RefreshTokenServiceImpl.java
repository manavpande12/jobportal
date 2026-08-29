package com.mvp.jobportal.refreshtoken.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.mvp.jobportal.common.enums.ErrorCode;
import com.mvp.jobportal.common.exception.UnauthorizedException;
import com.mvp.jobportal.refreshtoken.dto.CreateRefreshTokenRequest;
import com.mvp.jobportal.refreshtoken.dto.DeviceMetaData;
import com.mvp.jobportal.refreshtoken.entity.RefreshToken;
import com.mvp.jobportal.refreshtoken.mapper.RefreshTokenMapper;
import com.mvp.jobportal.refreshtoken.repository.RefreshTokenRepository;
import com.mvp.jobportal.refreshtoken.service.RefreshTokenService;
import com.mvp.jobportal.refreshtoken.utils.DeviceUtils;
import com.mvp.jobportal.user.entity.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenMapper refreshTokenMapper;

    @Override
    public String generateRefreshToken() {
        return UUID.randomUUID().toString();
    }

    @Override
    @Transactional
    public RefreshToken createRefreshToken(User user, HttpServletRequest request, String refreshTokenValue,
            String sessionId) {
        String userAgent = request.getHeader("User-Agent");
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isBlank()) {
            ipAddress = request.getRemoteAddr();
        }
        DeviceMetaData device = DeviceUtils.extract(userAgent);
        CreateRefreshTokenRequest createRefreshTokenRequest = CreateRefreshTokenRequest.builder()
                .token(refreshTokenValue)
                .user(user)
                .userAgent(userAgent)
                .ipAddress(ipAddress)
                .sessionId(sessionId)
                .device(device)
                .expiryDate(LocalDateTime.now().plusDays(30))
                .build();

        RefreshToken refreshToken = refreshTokenMapper.toEntity(createRefreshTokenRequest);
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken validateRefreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token", ErrorCode.REFRESH_TOKEN_EXPIRED));

        if (refreshToken.isRevoked()) {
            throw new UnauthorizedException("Refresh token revoked", ErrorCode.REFRESH_TOKEN_EXPIRED);
        }

        if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Refresh token expired", ErrorCode.REFRESH_TOKEN_EXPIRED);
        }

        return refreshToken;
    }

    @Override
    @Transactional
    public void revokeRefreshToken(RefreshToken refreshToken) {
        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);
    }

    @Override
    @Transactional
    public void revokeAllUserTokens(UUID userId) {
        List<RefreshToken> tokens = refreshTokenRepository.findAllByUserIdAndRevokedFalse(userId);
        tokens.forEach(token -> token.setRevoked(true));
        refreshTokenRepository.saveAll(tokens);
    }

    @Transactional
    @Override
    public void revokeSession(String sessionId) {
        List<RefreshToken> tokens = refreshTokenRepository.findAllBySessionIdAndRevokedFalse(sessionId);
        tokens.forEach(token -> token.setRevoked(true));
    }

}
