package com.mvp.jobportal.company.dto;

import jakarta.validation.constraints.*;

public record CreateCompanyRequest(

        @NotBlank(message = "Company name is required") @Size(min = 2, max = 60, message = "Company name must be between 2 and 60 characters") String name,

        @NotBlank(message = "Headline is required") @Size(min = 2, max = 100, message = "Headline must be between 2 and 100 characters") String headline,

        @NotBlank(message = "Industry is required") @Size(min = 2, max = 25, message = "Industry must be between 2 and 25 characters") String industry,

        @NotBlank(message = "Domain is required") @Size(min = 3, max = 255, message = "Domain must be between 3 and 255 characters") @Pattern(regexp = "^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]{2,}$", message = "Invalid domain format") String domain,

        @NotNull(message = "Company size is required") @Min(value = 1, message = "Company size must be at least 1") @Max(value = 1000000, message = "Company size is too large") Integer companySize,

        @NotNull(message = "Founded year is required") @Min(value = 1800, message = "Founded year is invalid") @Max(value = 2100, message = "Founded year is invalid") Integer foundedYear

) {
}