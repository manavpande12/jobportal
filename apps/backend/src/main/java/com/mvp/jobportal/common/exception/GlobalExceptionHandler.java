package com.mvp.jobportal.common.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.enums.ErrorCode;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(AppException.class)
        public ResponseEntity<?> handleAppException(AppException ex) {
                return ResponseEntity
                                .status(ex.getStatus())
                                .body(ApiResponse.error(ex.getMessage(), ex.getStatus().value(), ex.getErrorCode(),
                                                null));
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException ex) {
                Map<String, String> errors = new HashMap<>();
                ex.getBindingResult().getFieldErrors().forEach(error -> errors.put(
                                error.getField(),
                                error.getDefaultMessage()));
                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(ApiResponse.error("Validation failed.", 400, ErrorCode.VALIDATION_FAILED,
                                                errors));
        }

        @ExceptionHandler(ExpiredJwtException.class)
        public ResponseEntity<?> handleExpiredJwtException(ExpiredJwtException ex) {
                return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(ApiResponse.error("Token expired.", 401, ErrorCode.ACCESS_TOKEN_EXPIRED, null));
        }

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<?> handleAccessDeniedException(
                        AccessDeniedException ex) {
                return ResponseEntity
                                .status(HttpStatus.FORBIDDEN)
                                .body(ApiResponse.error("You do not have permission to access this resource.", 403,
                                                ErrorCode.ACCESS_DENIED,
                                                null));
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<?> handleGenericException(Exception ex) {
                ex.printStackTrace();
                return ResponseEntity
                                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(ApiResponse.error("Internal server error.", 500, ErrorCode.INTERNAL_SERVER_ERROR,
                                                null));
        }
}