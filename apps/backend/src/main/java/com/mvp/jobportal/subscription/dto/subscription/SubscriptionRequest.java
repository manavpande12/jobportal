
package com.mvp.jobportal.subscription.dto.subscription;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record SubscriptionRequest(

                @NotNull UUID pricingId,

                boolean autoRenew

) {
}
