package com.mvp.jobportal.auth.dto;

import com.mvp.jobportal.user.enums.RoleType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

                @NotBlank(message = "First name is required") @Size(min = 2, max = 15, message = "First name must be between 2 and 15 characters") String firstName,

                @NotBlank(message = "Last name is required") @Size(min = 2, max = 15, message = "Last name must be between 2 and 15 characters") String lastName,

                @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email,

                @NotBlank(message = "Password is required") @Size(min = 8, message = "Password must be at least 8 characters") String password,

                @NotNull(message = "Role is required.") RoleType role

) {
}