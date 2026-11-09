package com.mvp.jobportal.recruiter.dto;

import java.util.UUID;
import lombok.Builder;

@Builder
public record RecruiterPublicProfileResponse(
        UUID id,
        UUID companyId,
        String email,
        String firstName,
        String lastName,
        String designation) {

}
