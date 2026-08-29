package com.mvp.jobportal.company.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.util.SecurityUtils;
import com.mvp.jobportal.company.dto.CreateCompanyRequest;
import com.mvp.jobportal.company.dto.UpdateCompanyRequest;
import com.mvp.jobportal.company.dto.CompanyResponse;
import com.mvp.jobportal.company.service.CompanyService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@PreAuthorize("hasRole('RECRUITER')")
@RequestMapping("/api/companies")
@Tag(name = "Company")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<Void>> updateCompany(@Valid @RequestBody UpdateCompanyRequest request) {
        UUID creatorId = SecurityUtils.getAuthenticatedUserId();
        companyService.updateCompany(creatorId, request);
        return ResponseEntity.ok(ApiResponse.success("Company Updated Successfully.", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<CompanyResponse>> getCompany() {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        CompanyResponse companyResponse = companyService.getCompanyByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Company Fetched Successfully.", companyResponse));
    }

    @PostMapping("/me")
    public ResponseEntity<ApiResponse<Void>> createCompany(@Valid @RequestBody CreateCompanyRequest request) {
        UUID userId = SecurityUtils.getAuthenticatedUserId();
        companyService.createCompany(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Company Created Successfully.", null));
    }

}
