package com.mvp.jobportal.application.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mvp.jobportal.application.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    boolean existsByJobPostIdAndUserId(UUID jobPostId, UUID userId);

    @EntityGraph(attributePaths = { "jobPost", "jobPost.company", "jobPost.skills", "user" })
    @Query("SELECT a FROM Application a WHERE a.id = :id")
    Optional<Application> findByIdWithRelations(UUID id);

    @EntityGraph(attributePaths = { "jobPost", "jobPost.company", "jobPost.skills", "user" })
    @Query("""
                SELECT a
                FROM Application a
                WHERE a.user.id = :userId
                  AND a.user.deleted = false
                  AND a.jobPost.deleted = false
            """)
    Page<Application> findByUserIdWithRelations(UUID userId, Pageable pageable);

    @EntityGraph(attributePaths = { "jobPost", "jobPost.company", "jobPost.skills", "user" })
    @Query("""
                SELECT a
                FROM Application a
                WHERE a.jobPost.id = :jobPostId
                  AND a.jobPost.deleted = false
                  AND a.user.deleted = false
            """)
    Page<Application> findByJobPostIdWithRelations(UUID jobPostId, Pageable pageable);
}