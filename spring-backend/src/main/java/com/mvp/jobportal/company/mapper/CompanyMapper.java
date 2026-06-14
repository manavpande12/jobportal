package com.mvp.jobportal.company.mapper;

import org.springframework.stereotype.Component;

import com.mvp.jobportal.common.util.PatchUtils;
import com.mvp.jobportal.company.dto.CompanyResponse;
import com.mvp.jobportal.company.dto.CreateCompanyRequest;
import com.mvp.jobportal.company.dto.UpdateCompanyRequest;
import com.mvp.jobportal.company.entity.Company;
import com.mvp.jobportal.user.entity.User;

@Component
public class CompanyMapper {

    public CompanyResponse toResponse(Company company) {
        if (company == null) {
            return null;
        }
        return CompanyResponse.builder()
                .id(company.getId())
                .name(company.getName())
                .slug(company.getSlug())
                .domain(company.getDomain())
                .headline(company.getHeadline())
                .industry(company.getIndustry())
                .companySize(company.getCompanySize())
                .foundedYear(company.getFoundedYear())
                .createdAt(company.getCreatedAt())
                .updatedAt(company.getUpdatedAt())
                .build();
    }

    public Company toEntity(CreateCompanyRequest request, User createdBy, String slug) {
        return Company.builder()
                .name(request.name())
                .createdBy(createdBy)
                .slug(slug)
                .domain(request.domain())
                .headline(request.headline())
                .industry(request.industry())
                .companySize(request.companySize())
                .foundedYear(request.foundedYear())
                .build();
    }

    public void patchEntity(Company company, UpdateCompanyRequest request) {
        PatchUtils.setIfNotNull(company::setName, request.name());
        PatchUtils.setIfNotNull(company::setHeadline, request.headline());
        PatchUtils.setIfNotNull(company::setIndustry, request.industry());
        PatchUtils.setIfNotNull(company::setDomain, request.domain());
        PatchUtils.setIfNotNull(company::setCompanySize, request.companySize());
        PatchUtils.setIfNotNull(company::setFoundedYear, request.foundedYear());
    }

}
