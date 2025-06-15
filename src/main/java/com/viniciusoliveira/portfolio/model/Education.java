// src/main/java/com/viniciusoliveira/portfolio/model/Education.java
package com.viniciusoliveira.portfolio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String degree;
    private String institution;
    private Integer completionYear;

    public Education() {
    }

    public Education(String degree, String institution, Integer completionYear) {
        this.degree = degree;
        this.institution = institution;
        this.completionYear = completionYear;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public Integer getCompletionYear() {
        return completionYear;
    }

    public void setCompletionYear(Integer completionYear) {
        this.completionYear = completionYear;
    }
}