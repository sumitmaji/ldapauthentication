package com.sum.reactapp.utils;

import com.sum.reactapp.api.CustomColumn;

public class CustomColumnUtils {

    public static String getHeaderName(Class clazz, String fieldName) throws NoSuchFieldException {
        return getAnnotation(clazz, fieldName).headerName();
    }

    public static String getWidth(Class clazz, String fieldName) throws NoSuchFieldException {
        return getAnnotation(clazz, fieldName).width();
    }

    public static String getType(Class clazz, String fieldName) throws NoSuchFieldException {
        return getAnnotation(clazz, fieldName).type();
    }

    public static String getLabel(Class clazz, String fieldName) throws NoSuchFieldException {
        return getAnnotation(clazz, fieldName).label();
    }

    public static String getPlaceholder(Class clazz, String fieldName) throws NoSuchFieldException {
        return getAnnotation(clazz, fieldName).placeholder();
    }

    public static String getFieldType(Class clazz, String fieldName) throws NoSuchFieldException {
        return getAnnotation(clazz, fieldName).fieldType();
    }

    public static String getValidationType(Class clazz, String fieldName) throws NoSuchFieldException {
        return getAnnotation(clazz, fieldName).validationType();
    }

    public static String getValue(Class clazz, String fieldName) throws NoSuchFieldException {
        return getAnnotation(clazz, fieldName).value();
    }

    private static CustomColumn getAnnotation(Class clazz, String fieldName) throws NoSuchFieldException {
        return (CustomColumn) clazz.getDeclaredField(fieldName).getAnnotation(CustomColumn.class);
    }
}
