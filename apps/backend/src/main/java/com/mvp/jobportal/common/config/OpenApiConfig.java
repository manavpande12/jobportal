package com.mvp.jobportal.common.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

        @Bean
        public OpenAPI jobPortalOpenAPI() {
                return new OpenAPI()
                                .info(new Info().title("Job Portal API").version("1.0")
                                                .description("REST APIs for Job Portal Application"))
                                .addSecurityItem(new SecurityRequirement().addList("cookieAuth"))
                                .components(new Components().addSecuritySchemes("cookieAuth", new SecurityScheme()
                                                .name("accessToken")
                                                .type(SecurityScheme.Type.APIKEY)
                                                .in(SecurityScheme.In.COOKIE)));
        }
}