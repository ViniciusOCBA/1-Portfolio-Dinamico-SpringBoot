package com.viniciusoliveira.portfolio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.viniciusoliveira.portfolio.service.JpaUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JpaUserDetailsService jpaUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                // Permite o acesso público à página de login e a todos os recursos públicos
                .requestMatchers("/login", "/", "/index.html", "/css/**", "/js/**", "/img/**", "/api/**").permitAll()
                // Requer autenticação para as páginas de administração
                .requestMatchers("/admin.html", "/admin/**").authenticated()
                // Protege qualquer outra rota que não tenha sido mencionada
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                // Após o login, sempre redireciona para o painel de admin
                .defaultSuccessUrl("/admin.html", true)
            )
            .logout(logout -> logout
                // --- LINHA CORRIGIDA ---
                // Após o logout, redireciona para a página de login
                .logoutSuccessUrl("/login?logout")
            );

        http.csrf(csrf -> csrf.disable());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}