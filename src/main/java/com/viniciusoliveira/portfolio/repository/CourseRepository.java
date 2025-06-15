// src/main/java/com/viniciusoliveira/portfolio/repository/CourseRepository.java
package com.viniciusoliveira.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.viniciusoliveira.portfolio.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
   
}