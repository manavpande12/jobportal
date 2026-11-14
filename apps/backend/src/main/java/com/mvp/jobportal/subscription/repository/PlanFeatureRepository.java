package com.mvp.jobportal.subscription.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mvp.jobportal.subscription.entity.PlanFeature;

public interface PlanFeatureRepository
        extends JpaRepository<PlanFeature, UUID> {
}
