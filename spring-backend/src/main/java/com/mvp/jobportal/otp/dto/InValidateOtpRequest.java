package com.mvp.jobportal.otp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record InValidateOtpRequest(
        @NotBlank(message = "Email is required.") @Email(message = "Invalid email format.") String email

) {

}
