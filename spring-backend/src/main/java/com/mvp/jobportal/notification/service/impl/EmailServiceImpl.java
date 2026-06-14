package com.mvp.jobportal.notification.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.mvp.jobportal.notification.dto.SendOtpEmailRequest;
import com.mvp.jobportal.notification.service.EmailService;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;

    @Override
    public void sendOtpInEmail(SendOtpEmailRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.to());
        message.setSubject(request.subject());
        message.setText("Your verification code: " + request.otp());
        javaMailSender.send(message);
    }
}
