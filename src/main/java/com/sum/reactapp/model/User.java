package com.sum.reactapp.model;

import com.sum.reactapp.api.CustomColumn;
import com.sum.reactapp.api.CustomTable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@CustomTable(name = "Users")
@Entity(name="users")
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Hibernate_sequence")
    @SequenceGenerator(name = "Hibernate_sequence", sequenceName = "Hibernate_sequence", allocationSize = 10)
    @Column(name = "id", nullable = false)
    @CustomColumn(headerName = "Id", type="number",
            fieldType = "text", validationType = "number",
            label="Id", placeholder = "id", value="0")
    private Long id;

    @CustomColumn(headerName = "User Name", type="string",
            fieldType = "text", validationType = "string",
            label="User Name", placeholder = "Enter User Name", value="")
    private String name;

    @CustomColumn(headerName = "User Address", type="string",
            fieldType = "text", validationType = "string",
            label="User Address", placeholder = "Enter User Address", value="")
    private String address;
}