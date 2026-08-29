package com.mvp.jobportal.skill.initializer;

import com.mvp.jobportal.skill.entity.Skill;
import com.mvp.jobportal.skill.repository.SkillRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SkillDataInitializer implements CommandLineRunner {

        private final SkillRepository skillRepository;

        @Override
        public void run(String... args) {

                List<String> skills = List.of(
                                "Java",
                                "Spring Boot",
                                "React",
                                "Next.js",
                                "TypeScript",
                                "JavaScript",
                                "MySQL",
                                "PostgreSQL",
                                "MongoDB",
                                "Docker",
                                "Kubernetes",
                                "Redis",
                                "AWS",
                                "Git",
                                "HTML",
                                "CSS",
                                "Tailwind CSS",
                                "Node.js",
                                "Express.js",
                                "Python",
                                "AI/ML",
                                "DSA");

                Set<String> existingSkills = skillRepository.findAll()
                                .stream()
                                .map(Skill::getName)
                                .collect(Collectors.toSet());

                List<Skill> newSkills = skills.stream()
                                .filter(skill -> !existingSkills.contains(skill))
                                .map(skill -> Skill.builder()
                                                .name(skill)
                                                .build())
                                .toList();

                if (!newSkills.isEmpty()) {
                        skillRepository.saveAll(newSkills);
                        System.out.println("New skills initialized.");
                }
        }
}