package com.mvp.jobportal.company.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.mvp.jobportal.user.entity.User;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "companies", indexes = {
                @Index(name = "idx_company_name", columnList = "name"),
                @Index(name = "idx_company_slug", columnList = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "created_by", nullable = false)
        private User createdBy;

        @Column(nullable = false, unique = true, length = 60)
        private String name;

        @Column(nullable = false, unique = true)
        private String slug; // For SEO URLs: /companies/tcs

        @Column(length = 100)
        private String headline;

        @Column(length = 25)
        private String industry;

        @Column(length = 255)
        private String domain;

        private Integer companySize;

        private Integer foundedYear;

        @CreationTimestamp
        private LocalDateTime createdAt;

        @UpdateTimestamp
        private LocalDateTime updatedAt;

        @Builder.Default
        @Column(nullable = false)
        private boolean deleted = false;
}