package com.mvp.jobportal.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mvp.jobportal.company.entity.Company;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
    Optional<Company> findByName(String name);

    Optional<Company> findByCreatedBy_IdAndDeletedFalse(UUID id);

    Optional<Company> findByIdAndDeletedFalse(UUID id);

    boolean existsBySlug(String slug);
}