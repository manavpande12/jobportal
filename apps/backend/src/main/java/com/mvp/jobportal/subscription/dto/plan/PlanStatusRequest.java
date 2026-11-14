
package com.mvp.jobportal.subscription.dto.plan;

import com.mvp.jobportal.subscription.enums.PlanStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record PlanStatusRequest(

        @NotNull PlanStatus status

) {
}
