package com.mvp.jobportal.auth.service;

import com.mvp.jobportal.auth.dto.AuthPayload;
import com.mvp.jobportal.auth.dto.ForgotPasswordRequest;
import com.mvp.jobportal.auth.dto.LoginRequest;
import com.mvp.jobportal.auth.dto.RegisterRequest;

import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {
    void register(RegisterRequest request);

    AuthPayload login(LoginRequest loginRequest, HttpServletRequest request);

    void forgetPassword(ForgotPasswordRequest request);

    void logout(HttpServletRequest request);

    AuthPayload refreshToken(HttpServletRequest request);
}
