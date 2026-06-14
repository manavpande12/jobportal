package com.mvp.jobportal.otp.service.impl;

import com.mvp.jobportal.common.exception.BadRequestException;
import com.mvp.jobportal.notification.dto.SendOtpEmailRequest;
import com.mvp.jobportal.notification.service.EmailService;
import com.mvp.jobportal.otp.dto.InValidateOtpRequest;
import com.mvp.jobportal.otp.dto.SendOtpRequest;
import com.mvp.jobportal.otp.dto.ValidateOtpRequest;
import com.mvp.jobportal.otp.entity.Otp;
import com.mvp.jobportal.otp.repository.OtpRepository;
import com.mvp.jobportal.otp.service.OtpService;

import jakarta.transaction.Transactional;
import lombok.*;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Override
    public void generateAndSendOtp(SendOtpRequest request) {
        Otp otp = otpRepository.findByEmail(request.email()).orElse(null);
        String otpValue = generateOtp();
        if (otp != null && otp.getCreatedAt() != null &&
                otp.getCreatedAt().isAfter(LocalDateTime.now().minusSeconds(30))) {
            throw new BadRequestException("OTP already sent. Please wait 30 seconds.");
        }
        if (otp != null) {
            otp.setOtp(otpValue);
            otp.setCreatedAt(LocalDateTime.now());
            otp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
            otp.setAttempts(0);
            otp.setVerified(false);
            otp.setUsed(false);
        } else {
            otp = Otp.builder()
                    .email(request.email())
                    .otp(otpValue)
                    .createdAt(LocalDateTime.now())
                    .expiryTime(LocalDateTime.now().plusMinutes(5))
                    .attempts(0)
                    .verified(false)
                    .used(false)
                    .build();
        }

        otpRepository.save(otp);
        SendOtpEmailRequest sendOtpEmailRequest = SendOtpEmailRequest.builder()
                .to(request.email())
                .subject(request.subject())
                .otp(otpValue)
                .build();
        emailService.sendOtpInEmail(sendOtpEmailRequest);
    }

    @Override
    @Transactional
    public void validateOtp(ValidateOtpRequest request) {
        Otp otp = otpRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadRequestException("Otp not found."));
        if (otp.isUsed()) {
            throw new BadRequestException("Otp already used.");
        }
        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            otp.setUsed(true);
            otpRepository.save(otp);
            throw new BadRequestException("OTP expired");
        }
        if (!otp.getOtp().equals(request.enteredOtp())) {
            otp.setAttempts(otp.getAttempts() + 1);
            if (otp.getAttempts() >= 3) {
                otp.setUsed(true);
                otpRepository.save(otp);
                throw new BadRequestException("Maximum attempts exceeded. Request new OTP.");
            }
            otpRepository.save(otp);
            throw new BadRequestException("Invalid OTP.");
        }
        otp.setVerified(true);
        otpRepository.save(otp);
    }

    @Override
    public void inValidateOtp(InValidateOtpRequest request) {
        Otp otp = otpRepository
                .findByEmail(request.email())
                .orElseThrow(() -> new BadRequestException("Verify email again."));

        if (!otp.isVerified()) {
            throw new BadRequestException("Verify email again.");
        }

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP has expired. Verify email again.");
        }

        otp.setVerified(false);
        otp.setUsed(true);
        otpRepository.save(otp);
    }
}
