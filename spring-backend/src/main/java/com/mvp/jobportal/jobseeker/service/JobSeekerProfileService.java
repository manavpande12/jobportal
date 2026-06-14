package com.mvp.jobportal.jobseeker.service;

import java.util.UUID;
import com.mvp.jobportal.jobseeker.dto.JobSeekerProfileResponse;
import com.mvp.jobportal.jobseeker.dto.UpdateJobSeekerProfileRequest;
import com.mvp.jobportal.user.entity.User;

public interface JobSeekerProfileService {

    JobSeekerProfileResponse getByUserId(UUID userId);

    void update(UUID userId, UpdateJobSeekerProfileRequest request);

    void create(User user);

}
