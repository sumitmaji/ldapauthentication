package com.sum.reactapp;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import com.sum.reactapp.config.HibernateConfig;
import com.sum.reactapp.controller.HomeController;
import com.sum.reactapp.model.HibernateTables;
import lombok.extern.log4j.Log4j2;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Log4j2
@SpringBootTest
class HomeControllerTest {

    @InjectMocks
    HomeController controller;

    MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void testHibernateTables() throws Exception {

        mockMvc.perform(get("/api/table/load"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()", is(2)))
                .andExpect(jsonPath("$.[0].name", is("users")))
                .andReturn();


    }

    @Test
    void testTableDef() throws Exception {

        MvcResult mvcResult = mockMvc.perform(get("/api/table/def"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()", is(2)))
//                .andExpect(jsonPath("$.[0].name", is("licenses")))
                .andReturn();

        log.info(mvcResult.getResponse().getContentAsString());

    }

}