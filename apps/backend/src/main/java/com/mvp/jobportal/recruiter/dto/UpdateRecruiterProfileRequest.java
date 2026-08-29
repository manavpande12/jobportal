package com.mvp.jobportal.recruiter.dto;

import jakarta.validation.constraints.Size;

public record UpdateRecruiterProfileRequest(
                @Size(min = 2, max = 15, message = "First name must be between 2 and 15 characters") String firstName,
                @Size(min = 2, max = 15, message = "Last name must be between 2 and 15 characters") String lastName,
                @Size(min = 10, max = 50, message = "Designation must not exceed 45 characters") String designation) {
}
