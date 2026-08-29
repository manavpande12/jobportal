package com.mvp.jobportal.common.enums;

public enum ErrorCode {
    // Authentication
    USER_NOT_AUTHENTICATED,
    INVALID_CREDENTIALS,

    // Token
    ACCESS_TOKEN_EXPIRED,
    REFRESH_TOKEN_EXPIRED,

    // Authorization
    ACCESS_DENIED,

    // Generic
    VALIDATION_FAILED,
    INTERNAL_SERVER_ERROR,
    RESOURCE_NOT_FOUND,
    RESOURCE_CONFLICT

}
