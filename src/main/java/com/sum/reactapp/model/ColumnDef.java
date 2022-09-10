package com.sum.reactapp.model;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@ToString
@SuperBuilder
public abstract class ColumnDef {
    protected String field;
    protected String headerName;
    protected Integer width;
    protected String label;
    protected String placeholder;
    protected String fieldType;
    protected String value;
    protected String validationType;
    protected List<FormValidation> validations;
}
