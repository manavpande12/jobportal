
package com.mvp.jobportal.subscription.dto.plan;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.mvp.jobportal.subscription.enums.BillingCycle;
import com.mvp.jobportal.subscription.enums.PlanStatus;
import com.mvp.jobportal.user.enums.RoleType;

import lombok.Builder;

@Builder
public record PlanResponse(

        UUID id,
        String name,
        String code,
        String description,
        boolean highlighted,
        String badge,
        String cta,
        RoleType role,
        PlanStatus status,

        List<FeatureResponse> features,
        List<PricingResponse> pricingOptions,

        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

    @Builder
    public record FeatureResponse(
            UUID id,
            String featureName,
            Integer displayOrder) {
    }

    @Builder
    public record PricingResponse(
            UUID id,
            BigDecimal price,
            String currency,
            Integer validityDays,
            BillingCycle billingCycle) {
    }
}
