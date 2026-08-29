package com.mvp.jobportal.recruiter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mvp.jobportal.recruiter.entity.RecruiterProfile;

import java.util.Optional;
import java.util.UUID;

public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, UUID> {
        @Query("""
                            SELECT rp
                            FROM RecruiterProfile rp
                            LEFT JOIN FETCH rp.company
                            WHERE rp.user.id = :userId
                              AND rp.user.deleted = false
                        """)
        Optional<RecruiterProfile> findActiveUserById(@Param("userId") UUID userId);

        boolean existsByUserId(UUID userId);

        Page<RecruiterProfile> findByCompanyId(UUID companyId, Pageable pageable);
}