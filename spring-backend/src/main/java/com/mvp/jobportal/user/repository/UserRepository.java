package com.mvp.jobportal.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mvp.jobportal.user.entity.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("""
                SELECT u
                FROM User u
                WHERE u.id = :userId
                AND u.deleted = false
            """)
    Optional<User> findActiveUserById(@Param("userId") UUID id);

}
