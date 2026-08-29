package com.mvp.jobportal.company.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.mvp.jobportal.company.dto.CreateCompanyRequest;
import com.mvp.jobportal.company.dto.UpdateCompanyRequest;
import com.mvp.jobportal.company.dto.CompanyResponse;
import com.mvp.jobportal.company.entity.Company;
import com.mvp.jobportal.company.mapper.CompanyMapper;
import com.mvp.jobportal.company.repository.CompanyRepository;
import com.mvp.jobportal.company.service.CompanyService;
import com.mvp.jobportal.company.utils.SlugUtils;
import com.mvp.jobportal.recruiter.entity.RecruiterProfile;
import com.mvp.jobportal.recruiter.repository.RecruiterProfileRepository;
import com.mvp.jobportal.common.enums.ErrorCode;
import com.mvp.jobportal.common.exception.BadRequestException;
import com.mvp.jobportal.common.exception.ConflictException;
import com.mvp.jobportal.common.exception.ResourceNotFoundException;
import com.mvp.jobportal.common.exception.UnauthorizedException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final CompanyMapper companyMapper;

    @Transactional
    @Override
    public void updateCompany(UUID creatorId, UpdateCompanyRequest request) {
        Company company = companyRepository.findByCreatedBy_IdAndDeletedFalse(creatorId)
                .orElseThrow(() -> new UnauthorizedException("You are not authorized to update company data.",
                        ErrorCode.ACCESS_DENIED));

        companyMapper.patchEntity(company, request);
        companyRepository.save(company);
    }

    @Override
    public CompanyResponse getCompanyByUserId(UUID userId) {
        RecruiterProfile recruiterProfile = recruiterProfileRepository
                .findActiveUserById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found."));

        Company company = recruiterProfile.getCompany();
        return companyMapper.toResponse(company);
    }

    @Override
    @Transactional
    public void createCompany(UUID userId, CreateCompanyRequest request) {
        RecruiterProfile recruiterProfile = recruiterProfileRepository.findActiveUserById(userId).orElseThrow(
                () -> new ResourceNotFoundException("Profile Not Found."));

        if (recruiterProfile.getCompany() != null) {
            throw new BadRequestException("Recruiter already has a company.");
        }

        String slug = SlugUtils.generateSlug(request.name());
        if (companyRepository.existsBySlug(slug)) {
            throw new ConflictException("Company with this name already exists.");
        }

        Company company = companyMapper.toEntity(request, recruiterProfile.getUser(), slug);
        recruiterProfile.setCompany(company);
        companyRepository.save(company);

    }

}