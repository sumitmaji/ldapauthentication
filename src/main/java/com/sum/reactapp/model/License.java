package com.sum.reactapp.model;

import com.sum.reactapp.api.CustomColumn;
import com.sum.reactapp.api.CustomTable;
import com.sum.reactapp.api.CustomValidation;
import com.sum.reactapp.api.CustomValidations;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import java.util.Arrays;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@CustomTable(name = "Licenses")
@Entity(name = "licenses")
public class License {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Hibernate_sequence")
    @SequenceGenerator(name = "Hibernate_sequence", sequenceName = "Hibernate_sequence", allocationSize = 10)
    @Column(name = "id", nullable = false)
    @CustomColumn(headerName = "Id", type="number",
            fieldType = "text", validationType = "number",
            label="Id", placeholder = "id", value="0")
    private Long id;

    @CustomColumn(headerName = "License Id", type="string",
            fieldType = "text", validationType = "string",
            label="License Id", placeholder = "Enter License Id", value="")
    private String license_id;

    @CustomColumn(headerName = "Organization Id", type="string",
            fieldType = "text", validationType = "string",
            label="Organization Id", placeholder = "Enter Organization Id", value="")
    private String organization_id;

    @CustomColumn(headerName = "License Type", type="string",
            fieldType = "text", validationType = "string",
            label="License Type", placeholder = "Enter License Type", value="")
    private String license_type;

    @CustomColumn(headerName = "Project Name", type="string",
            fieldType = "text", validationType = "string",
            label="Product Name", placeholder = "Enter Product Name", value="")
    private String product_name;

    @CustomColumn(headerName = "License Max", type="number",
            fieldType = "text", validationType = "number",
            label="License Max", placeholder = "Enter Max Licenses Available", value="0")
    @CustomValidations({
            @CustomValidation(type = "required", params = {"This field is required"})
    })
    private Integer license_max;

    @CustomColumn(headerName = "License Allocated", type="number",
            fieldType = "text", validationType = "number",
            label="License Allocated", placeholder = "Enter Allocated Licenses", value="0")
    private Integer license_allocated;

    @CustomColumn(headerName = "Comment", type="string",
            fieldType = "text", validationType = "string",
            label="Comments", placeholder = "Enter Comments", value="")
    private String comment;

}
