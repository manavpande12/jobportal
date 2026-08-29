package com.mvp.jobportal.recruiter.service;

import java.util.UUID;

import com.mvp.jobportal.recruiter.dto.RecruiterProfileResponse;
import com.mvp.jobportal.recruiter.dto.UpdateRecruiterProfileRequest;
import com.mvp.jobportal.user.entity.User;

public interface RecruiterProfileService {

    RecruiterProfileResponse getByUserId(UUID userId);

    void updateProfile(UUID userId, UpdateRecruiterProfileRequest request);

    void create(User user);
}
