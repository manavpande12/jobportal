package com.mvp.jobportal.common.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@Tag(name = "Testing")
public class TestController {
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/test")
    public String test() {
        return "JWT authentication working!";
    }

    @GetMapping("/api/me")
    public Collection<?> currentUser(Authentication authentication) {
        return authentication.getAuthorities();
    }
}