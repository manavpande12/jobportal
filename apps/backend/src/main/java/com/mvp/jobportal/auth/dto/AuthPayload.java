package com.mvp.jobportal.auth.dto;

public record AuthPayload(
                String accessToken,
                String refreshToken) {
}