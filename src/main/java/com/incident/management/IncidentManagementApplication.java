package com.incident.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.incident.management"})
public class IncidentManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(IncidentManagementApplication.class, args);
    }
}  