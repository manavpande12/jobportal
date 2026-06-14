package com.mvp.jobportal.common.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mvp.jobportal.common.dto.ApiResponse;
import com.mvp.jobportal.common.enums.ErrorCode;
import com.mvp.jobportal.common.security.CustomUserDetails;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();
        if (path.startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = jwtService.extractTokenFromCookies(request, "accessToken");

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            Claims claims = jwtService.extractAllClaims(token);
            String userEmail = claims.getSubject();
            String userIdStr = claims.get("userId", String.class);
            String role = claims.get("role", String.class);
            if (userIdStr == null || role == null) {
                throw new RuntimeException("Invalid token claims");
            }
            UUID userId = UUID.fromString(userIdStr);
            var context = SecurityContextHolder.getContext();

            if (userEmail != null && context.getAuthentication() == null) {
                UserDetails userDetails = new CustomUserDetails(userId, userEmail, "", role);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (io.jsonwebtoken.ExpiredJwtException e) {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");

            objectMapper.writeValue(
                    response.getWriter(),
                    ApiResponse.error("Token expired.", 401, ErrorCode.ACCESS_TOKEN_EXPIRED, null));
            return;

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            objectMapper.writeValue(
                    response.getWriter(),
                    ApiResponse.error("Invalid token.", 401, ErrorCode.USER_NOT_AUTHENTICATED, null));
            return;
        }

        filterChain.doFilter(request, response);
    }
}
