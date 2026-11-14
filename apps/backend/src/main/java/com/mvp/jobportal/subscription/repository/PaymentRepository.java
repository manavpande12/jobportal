package com.mvp.jobportal.subscription.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mvp.jobportal.subscription.entity.Payment;
import com.mvp.jobportal.subscription.enums.PaymentStatus;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    Optional<Payment> findByGatewayOrderId(String gatewayOrderId);

    Optional<Payment> findByGatewayTransactionId(String gatewayTransactionId);

    boolean existsBySubscription_IdAndStatus(UUID subscriptionId, PaymentStatus status);

    List<Payment> findBySubscription_IdAndSubscription_User_IdOrderByCreatedAtDesc(
            UUID subscriptionId,
            UUID userId);

    Optional<Payment> findFirstBySubscription_IdAndStatusOrderByCreatedAtDesc(
            UUID subscriptionId,
            PaymentStatus status);
}