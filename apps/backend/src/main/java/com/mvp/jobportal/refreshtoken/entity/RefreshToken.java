package com.mvp.jobportal.refreshtoken.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.mvp.jobportal.refreshtoken.enums.DeviceType;
import com.mvp.jobportal.user.entity.User;

@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private LocalDateTime expiryDate;

    private boolean revoked;

    private String browser;

    private String operatingSystem;

    private String deviceName;

    @Enumerated(EnumType.STRING)
    private DeviceType deviceType;

    private String ipAddress;

    @Column(length = 1000)
    private String userAgent;

    private String sessionId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime lastUsedAt;

}
