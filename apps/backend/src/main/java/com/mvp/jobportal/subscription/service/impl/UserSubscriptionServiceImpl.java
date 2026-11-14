
package com.mvp.jobportal.subscription.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mvp.jobportal.common.exception.BadRequestException;
import com.mvp.jobportal.common.exception.ConflictException;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.subscription.dto.subscription.SubscriptionRequest;
import com.mvp.jobportal.subscription.dto.subscription.SubscriptionResponse;
import com.mvp.jobportal.subscription.entity.PlanPricing;
import com.mvp.jobportal.subscription.entity.UserSubscription;
import com.mvp.jobportal.subscription.enums.PlanStatus;
import com.mvp.jobportal.subscription.enums.SubscriptionStatus;
import com.mvp.jobportal.subscription.mapper.UserSubscriptionMapper;
import com.mvp.jobportal.subscription.repository.PlanPricingRepository;
import com.mvp.jobportal.subscription.repository.UserSubscriptionRepository;
import com.mvp.jobportal.subscription.service.UserSubscriptionService;
import com.mvp.jobportal.user.entity.User;
import com.mvp.jobportal.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserSubscriptionServiceImpl implements UserSubscriptionService {

    private final UserSubscriptionRepository userSubscriptionRepository;
    private final PlanPricingRepository planPricingRepository;
    private final UserRepository userRepository;
    private final UserSubscriptionMapper userSubscriptionMapper;

    @Override
    @Transactional
    public void createSubscription(UUID userId, SubscriptionRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        boolean hasExistingSubscription = userSubscriptionRepository.existsByUser_IdAndStatusIn(userId,
                List.of(SubscriptionStatus.PENDING, SubscriptionStatus.ACTIVE));

        if (hasExistingSubscription) {
            throw new ConflictException("You already have a pending or active subscription.");
        }

        PlanPricing pricing = planPricingRepository.findById(request.pricingId())
                .orElseThrow(() -> new ResourceNotFoundException("Pricing option not found."));

        if (!pricing.isActive()) {
            throw new BadRequestException("Selected pricing option is inactive.");
        }
        if (pricing.getPlan().getStatus() != PlanStatus.ACTIVE) {
            throw new BadRequestException("Selected plan is inactive.");
        }
        UserSubscription subscription = UserSubscription.builder()
                .user(user)
                .plan(pricing.getPlan())
                .pricing(pricing)
                .amountPaid(pricing.getPrice())
                .currency(pricing.getCurrency())
                .status(SubscriptionStatus.PENDING)
                .autoRenew(request.autoRenew())
                .build();

        userSubscriptionRepository.save(subscription);
    }

    @Override
    public List<SubscriptionResponse> getMySubscriptions(UUID userId) {
        return userSubscriptionRepository
                .findByUser_IdOrderByCreatedAtDesc(userId)
                .stream()
                .map(userSubscriptionMapper::toResponse)
                .toList();
    }
}
