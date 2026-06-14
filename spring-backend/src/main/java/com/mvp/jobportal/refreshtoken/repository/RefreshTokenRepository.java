package com.mvp.jobportal.refreshtoken.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mvp.jobportal.refreshtoken.entity.RefreshToken;
import com.mvp.jobportal.user.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    @Query("""
            SELECT rt
            FROM RefreshToken rt
            JOIN FETCH rt.user
            WHERE rt.token = :token
            """)
    Optional<RefreshToken> findByTokenWithUser(String token);

    void deleteByUser(User user);

    List<RefreshToken> findAllByUserIdAndRevokedFalse(UUID userId);

    List<RefreshToken> findAllBySessionIdAndRevokedFalse(String sessionId);
}
