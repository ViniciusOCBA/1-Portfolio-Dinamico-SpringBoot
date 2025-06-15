// src/main/java/com/viniciusoliveira/portfolio/repository/AboutRepository.java
package com.viniciusoliveira.portfolio.repository;

import com.viniciusoliveira.portfolio.model.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutRepository extends JpaRepository<About, Long> {
    // JpaRepository já fornece métodos como save(), findById(), findAll(), delete()
    // Como esperamos apenas um registro "About", não precisamos de métodos personalizados por enquanto.
}