package com.mvp.jobportal.common.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

import com.mvp.jobportal.common.enums.ErrorCode;

@Getter
@Builder
public class ApiResponse<T> {

    private String timestamp;
    private boolean success;
    private int status;
    private String message;
    private ErrorCode errorCode;
    private T data;

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .timestamp(LocalDateTime.now().toString())
                .success(true)
                .status(200)
                .message(message)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> error(String message, int status, ErrorCode errorCode, T data) {
        return ApiResponse.<T>builder()
                .timestamp(LocalDateTime.now().toString())
                .success(false)
                .status(status)
                .message(message)
                .errorCode(errorCode)
                .data(data)
                .build();
    }
}