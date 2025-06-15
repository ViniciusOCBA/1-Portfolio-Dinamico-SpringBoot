// src/main/java/com/viniciusoliveira/portfolio/repository/SkillRepository.java
package com.viniciusoliveira.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.viniciusoliveira.portfolio.model.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
 
}