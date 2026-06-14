package com.mvp.jobportal.notification.service;

import com.mvp.jobportal.notification.dto.SendOtpEmailRequest;

public interface EmailService {
    void sendOtpInEmail(SendOtpEmailRequest request);

}