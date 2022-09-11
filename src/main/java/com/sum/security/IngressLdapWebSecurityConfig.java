package com.sum.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.ldap.core.support.BaseLdapPathContextSource;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class IngressLdapWebSecurityConfig extends WebSecurityConfigurerAdapter {


    private AuthenticationSuccessHandler getSuccessHandler() {
        return new IngressLdapSuccessHandler();
    }

    ;

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
                        "/index*", "/static/**", "/*.js", "/*.json", "/*.ico","/*.css")
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

//    @Override
//    public void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//                .ldapAuthentication()
//                .userSearchFilter("(cn={0})") // username which would be search in ldap. cn contains username
//                .contextSource(contextSource());
//    }
//
//    /**
//     * Ldap Configuration
//     * @return
//     */
//
//    @Bean
//    public BaseLdapPathContextSource contextSource() {
//        LdapContextSource bean = new LdapContextSource();
//        bean.setUrl("ldap://ldap.default.svc.cloud.uat"); // Url where ldap application is running
//        bean.setBase("dc=default,dc=svc,dc=cloud,dc=uat"); // Base DN
//        bean.setUserDn("cn=admin,dc=default,dc=svc,dc=cloud,dc=uat"); // Admin User DN
//        bean.setPassword("sumit");
//        bean.setPooled(true);
//        bean.setAnonymousReadOnly(false);
//        bean.afterPropertiesSet();
//        return bean;
//    }
//
//
//    @Bean
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }

    //Local authentication testing

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
