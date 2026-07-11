package com.mvp.jobportal.jobs.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.mvp.jobportal.jobpost.entity.JobPost;
import com.mvp.jobportal.jobpost.enums.JobPostStatus;
import com.mvp.jobportal.skill.entity.Skill;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class JobsSpecification {

    public static Specification<JobPost> search(String title, List<Long> skillIds) {
        return (root, query, cb) -> {
            query.distinct(true);
            Join<JobPost, Skill> skillJoin = root.join("skills", JoinType.LEFT);
            var predicate = cb.conjunction();
            predicate = cb.and(predicate, cb.equal(root.get("status"), JobPostStatus.ACTIVE));
            predicate = cb.and(predicate, cb.isFalse(root.get("createdBy").get("deleted")));

            if (title != null && !title.isBlank()) {
                String pattern = "%" + title.toLowerCase() + "%";
                predicate = cb.and(predicate,
                        cb.or(
                                cb.like(cb.lower(root.get("title")), pattern),
                                cb.like(cb.lower(skillJoin.get("name")), pattern)));
            }

            if (skillIds != null && !skillIds.isEmpty()) {
                predicate = cb.and(predicate,
                        skillJoin.get("id").in(skillIds));
            }

            return predicate;
        };
    }

    private JobsSpecification() {
    }
}