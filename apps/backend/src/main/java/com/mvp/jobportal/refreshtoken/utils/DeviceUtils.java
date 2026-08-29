package com.mvp.jobportal.refreshtoken.utils;

import com.mvp.jobportal.refreshtoken.dto.DeviceMetaData;
import com.mvp.jobportal.refreshtoken.enums.DeviceType;

public class DeviceUtils {

    public static DeviceMetaData extract(String ua) {

        if (ua == null) {
            return new DeviceMetaData(
                    "Unknown",
                    "Unknown",
                    "Unknown",
                    DeviceType.UNKNOWN);
        }

        String browser = "Unknown";
        String os = "Unknown";
        String deviceName = "Desktop";

        DeviceType deviceType = DeviceType.DESKTOP;

        // Browser
        if (ua.contains("Edg")) {
            browser = "Edge";
        } else if (ua.contains("Chrome")) {
            browser = "Chrome";
        } else if (ua.contains("Firefox")) {
            browser = "Firefox";
        } else if (ua.contains("Safari")) {
            browser = "Safari";
        }

        // OS
        if (ua.contains("Windows")) {
            os = "Windows";

        } else if (ua.contains("iPhone")) {
            os = "iOS";
            deviceName = "iPhone";
            deviceType = DeviceType.MOBILE;

        } else if (ua.contains("Android")) {
            os = "Android";
            deviceType = DeviceType.MOBILE;

        } else if (ua.contains("Mac OS")) {
            os = "MacOS";

        } else if (ua.contains("Linux")) {
            os = "Linux";
        }

        // Device names
        if (ua.contains("iPhone")) {
            deviceName = "iPhone";

        } else if (ua.contains("iPad")) {
            deviceName = "iPad";
            deviceType = DeviceType.TABLET;

        } else if (ua.contains("Samsung")) {
            deviceName = "Samsung";
        }

        return new DeviceMetaData(
                browser,
                os,
                deviceName,
                deviceType);
    }
}