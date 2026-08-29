package com.mvp.jobportal.skill.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mvp.jobportal.skill.entity.Skill;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByName(String name);
}