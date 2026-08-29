package com.mvp.jobportal.application.dto;

import com.mvp.jobportal.application.enums.ApplicationStatus;

public record UpdateApplicationStatusRequest(
        ApplicationStatus status) {
}