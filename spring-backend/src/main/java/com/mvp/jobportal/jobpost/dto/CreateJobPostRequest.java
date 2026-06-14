package com.mvp.jobportal.jobpost.dto;

import jakarta.validation.constraints.*;
import java.util.Set;

public record CreateJobPostRequest(

        @NotBlank(message = "Title is required") @Size(min = 5, max = 80, message = "Title must be between 5 and 80 characters") String title,

        @NotBlank(message = "Description is required") @Size(max = 20000, message = "Description is too large") String description,

        @Size(min = 3, max = 20, message = "Skills must be between 3 and 20") Set<Long> skillIds) {
}