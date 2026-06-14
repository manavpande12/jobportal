package com.mvp.jobportal.recruiter.mapper;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.common.util.PatchUtils;
import com.mvp.jobportal.recruiter.dto.RecruiterProfileResponse;
import com.mvp.jobportal.recruiter.dto.UpdateRecruiterProfileRequest;
import com.mvp.jobportal.recruiter.entity.RecruiterProfile;
import com.mvp.jobportal.user.entity.User;

@Component
public class RecruiterProfileMapper {

    public RecruiterProfileResponse toResponse(RecruiterProfile recruiterProfile) {
        if (recruiterProfile == null) {
            return null;
        }
        return RecruiterProfileResponse.builder()
                .userId(recruiterProfile.getUser().getId())
                .companyId(
                        recruiterProfile.getCompany() != null
                                ? recruiterProfile.getCompany().getId()
                                : null)
                .email(recruiterProfile.getUser().getEmail())
                .firstName(recruiterProfile.getUser().getFirstName())
                .lastName(recruiterProfile.getUser().getLastName())
                .createdAt(recruiterProfile.getUser().getCreatedAt())
                .updatedAt(recruiterProfile.getUpdatedAt())
                .designation(recruiterProfile.getDesignation())
                .build();
    }

    public RecruiterProfile toEntity(User user) {
        return RecruiterProfile.builder()
                .user(user)
                .build();
    }

    public void patchEntity(RecruiterProfile recruiterProfile, UpdateRecruiterProfileRequest request) {
        PatchUtils.setIfNotNull(recruiterProfile::setDesignation, request.designation());
    }
}
