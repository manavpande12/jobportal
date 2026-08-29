package com.mvp.jobportal.jobseeker.service.impl;

import java.util.UUID;
import org.springframework.stereotype.Service;
import com.mvp.jobportal.jobseeker.dto.JobSeekerProfileResponse;
import com.mvp.jobportal.jobseeker.dto.UpdateJobSeekerProfileRequest;
import com.mvp.jobportal.jobseeker.entity.JobSeekerProfile;
import com.mvp.jobportal.jobseeker.mapper.JobSeekerProfileMapper;
import com.mvp.jobportal.jobseeker.repository.JobSeekerProfileRepository;
import com.mvp.jobportal.jobseeker.service.JobSeekerProfileService;
import com.mvp.jobportal.user.dto.UpdateUserRequest;
import com.mvp.jobportal.user.entity.User;
import com.mvp.jobportal.user.service.UserService;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobSeekerProfileImpl implements JobSeekerProfileService {
    private final JobSeekerProfileRepository jobSeekerProfileRepository;
    private final JobSeekerProfileMapper jobSeekerProfileMapper;
    private final UserService userService;

    public JobSeekerProfileResponse getByUserId(UUID userId) {
        JobSeekerProfile jobSeekerProfile = jobSeekerProfileRepository.findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found."));

        return jobSeekerProfileMapper.toResponse(jobSeekerProfile);
    }

    @Transactional
    public void update(UUID userId, UpdateJobSeekerProfileRequest request) {

        JobSeekerProfile jobSeekerProfile = jobSeekerProfileRepository.findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found."));

        if (request.firstName() == null && request.lastName() == null &&
                request.resumeUrl() == null &&
                request.yearsOfExperience() == null &&
                request.headline() == null &&
                request.aboutMe() == null &&
                request.skills() == null) {
            throw new IllegalArgumentException("At least one field must be provided for update");
        }

        UpdateUserRequest updateUserRequest = UpdateUserRequest.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .build();
        userService.update(userId, updateUserRequest);

        jobSeekerProfileMapper.patchEntity(jobSeekerProfile, request);
        jobSeekerProfileRepository.save(jobSeekerProfile);

    }

    @Override
    @Transactional
    public void create(User user) {
        JobSeekerProfile jobSeekerProfile = jobSeekerProfileMapper.toEntity(user);
        jobSeekerProfileRepository.save(jobSeekerProfile);
    }

}
