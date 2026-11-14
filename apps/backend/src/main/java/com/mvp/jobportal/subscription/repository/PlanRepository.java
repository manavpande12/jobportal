package com.mvp.jobportal.subscription.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mvp.jobportal.subscription.entity.Plan;
import com.mvp.jobportal.subscription.enums.PlanStatus;
import com.mvp.jobportal.user.enums.RoleType;

public interface PlanRepository extends JpaRepository<Plan, UUID> {

    Optional<Plan> findByCode(String code);

    List<Plan> findByRoleAndStatus(RoleType role, PlanStatus status);

    boolean existsByCode(String code);

    boolean existsByCodeAndIdNot(String code, UUID id);
}
