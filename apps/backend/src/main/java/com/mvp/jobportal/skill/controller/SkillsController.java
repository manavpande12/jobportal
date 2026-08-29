package com.mvp.jobportal.skill.controller;

import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.skill.dto.SkillResponse;
import com.mvp.jobportal.skill.service.SkillService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@Tag(name = "Skills")
public class SkillsController {

    private final SkillService skillsService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillResponse>>> getSkills() {
        List<SkillResponse> skills = skillsService.getSkills();
        return ResponseEntity.ok(ApiResponse.success("Skills fetched successfully", skills));
    }
}