// src/main/java/com/viniciusoliveira/portfolio/repository/ProjectRepository.java
package com.viniciusoliveira.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.viniciusoliveira.portfolio.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
   
}