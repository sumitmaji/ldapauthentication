package com.sum.reactapp.utils;

import com.sum.reactapp.api.CustomTable;

public class CustomTableUtils {

    public static String getName(Class clazz) {
        return getAnnotation(clazz).name();
    }

    private static CustomTable getAnnotation(Class clazz) {
        return (CustomTable) clazz.getAnnotation(CustomTable.class);
    }
}
