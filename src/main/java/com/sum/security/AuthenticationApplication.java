package com.sum.security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthenticationApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthenticationApplication.class, args);
	}

	/**
	 * This creates a webclient bean which is configured to call a resource api
	 * with access token
	 * @param clientRegistrationRepository
	 * @param oAuth2AuthorizedClientRepository
	 * @return
	 */

}
