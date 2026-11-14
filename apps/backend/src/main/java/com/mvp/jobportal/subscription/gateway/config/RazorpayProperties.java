package com.mvp.jobportal.subscription.gateway.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "razorpay")
public record RazorpayProperties(String keyId, String keySecret) {
}