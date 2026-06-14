package com.mvp.jobportal.common.util;

import com.mvp.jobportal.common.enums.ErrorCode;
import com.mvp.jobportal.common.exception.UnauthorizedException;
import com.mvp.jobportal.common.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

public class SecurityUtils {

    private SecurityUtils() {
    }

    public static UUID getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || authentication.getPrincipal().equals("anonymousUser")) {
            throw new UnauthorizedException("User not authenticated.", ErrorCode.USER_NOT_AUTHENTICATED);
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails.getId();
        }

        throw new UnauthorizedException("User not authenticated.", ErrorCode.USER_NOT_AUTHENTICATED);
    }
}