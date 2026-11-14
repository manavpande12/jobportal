
package com.mvp.jobportal.subscription.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.subscription.dto.plan.PlanRequest;
import com.mvp.jobportal.subscription.dto.plan.PlanResponse;
import com.mvp.jobportal.subscription.entity.Plan;
import com.mvp.jobportal.subscription.entity.PlanFeature;
import com.mvp.jobportal.subscription.entity.PlanPricing;

@Component
public class PlanMapper {

    public Plan toEntity(PlanRequest request) {
        Plan plan = Plan.builder()
                .name(request.name())
                .code(request.code())
                .description(request.description())
                .highlighted(request.highlighted())
                .badge(request.badge())
                .cta(request.cta())
                .status(request.status())
                .role(request.role())
                .features(new ArrayList<>())
                .pricingOptions(new ArrayList<>())
                .build();

        request.features().forEach(feature -> {
            PlanFeature planFeature = PlanFeature.builder()
                    .featureName(feature.featureName())
                    .displayOrder(feature.displayOrder())
                    .active(true)
                    .plan(plan)
                    .build();

            plan.getFeatures().add(planFeature);
        });

        request.pricingOptions().forEach(pricing -> {
            PlanPricing planPricing = PlanPricing.builder()
                    .price(pricing.price())
                    .currency(pricing.currency().toUpperCase())
                    .validityDays(pricing.validityDays())
                    .billingCycle(pricing.billingCycle())
                    .active(true)
                    .plan(plan)
                    .build();
            plan.getPricingOptions().add(planPricing);
        });

        return plan;
    }

    public void updateEntity(Plan plan, PlanRequest request) {
        plan.setName(request.name());
        plan.setCode(request.code());
        plan.setDescription(request.description());
        plan.setHighlighted(request.highlighted());
        plan.setBadge(request.badge());
        plan.setCta(request.cta());
        plan.setStatus(request.status());
        plan.setRole(request.role());

        plan.getFeatures().clear();
        request.features().forEach(feature -> {
            PlanFeature planFeature = PlanFeature.builder()
                    .featureName(feature.featureName())
                    .displayOrder(feature.displayOrder())
                    .active(true)
                    .plan(plan)
                    .build();
            plan.getFeatures().add(planFeature);
        });

        plan.getPricingOptions().forEach(pricing -> pricing.setActive(false));
        request.pricingOptions().forEach(requested -> {
            PlanPricing existing = plan.getPricingOptions()
                    .stream()
                    .filter(pricing -> pricing.getPrice().compareTo(requested.price()) == 0
                            && pricing.getCurrency().equalsIgnoreCase(requested.currency())
                            && java.util.Objects.equals(pricing.getValidityDays(), requested.validityDays())
                            && pricing.getBillingCycle() == requested.billingCycle())
                    .findFirst()
                    .orElse(null);

            if (existing != null) {
                existing.setActive(true);
            } else {
                PlanPricing newPricing = PlanPricing.builder()
                        .plan(plan)
                        .price(requested.price())
                        .currency(requested.currency().toUpperCase())
                        .validityDays(requested.validityDays())
                        .billingCycle(requested.billingCycle())
                        .active(true)
                        .build();
                plan.getPricingOptions().add(newPricing);
            }
        });
    }

    public PlanResponse toResponse(Plan plan) {

        return PlanResponse.builder()
                .id(plan.getId())
                .name(plan.getName())
                .code(plan.getCode())
                .description(plan.getDescription())
                .highlighted(plan.isHighlighted())
                .badge(plan.getBadge())
                .cta(plan.getCta())
                .role(plan.getRole())
                .status(plan.getStatus())
                .features(toFeatureResponses(plan.getFeatures()))
                .pricingOptions(toPricingResponses(plan.getPricingOptions()))
                .createdAt(plan.getCreatedAt())
                .updatedAt(plan.getUpdatedAt())
                .build();
    }

    private List<PlanResponse.FeatureResponse> toFeatureResponses(List<PlanFeature> features) {
        return features.stream()
                .filter(PlanFeature::isActive)
                .map(feature -> PlanResponse.FeatureResponse.builder()
                        .id(feature.getId())
                        .featureName(feature.getFeatureName())
                        .displayOrder(feature.getDisplayOrder())
                        .build())
                .toList();
    }

    private List<PlanResponse.PricingResponse> toPricingResponses(List<PlanPricing> pricingOptions) {
        return pricingOptions.stream()
                .filter(PlanPricing::isActive)
                .map(pricing -> PlanResponse.PricingResponse.builder()
                        .id(pricing.getId())
                        .price(pricing.getPrice())
                        .currency(pricing.getCurrency())
                        .validityDays(pricing.getValidityDays())
                        .billingCycle(pricing.getBillingCycle())
                        .build())
                .toList();
    }
}
