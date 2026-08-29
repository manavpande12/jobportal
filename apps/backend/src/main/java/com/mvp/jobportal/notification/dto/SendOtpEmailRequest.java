package com.mvp.jobportal.notification.dto;

import lombok.Builder;

@Builder
public record SendOtpEmailRequest(
                String to,
                String subject,
                String otp) {
}