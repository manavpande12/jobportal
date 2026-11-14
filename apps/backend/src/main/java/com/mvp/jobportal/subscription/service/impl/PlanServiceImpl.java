
package com.mvp.jobportal.subscription.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mvp.jobportal.common.exception.ConflictException;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.subscription.dto.plan.PlanRequest;
import com.mvp.jobportal.subscription.dto.plan.PlanResponse;
import com.mvp.jobportal.subscription.dto.plan.PlanStatusRequest;
import com.mvp.jobportal.subscription.entity.Plan;
import com.mvp.jobportal.subscription.enums.PlanStatus;
import com.mvp.jobportal.subscription.enums.SubscriptionStatus;
import com.mvp.jobportal.subscription.mapper.PlanMapper;
import com.mvp.jobportal.subscription.repository.PlanRepository;
import com.mvp.jobportal.subscription.repository.UserSubscriptionRepository;
import com.mvp.jobportal.subscription.service.PlanService;
import com.mvp.jobportal.user.enums.RoleType;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlanServiceImpl implements PlanService {
    private final PlanRepository planRepository;
    private final PlanMapper planMapper;
    private final UserSubscriptionRepository userSubscriptionRepository;

    @Override
    @Transactional
    public void createPlan(PlanRequest request) {
        if (planRepository.existsByCode(request.code())) {
            throw new ConflictException("Plan code already exists: " + request.code());
        }
        Plan plan = planMapper.toEntity(request);
        planRepository.save(plan);

    }

    @Override
    @Transactional
    public void updatePlan(UUID id, PlanRequest request) {
        Plan plan = getPlanEntity(id);

        if (planRepository.existsByCodeAndIdNot(request.code(), id)) {
            throw new ConflictException("Plan code already exists: " + request.code());
        }

        planMapper.updateEntity(plan, request);

        if (plan.getStatus() != PlanStatus.ACTIVE) {

            userSubscriptionRepository.failPendingSubscriptionsByPlanId(
                    plan.getId(),
                    SubscriptionStatus.PENDING,
                    SubscriptionStatus.FAILED);

        } else {

            List<UUID> inactivePricingIds = plan.getPricingOptions()
                    .stream()
                    .filter(pricing -> !pricing.isActive())
                    .map(pricing -> pricing.getId())
                    .filter(java.util.Objects::nonNull)
                    .toList();

            if (!inactivePricingIds.isEmpty()) {
                userSubscriptionRepository.failPendingSubscriptionsByPricingIds(
                        inactivePricingIds,
                        SubscriptionStatus.PENDING,
                        SubscriptionStatus.FAILED);
            }
        }
    }

    @Override
    public PlanResponse getPlanById(UUID id) {
        Plan plan = getPlanEntity(id);
        return planMapper.toResponse(plan);
    }

    @Override
    public List<PlanResponse> getAllPlans() {
        return planRepository.findAll()
                .stream()
                .map(planMapper::toResponse)
                .toList();
    }

    @Override
    public List<PlanResponse> getActivePlansByRole(RoleType role) {
        return planRepository
                .findByRoleAndStatus(role, PlanStatus.ACTIVE)
                .stream()
                .map(planMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public void updatePlanStatus(UUID id, PlanStatusRequest request) {
        Plan plan = getPlanEntity(id);

        plan.setStatus(request.status());

        if (request.status() != PlanStatus.ACTIVE) {
            userSubscriptionRepository.failPendingSubscriptionsByPlanId(
                    plan.getId(),
                    SubscriptionStatus.PENDING,
                    SubscriptionStatus.FAILED);
        }
    }

    private Plan getPlanEntity(UUID id) {
        return planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan not found with ID: " + id));
    }
}
