
package com.mvp.jobportal.subscription.service;

import java.util.List;
import java.util.UUID;

import com.mvp.jobportal.subscription.dto.subscription.SubscriptionRequest;
import com.mvp.jobportal.subscription.dto.subscription.SubscriptionResponse;

public interface UserSubscriptionService {

    void createSubscription(UUID userId, SubscriptionRequest request);

    List<SubscriptionResponse> getMySubscriptions(UUID userId);
}
