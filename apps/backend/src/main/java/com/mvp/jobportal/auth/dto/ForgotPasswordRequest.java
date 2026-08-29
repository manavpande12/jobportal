package com.mvp.jobportal.auth.dto;

import jakarta.validation.constraints.*;

public record ForgotPasswordRequest(
                @NotBlank(message = "Email is required.") @Email(message = "Invalid email format.") String email,
                @NotBlank(message = "Password is required") @Size(min = 8, message = "Password must be at least 8 characters") String newPassword) {
}
