package com.sum.reactapp.api;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface CustomColumn {
    String headerName();
    String width() default "200";
    String type();
    String label();
    String placeholder();
    String fieldType();
    String validationType();
    String value();
}
