package com.mvp.jobportal.common.exception;

import org.springframework.http.HttpStatus;

import com.mvp.jobportal.common.enums.ErrorCode;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException {

    private final HttpStatus status;
    private final ErrorCode errorCode;

    public AppException(String message, HttpStatus status, ErrorCode errorCode) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
    }
}
