package com.mvp.jobportal.jobseeker.dto;

import java.util.Set;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;

public record UpdateJobSeekerProfileRequest(

        @Size(min = 2, max = 15, message = "First name must be between 2 and 15 characters") String firstName,

        @Size(min = 2, max = 15, message = "Last name must be between 2 and 15 characters") String lastName,

        @Size(max = 500, message = "Resume URL must not exceed 500 characters") String resumeUrl,

        @Min(value = 0, message = "Years of experience cannot be negative") @Max(value = 50, message = "Years of experience cannot exceed 50") Integer yearsOfExperience,

        @Size(min = 10, max = 100, message = "Headline must not exceed 100 characters") String headline,

        @Size(min = 255, max = 1000, message = "About me must not exceed 1000 characters") String aboutMe,

        @Size(min = 3, max = 20, message = "Cannot add more than 20 skills") Set<Long> skills) {
}