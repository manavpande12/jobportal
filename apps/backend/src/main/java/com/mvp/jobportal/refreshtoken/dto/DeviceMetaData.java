package com.mvp.jobportal.refreshtoken.dto;

import com.mvp.jobportal.refreshtoken.enums.DeviceType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeviceMetaData {

    private String browser;

    private String operatingSystem;

    private String deviceName;

    private DeviceType deviceType;
}