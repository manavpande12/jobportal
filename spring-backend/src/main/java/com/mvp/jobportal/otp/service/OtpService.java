package com.mvp.jobportal.otp.service;

import com.mvp.jobportal.otp.dto.InValidateOtpRequest;
import com.mvp.jobportal.otp.dto.SendOtpRequest;
import com.mvp.jobportal.otp.dto.ValidateOtpRequest;

public interface OtpService {
    void generateAndSendOtp(SendOtpRequest request);

    void validateOtp(ValidateOtpRequest request);

    void inValidateOtp(InValidateOtpRequest request);
}
