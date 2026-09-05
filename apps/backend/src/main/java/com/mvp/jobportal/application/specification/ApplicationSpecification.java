package com.mvp.jobportal.application.specification;

import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;

import com.mvp.jobportal.application.entity.Application;
import com.mvp.jobportal.application.enums.ApplicationStatus;

public final class ApplicationSpecification {

    private ApplicationSpecification() {
    }

    public static Specification<Application> byUser(UUID userId) {
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Application> status(ApplicationStatus status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Application> search(String search) {
        return (root, query, cb) -> {
            String value = "%" + search.trim().toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(root.get("jobPost").get("title")), value),
                    cb.like(cb.lower(root.get("jobPost").get("company").get("name")), value));
        };
    }

    public static Specification<Application> activeRelations() {
        return (root, query, cb) -> cb.and(
                cb.isFalse(root.get("user").get("deleted")),
                cb.isFalse(root.get("jobPost").get("deleted")));
    }
}