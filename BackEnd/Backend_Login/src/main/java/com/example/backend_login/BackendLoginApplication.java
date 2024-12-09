package com.example.backend_login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.example.backend_login.repository")
public class BackendLoginApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendLoginApplication.class, args);
    }

}
