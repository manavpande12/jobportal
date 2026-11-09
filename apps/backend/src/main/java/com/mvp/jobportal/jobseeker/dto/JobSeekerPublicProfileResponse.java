package com.mvp.jobportal.jobseeker.dto;

import java.util.List;
import java.util.UUID;
import com.mvp.jobportal.skill.dto.SkillResponse;
import lombok.Builder;

@Builder
public record JobSeekerPublicProfileResponse(
        UUID id,
        String email,
        String firstName,
        String lastName,
        String resumeUrl,
        Integer yearsOfExperience,
        String headline,
        String aboutMe,
        List<SkillResponse> skills) {

}
