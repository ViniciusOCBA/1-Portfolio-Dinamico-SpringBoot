// src/main/java/com/viniciusoliveira/portfolio/model/Experience.java
package com.viniciusoliveira.portfolio.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import java.util.List;

@Entity
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String jobTitle;
    private String company;
    private String duration;

    @ElementCollection
    @CollectionTable(name = "experience_description_items", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "description_item", length = 500)
    private List<String> descriptionItems;

    public Experience() {
    }

    public Experience(String jobTitle, String company, String duration, List<String> descriptionItems) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.duration = duration;
        this.descriptionItems = descriptionItems;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public List<String> getDescriptionItems() {
        return descriptionItems;
    }

    public void setDescriptionItems(List<String> descriptionItems) {
        this.descriptionItems = descriptionItems;
    }
}