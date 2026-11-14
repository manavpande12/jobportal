package com.mvp.jobportal.subscription.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.mvp.jobportal.subscription.enums.SubscriptionStatus;
import com.mvp.jobportal.user.entity.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_subscriptions", indexes = {
        @Index(name = "idx_user_subscription", columnList = "user_id, status"),
        @Index(name = "idx_subscription_expiry", columnList = "end_date, status")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private Plan plan;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pricing_id", nullable = false)
    private PlanPricing pricing;

    private BigDecimal amountPaid;

    private String currency;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status;

    private boolean autoRenew;

    private LocalDateTime createdAt;
}
