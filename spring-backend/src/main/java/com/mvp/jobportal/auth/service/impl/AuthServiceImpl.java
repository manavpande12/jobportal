package com.mvp.jobportal.auth.service.impl;

import com.mvp.jobportal.auth.dto.AuthPayload;
import com.mvp.jobportal.auth.dto.ForgotPasswordRequest;
import com.mvp.jobportal.auth.dto.LoginRequest;
import com.mvp.jobportal.auth.dto.RegisterRequest;
import com.mvp.jobportal.auth.service.AuthService;
import com.mvp.jobportal.jobseeker.service.JobSeekerProfileService;
import com.mvp.jobportal.otp.dto.InValidateOtpRequest;
import com.mvp.jobportal.otp.service.OtpService;
import com.mvp.jobportal.recruiter.service.RecruiterProfileService;
import com.mvp.jobportal.refreshtoken.entity.RefreshToken;
import com.mvp.jobportal.refreshtoken.repository.RefreshTokenRepository;
import com.mvp.jobportal.refreshtoken.service.RefreshTokenService;
import com.mvp.jobportal.user.dto.CreateUserRequest;
import com.mvp.jobportal.user.dto.UpdatePasswordRequest;
import com.mvp.jobportal.user.entity.User;
import com.mvp.jobportal.user.enums.RoleType;
import com.mvp.jobportal.user.repository.UserRepository;
import com.mvp.jobportal.user.service.UserService;
import com.mvp.jobportal.common.enums.ErrorCode;
import com.mvp.jobportal.common.exception.*;
import com.mvp.jobportal.common.security.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final OtpService otpService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JobSeekerProfileService jobSeekerProfileService;
    private final RecruiterProfileService recruiterProfileService;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;

    @Transactional
    @Override
    public void register(RegisterRequest request) {
        // InValidate OTP
        InValidateOtpRequest inValidateOtpRequest = InValidateOtpRequest.builder().email(request.email()).build();
        otpService.inValidateOtp(inValidateOtpRequest);

        // Create User
        CreateUserRequest createUserRequest = CreateUserRequest.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(request.password())
                .role(request.role())
                .build();
        User user = userService.create(createUserRequest);

        // Create Profile Based on Role
        if (request.role() == RoleType.ROLE_JOB_SEEKER) {
            jobSeekerProfileService.create(user);
        }

        if (request.role() == RoleType.ROLE_RECRUITER) {
            recruiterProfileService.create(user);
        }

    }

    @Transactional
    @Override
    public AuthPayload login(LoginRequest loginRequest, HttpServletRequest request) {
        String email = loginRequest.email().trim().toLowerCase();
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new UnauthorizedException("Invalid email or password.", ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password.", ErrorCode.INVALID_CREDENTIALS);
        }
        if (user.isDeleted()) {
            throw new ForbiddenException("Account is deleted or suspended.");
        }

        String accessToken = jwtService.generateAccessToken(user);
        String refreshTokenValue = refreshTokenService.generateRefreshToken();
        String sessionId = UUID.randomUUID().toString();
        refreshTokenService.createRefreshToken(user, request, refreshTokenValue, sessionId);
        return new AuthPayload(accessToken, refreshTokenValue);
    }

    @Transactional
    @Override
    public void forgetPassword(ForgotPasswordRequest request) {
        String email = request.email().trim().toLowerCase();
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email, user not found.",
                        ErrorCode.INVALID_CREDENTIALS));

        if (user.isDeleted()) {
            throw new ForbiddenException("Account is deleted or suspended.");
        }

        // InValidate OTP
        InValidateOtpRequest inValidateOtpRequest = InValidateOtpRequest.builder().email(request.email()).build();
        otpService.inValidateOtp(inValidateOtpRequest);

        // Update Password
        UpdatePasswordRequest updatePasswordRequest = UpdatePasswordRequest.builder()
                .password(request.newPassword())
                .build();
        userService.updatePassword(user.getId(), updatePasswordRequest);

        // InValidate Session
        refreshTokenRepository.deleteByUser(user);
    }

    @Transactional
    @Override
    public void logout(HttpServletRequest request) {
        String refreshTokenValue = jwtService.extractTokenFromCookies(request, "refreshToken");
        if (refreshTokenValue == null || refreshTokenValue.isBlank()) {
            throw new UnauthorizedException("Refresh token missing", ErrorCode.REFRESH_TOKEN_EXPIRED);
        }
        RefreshToken refreshToken = refreshTokenService.validateRefreshToken(refreshTokenValue);
        refreshTokenService.revokeSession(refreshToken.getSessionId());
    }

    @Transactional
    @Override
    public AuthPayload refreshToken(HttpServletRequest request) {
        String refreshTokenValue = jwtService.extractTokenFromCookies(request, "refreshToken");
        if (refreshTokenValue == null || refreshTokenValue.isBlank()) {
            throw new UnauthorizedException("Refresh token missing", ErrorCode.REFRESH_TOKEN_EXPIRED);
        }

        // Validate
        RefreshToken refreshToken = refreshTokenService.validateRefreshToken(refreshTokenValue);
        User user = refreshToken.getUser();

        // Get Old Session
        String sessionId = refreshToken.getSessionId();

        // Revoked
        refreshTokenService.revokeRefreshToken(refreshToken);

        // Create
        String newRefreshTokenValue = refreshTokenService.generateRefreshToken();
        String newAccessToken = jwtService.generateAccessToken(user);
        refreshTokenService.createRefreshToken(user, request, newRefreshTokenValue, sessionId);

        return new AuthPayload(newAccessToken, newRefreshTokenValue);
    }

}
