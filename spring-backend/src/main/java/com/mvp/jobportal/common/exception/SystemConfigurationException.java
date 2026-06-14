package com.mvp.jobportal.common.exception;

import org.springframework.http.HttpStatus;

import com.mvp.jobportal.common.enums.ErrorCode;

public class SystemConfigurationException extends AppException {

    public SystemConfigurationException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_SERVER_ERROR);
    }
}