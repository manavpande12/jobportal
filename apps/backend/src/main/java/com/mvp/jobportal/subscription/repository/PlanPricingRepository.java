package com.mvp.jobportal.subscription.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mvp.jobportal.subscription.entity.PlanPricing;

public interface PlanPricingRepository extends JpaRepository<PlanPricing, UUID> {

    List<PlanPricing> findByPlanIdAndActiveTrue(UUID planId);
}
