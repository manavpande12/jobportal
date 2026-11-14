package com.mvp.jobportal.subscription.dto.plan;

import java.math.BigDecimal;
import java.util.List;

import com.mvp.jobportal.subscription.enums.BillingCycle;
import com.mvp.jobportal.subscription.enums.PlanStatus;
import com.mvp.jobportal.user.enums.RoleType;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Builder;

@Builder
public record PlanRequest(

        @NotBlank @Size(max = 100) String name,

        @NotBlank @Size(max = 50) String code,

        @Size(max = 500) String description,

        boolean highlighted,

        @Size(max = 50) String badge,

        @NotBlank @Size(max = 50) String cta,

        @NotNull PlanStatus status,

        @NotNull RoleType role,

        @NotEmpty List<@Valid FeatureRequest> features,

        @NotEmpty List<@Valid PricingRequest> pricingOptions

) {

    @Builder
    public record FeatureRequest(

            @NotBlank @Size(max = 255) String featureName,

            @NotNull @PositiveOrZero Integer displayOrder

    ) {
    }

    @Builder
    public record PricingRequest(

            @NotNull @DecimalMin("0.00") BigDecimal price,

            @NotBlank @Size(min = 3, max = 3) String currency,

            @Positive Integer validityDays,

            @NotNull BillingCycle billingCycle

    ) {
    }
}
