package com.mvp.jobportal.application.service.impl;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mvp.jobportal.application.dto.ApplicationFilterRequest;
import com.mvp.jobportal.application.dto.ApplicationResponse;
import com.mvp.jobportal.application.entity.Application;
import com.mvp.jobportal.application.enums.ApplicationStatus;
import com.mvp.jobportal.application.mapper.ApplicationMapper;
import com.mvp.jobportal.application.repository.ApplicationRepository;
import com.mvp.jobportal.application.service.ApplicationService;
import com.mvp.jobportal.application.specification.ApplicationSpecification;
import com.mvp.jobportal.common.dto.PageResponse;
import com.mvp.jobportal.common.exception.ConflictException;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobpost.enums.JobPostStatus;
import com.mvp.jobportal.jobpost.repository.JobPostRepository;
import com.mvp.jobportal.jobseeker.entity.JobSeekerProfile;
import com.mvp.jobportal.jobseeker.repository.JobSeekerProfileRepository;
import com.mvp.jobportal.user.entity.User;
import com.mvp.jobportal.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ApplicationServiceImpl implements ApplicationService {
        private final JobPostRepository jobPostRepository;
        private final UserRepository userRepository;
        private final ApplicationMapper applicationMapper;
        private final ApplicationRepository applicationRepository;
        private final JobSeekerProfileRepository jobSeekerProfileRepository;

        @Override
        @Transactional
        public void apply(UUID jobPostId, UUID userId) {
                JobPost jobPost = jobPostRepository.findByIdAndDeletedFalseAndCreatedBy_DeletedFalse(jobPostId)
                                .orElseThrow(() -> new ResourceNotFoundException("Job post not found."));
                User user = userRepository.findActiveUserById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
                if (hasApplied(jobPostId, userId)) {
                        throw new ConflictException("You already applied for this job.");
                }
                if (jobPost.getStatus() != JobPostStatus.ACTIVE) {
                        throw new ConflictException("Job post is not accepting applications.");
                }

                Application application = applicationMapper.toEntity(jobPost, user, ApplicationStatus.APPLIED);
                applicationRepository.save(application);
        }

        @Override
        public PageResponse<ApplicationResponse> getForJobSeeker(UUID userId, ApplicationFilterRequest request,
                        Pageable pageable) {
                Specification<Application> specification = Specification
                                .where(ApplicationSpecification.byJobSeeker(userId))
                                .and(ApplicationSpecification.activeRelations());

                if (request.search() != null && !request.search().isBlank()) {
                        specification = specification.and(ApplicationSpecification.search(request.search()));
                }

                if (request.status() != null) {
                        specification = specification.and(ApplicationSpecification.status(request.status()));
                }

                Page<ApplicationResponse> page = mapApplications(
                                applicationRepository.findAll(specification, pageable));
                return PageResponse.of(page);
        }

        @Override
        public PageResponse<ApplicationResponse> getForJob(UUID jobPostId, Pageable pageable) {
                Page<ApplicationResponse> page = mapApplications(
                                applicationRepository.findByJobPostIdWithRelations(jobPostId, pageable));
                return PageResponse.of(page);
        }

        @Override
        @Transactional
        public void updateStatus(UUID applicationId, ApplicationStatus status) {
                Application application = applicationRepository.findById(applicationId)
                                .orElseThrow(() -> new ResourceNotFoundException("Application not found."));
                application.setStatus(status);
                applicationRepository.save(application);
        }

        @Override
        public boolean hasApplied(UUID jobPostId, UUID userId) {
                return applicationRepository.existsByJobPostIdAndUserId(jobPostId, userId);
        }

        @Override
        public Map<ApplicationStatus, Long> getJobSeekerApplicationStatusCount(UUID userId) {
                return applicationRepository.countByStatus(userId)
                                .stream()
                                .collect(Collectors.toMap(row -> (ApplicationStatus) row[0], row -> (Long) row[1]));
        }

        @Override
        public PageResponse<ApplicationResponse> getForRecruiter(UUID userId, ApplicationFilterRequest request,
                        Pageable pageable) {
                Specification<Application> specification = Specification
                                .where(ApplicationSpecification.byRecruiter(userId))
                                .and(ApplicationSpecification.activeRelations());

                if (request.search() != null && !request.search().isBlank()) {
                        specification = specification.and(ApplicationSpecification.search(request.search()));
                }

                if (request.status() != null) {
                        specification = specification.and(ApplicationSpecification.status(request.status()));
                }

                Page<ApplicationResponse> page = mapApplications(
                                applicationRepository.findAll(specification, pageable));
                return PageResponse.of(page);
        }

        private Page<ApplicationResponse> mapApplications(Page<Application> applications) {

                List<UUID> userIds = applications.getContent()
                                .stream()
                                .map(application -> application.getUser().getId())
                                .distinct()
                                .toList();

                Map<UUID, JobSeekerProfile> profiles = userIds.isEmpty()
                                ? Map.of()
                                : jobSeekerProfileRepository.findAllByUser_IdInAndUser_DeletedFalse(userIds)
                                                .stream()
                                                .collect(Collectors.toMap(
                                                                profile -> profile.getUser().getId(),
                                                                Function.identity()));

                return applications.map(application -> applicationMapper.toResponse(application, profiles));
        }

}
