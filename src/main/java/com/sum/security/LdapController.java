package com.sum.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

@RestController
public class LdapController {

    /**
     * This api is used by kubernetes for health check monitoring.
     * @return
     */
    @GetMapping("/healthz")
    public String healthz(){
        return "OK";
    }

    /**
     * A sample api that send response of the header information it has received.
     * @param request
     * @param response
     */
    @GetMapping(value = "/echo")
    public void echo(HttpServletRequest request, HttpServletResponse response) {
        Enumeration<String> headerNames = request.getHeaderNames();
        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                response.setHeader(String.format("x-echo-%s", headerName.toLowerCase()), request.getHeader(headerName));
            }
        }
    }

    /**
     * The api check if the user is authenticated or not,
     * If Authenticated, then it sends Response Code 200 (OK)
     * If Not Authenticated, then it sends Response Code 401 (UnAuthorized)
     * This api is used by the ingress controller when a user tries to access
     * a protected url. If the api returns 200 then the protected url is accessed
     * otherwise user it redirected to /authenticate api which presents user with login
     * page.
     * @param authenticationTemp
     * @return
     */
    @GetMapping(value="/check")
    public ResponseEntity<String> authorize(Authentication authenticationTemp){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication instanceof AnonymousAuthenticationToken){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Unauthorized");
        }else if(authentication instanceof UsernamePasswordAuthenticationToken && authentication.isAuthenticated()){
            return ResponseEntity.status(HttpStatus.OK).body("OK authenticated");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Unauthorized");
        }
    }
}
