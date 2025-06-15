// src/main/java/com/viniciusoliveira/portfolio/repository/EducationRepository.java
package com.viniciusoliveira.portfolio.repository;

import com.viniciusoliveira.portfolio.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    // Método personalizado para ordenar por ano de conclusão de forma descendente
    List<Education> findAllByOrderByCompletionYearDesc();
}