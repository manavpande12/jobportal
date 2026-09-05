package com.mvp.jobportal.application.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.mvp.jobportal.application.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, UUID>, JpaSpecificationExecutor<Application> {
  boolean existsByJobPostIdAndUserId(UUID jobPostId, UUID userId);

  @EntityGraph(attributePaths = { "jobPost", "jobPost.company", "jobPost.skills", "user" })
  @Query("SELECT a FROM Application a WHERE a.id = :id")
  Optional<Application> findByIdWithRelations(UUID id);

  @EntityGraph(attributePaths = { "jobPost", "jobPost.company", "jobPost.skills", "user" })
  @Query("""
        SELECT a
        FROM Application a
        WHERE a.jobPost.id = :jobPostId
        AND a.jobPost.deleted = false
        AND a.user.deleted = false
      """)
  Page<Application> findByJobPostIdWithRelations(UUID jobPostId, Pageable pageable);

  @Override
  @EntityGraph(attributePaths = { "jobPost", "jobPost.company", "jobPost.skills", "user" })
  Page<Application> findAll(Specification<Application> specification, Pageable pageable);

  @Query("""
          SELECT a.status, COUNT(a)
          FROM Application a
          WHERE a.user.id = :userId
            AND a.user.deleted = false
            AND a.jobPost.deleted = false
          GROUP BY a.status
      """)
  List<Object[]> countByStatus(UUID userId);
}