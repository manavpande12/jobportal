package com.mvp.jobportal.common.dto;

public record CookieOptions(
        String name,
        String value,
        long maxAgeSeconds,
        boolean httpOnly,
        boolean secure,
        String sameSite) {
    public static CookieOptions accessToken(String token, int minutes) {
        return new CookieOptions(
                "accessToken",
                token,
                minutes * 60,
                true,
                false,
                "Lax");
    }

    public static CookieOptions refreshToken(String token, int days) {
        return new CookieOptions(
                "refreshToken",
                token,
                days * 24 * 60 * 60,
                true,
                false,
                "Lax");
    }
}