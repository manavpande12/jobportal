package com.mvp.jobportal.common.util;

import java.util.function.Consumer;

public class PatchUtils {
    public static <T> void setIfNotNull(Consumer<T> setter, T value) {
        if (value != null)
            setter.accept(value);
    }
}
