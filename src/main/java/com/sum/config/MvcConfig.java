package com.sum.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebMvc
@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/static/**")
                .addResourceLocations("/static/");
        registry.addResourceHandler("/*.js")
                .addResourceLocations("/static/js/");
        registry.addResourceHandler("/*.css")
                .addResourceLocations("/static/css/");
        registry.addResourceHandler("/*.json")
                .addResourceLocations("/");
        registry.addResourceHandler("/*.ico")
                .addResourceLocations("/");
        registry.addResourceHandler("/index.html")
                .addResourceLocations("/index.html");
    }
}