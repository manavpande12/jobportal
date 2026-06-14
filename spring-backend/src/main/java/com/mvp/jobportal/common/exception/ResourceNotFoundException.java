package com.mvp.jobportal.common.exception;

import org.springframework.http.HttpStatus;

import com.mvp.jobportal.common.enums.ErrorCode;

public class ResourceNotFoundException extends AppException {

    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND, ErrorCode.RESOURCE_NOT_FOUND);
    }
}