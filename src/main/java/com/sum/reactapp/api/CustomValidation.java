package com.sum.reactapp.api;

import java.lang.annotation.*;

@Repeatable(CustomValidations.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface CustomValidation {
    String type();
    String[] params();
}
