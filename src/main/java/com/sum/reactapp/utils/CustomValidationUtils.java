package com.sum.reactapp.utils;

import com.sum.reactapp.api.CustomValidation;
import com.sum.reactapp.api.CustomValidations;
import com.sum.reactapp.model.FormValidation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CustomValidationUtils {

    public static List<FormValidation> getFormValidations(Class clazz, String fieldName) throws NoSuchFieldException {
        List<FormValidation> list = new ArrayList<>();
        CustomValidation[] values = getValue(clazz, fieldName);
        if(values != null)
            for (CustomValidation value : values) {
                String type = value.type();
                String[] params = value.params();
                FormValidation build = FormValidation.builder().type(type).params(Arrays.asList(params)).build();
                list.add(build);
            }

        return list;
    }

    private static CustomValidation[] getValue(Class clazz, String fieldName) throws NoSuchFieldException {
        CustomValidations annotation = getAnnotation(clazz, fieldName);
        return annotation != null? annotation.value() : null;
    }

    private static CustomValidations getAnnotation(Class clazz, String fieldName) throws NoSuchFieldException {
        return (CustomValidations) clazz.getDeclaredField(fieldName).getAnnotation(CustomValidations.class);
    }

}
