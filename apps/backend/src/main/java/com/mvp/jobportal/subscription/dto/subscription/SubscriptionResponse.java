
package com.mvp.jobportal.subscription.dto.subscription;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.mvp.jobportal.subscription.enums.BillingCycle;
import com.mvp.jobportal.subscription.enums.SubscriptionStatus;

import lombok.Builder;

@Builder
public record SubscriptionResponse(

                UUID id,
                UUID planId,
                String planName,
                String planCode,
                BigDecimal amountPaid,
                String currency,
                Integer validityDays,
                BillingCycle billingCycle,
                SubscriptionStatus status,
                boolean autoRenew,
                LocalDateTime startDate,
                LocalDateTime endDate,
                LocalDateTime createdAt

) {
}
