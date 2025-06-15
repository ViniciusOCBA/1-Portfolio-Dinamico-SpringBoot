// src/main/java/com/viniciusoliveira/portfolio/repository/ExperienceRepository.java
package com.viniciusoliveira.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.viniciusoliveira.portfolio.model.Experience;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    
}