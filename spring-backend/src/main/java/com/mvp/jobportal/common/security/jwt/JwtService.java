package com.mvp.jobportal.common.security.jwt;

import com.mvp.jobportal.common.dto.CookieOptions;
import com.mvp.jobportal.user.entity.User;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface JwtService {
     String generateAccessToken(User user);

     String extractEmail(String token);

     boolean isTokenExpired(String token);

     boolean isTokenValid(String userEmail, String token);

     Claims extractAllClaims(String token);

     String extractTokenFromCookies(HttpServletRequest request, String name);

     void addCookie(HttpServletResponse response, CookieOptions options);

     void clearCookie(HttpServletResponse response, String name);

}
