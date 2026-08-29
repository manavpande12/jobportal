package com.mvp.jobportal.otp.controller;

import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.otp.dto.SendOtpRequest;
import com.mvp.jobportal.otp.dto.ValidateOtpRequest;
import com.mvp.jobportal.otp.service.OtpService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "OTP")
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/sent-otp")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody SendOtpRequest request) {
        otpService.generateAndSendOtp(request);
        return ResponseEntity.ok(
                ApiResponse.success("OTP sent successfully.", null));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody ValidateOtpRequest request) {
        otpService.validateOtp(request);
        return ResponseEntity.ok(
                ApiResponse.success("OTP verified successfully.", null));

    }
}
