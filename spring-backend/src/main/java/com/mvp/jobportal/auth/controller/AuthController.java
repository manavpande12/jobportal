package com.mvp.jobportal.auth.controller;

import com.mvp.jobportal.auth.dto.AuthPayload;
import com.mvp.jobportal.auth.dto.ForgotPasswordRequest;
import com.mvp.jobportal.auth.dto.LoginRequest;
import com.mvp.jobportal.auth.dto.RegisterRequest;
import com.mvp.jobportal.auth.service.AuthService;
import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.dto.CookieOptions;
import com.mvp.jobportal.common.security.jwt.JwtService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Authentication")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(
                ApiResponse.success("User register successfully.", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Void>> login(@Valid @RequestBody LoginRequest loginRequest,
            HttpServletResponse response, HttpServletRequest request) {

        AuthPayload payload = authService.login(loginRequest, request);
        jwtService.addCookie(response, CookieOptions.accessToken(payload.accessToken(), 30));
        jwtService.addCookie(response, CookieOptions.refreshToken(payload.refreshToken(), 30));
        return ResponseEntity.ok(
                ApiResponse.success("Login Successfully.", null));

    }

    @PutMapping("/forget-password")
    public ResponseEntity<ApiResponse<Void>> forgetPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgetPassword(request);
        return ResponseEntity.ok(
                ApiResponse.success("Password reset successfully.", null));

    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request);
        jwtService.clearCookie(response, "refreshToken");
        jwtService.clearCookie(response, "accessToken");
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully.", null));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Void>> refresh(HttpServletRequest request, HttpServletResponse response) {
        AuthPayload payload = authService.refreshToken(request);
        jwtService.clearCookie(response, "refreshToken");
        jwtService.clearCookie(response, "accessToken");
        jwtService.addCookie(response, CookieOptions.accessToken(payload.accessToken(), 30));
        jwtService.addCookie(response, CookieOptions.refreshToken(payload.refreshToken(), 30));
        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully.", null));
    }

}
