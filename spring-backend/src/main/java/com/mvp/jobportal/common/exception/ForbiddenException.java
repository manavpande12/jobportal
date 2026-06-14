package com.mvp.jobportal.common.exception;

import org.springframework.http.HttpStatus;

import com.mvp.jobportal.common.enums.ErrorCode;

public class ForbiddenException extends AppException {

    public ForbiddenException(String message) {
        super(message, HttpStatus.FORBIDDEN, ErrorCode.ACCESS_DENIED);
    }
}