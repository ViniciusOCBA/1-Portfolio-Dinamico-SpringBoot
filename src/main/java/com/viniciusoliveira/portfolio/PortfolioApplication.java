package com.viniciusoliveira.portfolio;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.viniciusoliveira.portfolio.model.User;
import com.viniciusoliveira.portfolio.repository.UserRepository;

@SpringBootApplication
public class PortfolioApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortfolioApplication.class, args);
	}

	// Cria o usuário admin na inicialização, se ele não existir.
	@Bean
	CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			userRepository.findByUsername("admin").orElseGet(() -> {
				User adminUser = new User("admin", passwordEncoder.encode("password"));
				return userRepository.save(adminUser);
			});
		};
	}
}