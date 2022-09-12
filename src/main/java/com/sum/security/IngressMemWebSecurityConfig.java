package com.sum.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@Profile(value = "default")
public class IngressMemWebSecurityConfig extends WebSecurityConfigurerAdapter {


    private AuthenticationSuccessHandler getSuccessHandler() {
        return new IngressLdapSuccessHandler();
    }

    private AuthenticationFailureHandler getFailureHandler() {
        return new IngressLdapFailureHandler();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().disable()
                .requestMatchers()
                .antMatchers("/check", "/authenticate")
                .antMatchers(
                        HttpMethod.GET,
                        "/index*", "/static/**", "/*.js", "/*.json", "/*.ico", "/*.css")
                .and()
                .authorizeRequests()
                .antMatchers(
                        HttpMethod.GET,
                        "/index*", "/static/**", "/*.js", "/*.json", "/*.ico", "/*.css")
                .permitAll()
                .antMatchers("/check").permitAll() // Check if user is authenticated
                .antMatchers("/authenticate").permitAll() // Presents user with login page
                .anyRequest().authenticated()

                .and()
                .formLogin()
                .loginPage("/authenticate")
                .successHandler(getSuccessHandler())
                .failureHandler(getFailureHandler())
                .and()
                .logout()
                .logoutSuccessUrl("/index.html")
                .invalidateHttpSession(true).deleteCookies("JSESSIONID")
        ;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("sumit")
                .password(passwordEncoder().encode("sumit")).roles("USER");
    }

    @Bean
    public UserDetailsService userDetailsServiceBean() throws Exception {
        return super.userDetailsServiceBean();
    }
}
