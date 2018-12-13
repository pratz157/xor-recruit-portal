package com.hackathon.recruitmentassistant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing
public class RecruitmentassistantApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecruitmentassistantApplication.class, args);
	}
}
