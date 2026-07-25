package com.mvp.jobportal.common.config;

import com.mvp.jobportal.common.security.CustomAccessDeniedHandler;
import com.mvp.jobportal.common.security.CustomAuthenticationEntryPoint;
import com.mvp.jobportal.common.security.jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http,
                        CustomAccessDeniedHandler customAccessDeniedHandler,
                        CustomAuthenticationEntryPoint customAuthenticationEntryPoint) {

                http
                                .cors(cors -> {
                                })
                                .csrf(AbstractHttpConfigurer::disable) // Disable Cookies
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Do not
                                                                                                         // create
                                                                                                         // session and
                                                                                                         // store auth
                                                                                                         // in session
                                .formLogin(AbstractHttpConfigurer::disable) // Disable Form
                                .httpBasic(AbstractHttpConfigurer::disable) // Disable Basic
                                .exceptionHandling(ex -> ex
                                                .accessDeniedHandler(customAccessDeniedHandler)
                                                .authenticationEntryPoint(customAuthenticationEntryPoint))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(
                                                                "/api/auth/**", "/api/otp/**", "/api/jobs/**",
                                                                "/api/skills/**",
                                                                "/error",
                                                                "/swagger-ui/**",
                                                                "/v3/api-docs/**",
                                                                "/swagger-ui.html")
                                                .permitAll()
                                                .anyRequest().authenticated()) // Permits
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
