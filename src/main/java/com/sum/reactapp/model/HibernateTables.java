package com.sum.reactapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Map;

@Builder
@ToString
@Data
@AllArgsConstructor
public class HibernateTables implements Serializable {
    private String name;
    private Map<String, String> columns;
}
