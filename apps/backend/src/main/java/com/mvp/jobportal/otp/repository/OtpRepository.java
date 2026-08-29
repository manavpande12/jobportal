package com.mvp.jobportal.otp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mvp.jobportal.otp.entity.Otp;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findByEmail(String email);

}
