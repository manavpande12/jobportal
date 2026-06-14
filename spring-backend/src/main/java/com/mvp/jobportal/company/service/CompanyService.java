package com.mvp.jobportal.company.service;

import java.util.UUID;

import com.mvp.jobportal.company.dto.CreateCompanyRequest;
import com.mvp.jobportal.company.dto.UpdateCompanyRequest;
import com.mvp.jobportal.company.dto.CompanyResponse;

public interface CompanyService {

    CompanyResponse getCompanyByUserId(UUID userId);

    void updateCompany(UUID creatorId, UpdateCompanyRequest request);

    void createCompany(UUID userId, CreateCompanyRequest request);
}
