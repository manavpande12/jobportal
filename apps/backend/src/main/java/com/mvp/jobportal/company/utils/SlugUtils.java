package com.mvp.jobportal.company.utils;

public class SlugUtils {
    public static String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9]", "-")
                .replaceAll("-+", "-");
    }
}
