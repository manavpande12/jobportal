package com.mvp.jobportal.recruiter.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.mvp.jobportal.recruiter.dto.RecruiterProfileResponse;
import com.mvp.jobportal.recruiter.dto.UpdateRecruiterProfileRequest;
import com.mvp.jobportal.recruiter.entity.RecruiterProfile;
import com.mvp.jobportal.recruiter.mapper.RecruiterProfileMapper;
import com.mvp.jobportal.recruiter.repository.RecruiterProfileRepository;
import com.mvp.jobportal.recruiter.service.RecruiterProfileService;
import com.mvp.jobportal.user.dto.UpdateUserRequest;
import com.mvp.jobportal.user.entity.User;
import com.mvp.jobportal.user.service.UserService;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecruiterProfileServiceImpl implements RecruiterProfileService {
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final RecruiterProfileMapper recruiterProfileMapper;
    private final UserService userService;

    @Transactional
    public RecruiterProfileResponse getByUserId(UUID userId) {
        RecruiterProfile recruiterProfile = recruiterProfileRepository.findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found."));

        return recruiterProfileMapper.toResponse(recruiterProfile);
    }

    @Transactional
    @Override
    public void updateProfile(UUID userId, UpdateRecruiterProfileRequest request) {
        RecruiterProfile recruiterProfile = recruiterProfileRepository.findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found."));

        if (request.firstName() == null && request.lastName() == null && request.designation() == null) {
            throw new IllegalArgumentException("At least one field must be provided for update");
        }

        UpdateUserRequest updateUserRequest = UpdateUserRequest.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .build();
        userService.update(userId, updateUserRequest);

        recruiterProfileMapper.patchEntity(recruiterProfile, request);
        recruiterProfileRepository.save(recruiterProfile);

    }

    @Transactional
    @Override
    public void create(User user) {
        RecruiterProfile recruiterProfile = recruiterProfileMapper.toEntity(user);
        recruiterProfileRepository.save(recruiterProfile);
    }

}
