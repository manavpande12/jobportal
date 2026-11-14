
package com.mvp.jobportal.subscription.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mvp.jobportal.subscription.entity.UserSubscription;
import com.mvp.jobportal.subscription.enums.SubscriptionStatus;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, UUID> {

        List<UserSubscription> findByUser_IdOrderByCreatedAtDesc(UUID userId);

        boolean existsByUser_IdAndStatus(UUID userId, SubscriptionStatus status);

        Optional<UserSubscription> findByIdAndUser_Id(UUID subscriptionId, UUID userId);

        boolean existsByUser_IdAndStatusIn(UUID userId, Collection<SubscriptionStatus> statuses);

        @Modifying(flushAutomatically = true, clearAutomatically = true)
        @Query("""
                            UPDATE UserSubscription s
                            SET s.status = :failedStatus
                            WHERE s.pricing.id IN :pricingIds
                              AND s.status = :pendingStatus
                        """)
        int failPendingSubscriptionsByPricingIds(
                        @Param("pricingIds") List<UUID> pricingIds,
                        @Param("pendingStatus") SubscriptionStatus pendingStatus,
                        @Param("failedStatus") SubscriptionStatus failedStatus);

        @Modifying(flushAutomatically = true, clearAutomatically = true)
        @Query("""
                            UPDATE UserSubscription s
                            SET s.status = :failedStatus
                            WHERE s.plan.id = :planId
                              AND s.status = :pendingStatus
                        """)
        int failPendingSubscriptionsByPlanId(
                        @Param("planId") UUID planId,
                        @Param("pendingStatus") SubscriptionStatus pendingStatus,
                        @Param("failedStatus") SubscriptionStatus failedStatus);
}
