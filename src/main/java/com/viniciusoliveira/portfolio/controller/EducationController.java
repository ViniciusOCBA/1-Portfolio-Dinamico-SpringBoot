package com.viniciusoliveira.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity; // Importe a classe Sort
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viniciusoliveira.portfolio.model.Education;
import com.viniciusoliveira.portfolio.repository.EducationRepository;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    @Autowired
    private EducationRepository educationRepository;

    // --- MÉTODO GETALL ATUALIZADO ---
    @GetMapping
    public List<Education> getAllEducation() {
        // Agora ordena por "completionYear" em ordem Ascendente (ASC)
        return educationRepository.findAll(Sort.by(Sort.Direction.ASC, "completionYear"));
    }
    // --------------------------------

    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id) {
        return educationRepository.findById(id)
                .map(education -> ResponseEntity.ok().body(education))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Education createEducation(@RequestBody Education education) {
        return educationRepository.save(education);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education educationDetails) {
        return educationRepository.findById(id)
                .map(education -> {
                    education.setDegree(educationDetails.getDegree());
                    education.setInstitution(educationDetails.getInstitution());
                    education.setCompletionYear(educationDetails.getCompletionYear());
                    Education updatedEducation = educationRepository.save(education);
                    return ResponseEntity.ok().body(updatedEducation);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
        return educationRepository.findById(id)
                .map(education -> {
                    educationRepository.delete(education);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}