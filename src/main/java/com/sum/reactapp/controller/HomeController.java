package com.sum.reactapp.controller;

import com.sum.reactapp.config.MetadataExtractorIntegrator;
import com.sum.reactapp.model.*;
import com.sum.reactapp.utils.CustomColumnUtils;
import com.sum.reactapp.utils.CustomTableUtils;
import com.sum.reactapp.utils.CustomValidationUtils;
import lombok.extern.log4j.Log4j2;
import org.hibernate.boot.Metadata;
import org.hibernate.mapping.Column;
import org.hibernate.mapping.PersistentClass;
import org.hibernate.mapping.Property;
import org.hibernate.mapping.Table;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.validation.metadata.BeanDescriptor;
import javax.validation.metadata.ConstraintDescriptor;
import javax.validation.metadata.PropertyDescriptor;
import java.lang.annotation.Annotation;
import java.util.*;

@Log4j2
@RestController
public class HomeController {

    @PostMapping("/api/user/load")
    public ResponseEntity<HibernateTables> getData(){
        log.info("this is test logging");
        HibernateTables licenses = HibernateTables.builder().name("licenses").build();
        return ResponseEntity.ok(licenses);
    }

    @GetMapping("/api/table/load")
    public ResponseEntity<List<HibernateTables>> getSchema(){
        Metadata metadata = MetadataExtractorIntegrator.INSTANCE.getMetadata();

        List<HibernateTables> tables = new ArrayList<>();
        for (PersistentClass persistentClass : metadata.getEntityBindings()) {


            Table table = persistentClass.getTable();

            log.info("Entity: {} is mapped to table: {}",
                    persistentClass.getClassName(),
                    table.getName()
            );

            HibernateTables.HibernateTablesBuilder builder = HibernateTables.builder().name(table.getName());
            Map<String, String> map = new HashMap<>();
            for (Iterator propertyIterator = persistentClass.getPropertyIterator();
                 propertyIterator.hasNext(); ) {
                Property property = (Property) propertyIterator.next();

                for (Iterator columnIterator = property.getColumnIterator();
                     columnIterator.hasNext(); ) {
                    Column column = (Column) columnIterator.next();

                    log.info("Property: {} is mapped on table column: {} of type: {}",
                            property.getName(),
                            column.getName(),
                            column.getSqlType()
                    );

                    map.put(column.getName(), column.getSqlType());
                }
            }

            HibernateTables hibernateTables = builder.columns(map).build();
            tables.add(hibernateTables);
        }

        return ResponseEntity.ok(tables);
    }

    @GetMapping("/api/table/def")
    public ResponseEntity<TableDef> getTableDef() throws ClassNotFoundException, NoSuchFieldException {
        Metadata metadata = MetadataExtractorIntegrator.INSTANCE.getMetadata();

        TableDef tableDef = TableDef.builder().build();

        for (PersistentClass persistentClass : metadata.getEntityBindings()) {


            Table table = persistentClass.getTable();

            log.info("Entity: {} is mapped to table: {}",
                    persistentClass.getClassName(),
                    table.getName()
            );

            String description = CustomTableUtils.getName(Class.forName(persistentClass.getClassName()));

            ArrayList<ColumnDef> cols = new ArrayList<>();

            ColumnDef idDef = NumberColumnDef.builder().headerName("Id")
                    .type("number")
                    .width(Integer.parseInt("100"))
                    .field("id")
                    .label("Id")
                    .placeholder("Id")
                    .fieldType("text")
                    .validationType("number")
                    .validations(new ArrayList<>())
                    .value("0")
                    .build();
            cols.add(idDef);

            for (Iterator propertyIterator = persistentClass.getPropertyIterator();
                 propertyIterator.hasNext(); ) {
                Property property = (Property) propertyIterator.next();

                for (Iterator columnIterator = property.getColumnIterator();
                     columnIterator.hasNext(); ) {
                    Column column = (Column) columnIterator.next();

                    log.info("Property: {} is mapped on table column: {} of type: {}",
                            property.getName(),
                            column.getName(),
                            column.getSqlType()
                    );

                    String type = CustomColumnUtils.getType(Class.forName(persistentClass.getClassName()), property.getName());
                    String headerName = CustomColumnUtils.getHeaderName(Class.forName(persistentClass.getClassName()), property.getName());
                    String width = CustomColumnUtils.getWidth(Class.forName(persistentClass.getClassName()), property.getName());
                    String label = CustomColumnUtils.getLabel(Class.forName(persistentClass.getClassName()), property.getName());
                    String placeholder = CustomColumnUtils.getPlaceholder(Class.forName(persistentClass.getClassName()), property.getName());
                    String fieldType = CustomColumnUtils.getFieldType(Class.forName(persistentClass.getClassName()), property.getName());
                    String validationType = CustomColumnUtils.getValidationType(Class.forName(persistentClass.getClassName()), property.getName());
                    String value = CustomColumnUtils.getValue(Class.forName(persistentClass.getClassName()), property.getName());

                    List<FormValidation> formValidations = CustomValidationUtils.getFormValidations(Class.forName(persistentClass.getClassName()), property.getName());

                    ColumnDef columnDef = null;
                    if(column.getSqlType().contains("varchar")){
                        columnDef = StringColumnDef.builder()
                                .headerName(headerName)
                                .type(type)
                                .width(Integer.parseInt(width))
                                .field(property.getName())
                                .label(label)
                                .placeholder(placeholder)
                                .fieldType(fieldType)
                                .validationType(validationType)
                                .value(value)
                                .validations(formValidations)
                                .build();
                    } else if(column.getSqlType().contains("integer")){
                        columnDef = NumberColumnDef.builder().headerName(headerName)
                                .type(type)
                                .width(Integer.parseInt(width))
                                .field(property.getName())
                                .label(label)
                                .placeholder(placeholder)
                                .fieldType(fieldType)
                                .validationType(validationType)
                                .value(value)
                                .validations(formValidations)
                                .build();
                    }

                    cols.add(columnDef);
                }

                tableDef.put(table.getName(), cols);
            }
        }

        return ResponseEntity.ok(tableDef);
    }


}
