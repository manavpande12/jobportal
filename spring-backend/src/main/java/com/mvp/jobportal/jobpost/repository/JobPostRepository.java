package com.mvp.jobportal.jobpost.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobpost.enums.JobPostStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JobPostRepository extends JpaRepository<JobPost, UUID> {

      @Query("""
                  SELECT DISTINCT jp
                  FROM JobPost jp
                  LEFT JOIN FETCH jp.createdBy
                  LEFT JOIN FETCH jp.company
                  LEFT JOIN FETCH jp.skills
                  WHERE jp.id = :id
                  AND jp.createdBy.id = :userId
                  AND jp.createdBy.deleted = false
                  """)
      Optional<JobPost> findOwnedDetailedByJobPostIdAndUserId(
                  UUID id,
                  UUID userId);

      @Query("""
                  SELECT DISTINCT jp
                  FROM JobPost jp
                  LEFT JOIN FETCH jp.createdBy
                  LEFT JOIN FETCH jp.company
                  LEFT JOIN FETCH jp.skills
                  WHERE jp.createdBy.id = :userId
                  AND jp.createdBy.deleted = false
                  """)
      List<JobPost> findOwnedDetailedByUserId(UUID userId);

      @Query("""
                  SELECT DISTINCT jp
                  FROM JobPost jp
                  LEFT JOIN FETCH jp.createdBy
                  LEFT JOIN FETCH jp.company
                  LEFT JOIN FETCH jp.skills
                  WHERE jp.id = :jobPostId
                  AND jp.status = com.mvp.jobportal.jobpost.enums.JobPostStatus.ACTIVE
                  AND jp.createdBy.deleted = false
                  """)
      Optional<JobPost> findPublicDetailedById(UUID jobPostId);

      @EntityGraph(attributePaths = { "createdBy", "company", "skills" })
      Page<JobPost> findByCreatedBy_Id(UUID createdById, Pageable pageable);

      @EntityGraph(attributePaths = { "createdBy", "company", "skills" })
      Page<JobPost> findByCreatedBy_IdAndStatus(UUID createdById, JobPostStatus status, Pageable pageable);

      @Query("""
                      SELECT DISTINCT jp
                      FROM JobPost jp
                      LEFT JOIN jp.skills s
                      WHERE jp.status = com.mvp.jobportal.jobpost.enums.JobPostStatus.ACTIVE
                        AND jp.createdBy.deleted = false
                        AND (
                              :title IS NULL
                              OR LOWER(jp.title) LIKE LOWER(CONCAT('%', :title, '%'))
                              OR LOWER(s.name) LIKE LOWER(CONCAT('%', :title, '%'))
                        )
                        AND (
                              :skillIds IS NULL
                              OR s.id IN :skillIds
                        )
                  """)
      @EntityGraph(attributePaths = {
                  "company",
                  "skills",
                  "createdBy"
      })
      Page<JobPost> searchJobs(
                  String title,
                  List<Long> skillIds,
                  Pageable pageable);
}