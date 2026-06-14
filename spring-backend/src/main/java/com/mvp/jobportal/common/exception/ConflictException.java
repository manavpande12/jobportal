package com.mvp.jobportal.common.exception;

import org.springframework.http.HttpStatus;

import com.mvp.jobportal.common.enums.ErrorCode;

public class ConflictException extends AppException {

    public ConflictException(String message) {
        super(message, HttpStatus.CONFLICT, ErrorCode.RESOURCE_CONFLICT);
    }
}