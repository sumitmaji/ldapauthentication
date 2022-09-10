package com.sum.reactapp;

import com.sum.reactapp.config.MetadataExtractorIntegrator;
import lombok.extern.log4j.Log4j2;
import org.hibernate.boot.Metadata;
import org.hibernate.mapping.Column;
import org.hibernate.mapping.PersistentClass;
import org.hibernate.mapping.Property;
import org.hibernate.mapping.Table;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Iterator;

@Log4j2
@SpringBootTest
public class HibernateMetadataApplicationTests {

    @Test
    public void contextLoads() {
        Metadata metadata = MetadataExtractorIntegrator.INSTANCE.getMetadata();

        for (PersistentClass persistentClass : metadata.getEntityBindings()) {

            Table table = persistentClass.getTable();

            log.info("Entity: {} is mapped to table: {}",
                    persistentClass.getClassName(),
                    table.getName()
            );

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
                }
            }
        }
    }

}