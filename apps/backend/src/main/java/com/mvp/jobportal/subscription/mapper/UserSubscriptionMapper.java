
package com.mvp.jobportal.subscription.mapper;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.subscription.dto.subscription.SubscriptionResponse;
import com.mvp.jobportal.subscription.entity.UserSubscription;
import com.mvp.jobportal.subscription.entity.PlanPricing;

@Component
public class UserSubscriptionMapper {

    public SubscriptionResponse toResponse(UserSubscription subscription) {

        PlanPricing pricing = subscription.getPricing();

        return SubscriptionResponse.builder()
                .id(subscription.getId())
                .planId(subscription.getPlan().getId())
                .planName(subscription.getPlan().getName())
                .planCode(subscription.getPlan().getCode())
                .amountPaid(subscription.getAmountPaid())
                .currency(subscription.getCurrency())
                .validityDays(pricing.getValidityDays())
                .billingCycle(pricing.getBillingCycle())
                .status(subscription.getStatus())
                .autoRenew(subscription.isAutoRenew())
                .startDate(subscription.getStartDate())
                .endDate(subscription.getEndDate())
                .createdAt(subscription.getCreatedAt())
                .build();
    }
}
