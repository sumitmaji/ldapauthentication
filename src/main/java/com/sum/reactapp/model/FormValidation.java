package com.sum.reactapp.model;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@ToString
@SuperBuilder
public class FormValidation {
    String type;
    List<Object> params;
}
