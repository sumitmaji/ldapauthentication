package com.sum.reactapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@ToString
@SuperBuilder
public class StringColumnDef extends ColumnDef{
    private String type = "string";
}
