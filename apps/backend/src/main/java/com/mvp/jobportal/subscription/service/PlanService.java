
package com.mvp.jobportal.subscription.service;

import java.util.List;
import java.util.UUID;

import com.mvp.jobportal.subscription.dto.plan.PlanRequest;
import com.mvp.jobportal.subscription.dto.plan.PlanResponse;
import com.mvp.jobportal.subscription.dto.plan.PlanStatusRequest;
import com.mvp.jobportal.user.enums.RoleType;

public interface PlanService {

    void createPlan(PlanRequest request);

    void updatePlan(UUID id, PlanRequest request);

    PlanResponse getPlanById(UUID id);

    List<PlanResponse> getAllPlans();

    List<PlanResponse> getActivePlansByRole(RoleType role);

    void updatePlanStatus(UUID id, PlanStatusRequest request);
}
