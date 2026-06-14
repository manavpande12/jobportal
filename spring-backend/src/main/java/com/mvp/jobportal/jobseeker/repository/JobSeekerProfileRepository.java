package com.mvp.jobportal.jobseeker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mvp.jobportal.jobseeker.entity.JobSeekerProfile;

import java.util.Optional;
import java.util.UUID;

public interface JobSeekerProfileRepository extends JpaRepository<JobSeekerProfile, UUID> {
        @Query("""
                        SELECT DISTINCT p
                        FROM JobSeekerProfile p
                        JOIN FETCH p.user
                        LEFT JOIN FETCH p.skills
                        WHERE p.user.id = :userId
                        AND p.user.deleted = false
                        """)
        Optional<JobSeekerProfile> findActiveUserById(
                        @Param("userId") UUID userId);

        boolean existsByUserId(UUID userId);
}