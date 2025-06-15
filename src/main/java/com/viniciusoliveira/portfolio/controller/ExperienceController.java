package com.viniciusoliveira.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viniciusoliveira.portfolio.model.Experience;
import com.viniciusoliveira.portfolio.repository.ExperienceRepository;

@RestController
@RequestMapping("/api/experience")
public class ExperienceController {

    @Autowired
    private ExperienceRepository experienceRepository;

    // GET - Busca todas as experiências (já existente)
    @GetMapping
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    // --- NOVO MÉTODO ADICIONADO PARA CORRIGIR O BUG ---
    // GET /api/experience/{id} - Busca uma experiência por ID
    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable Long id) {
        return experienceRepository.findById(id)
                .map(experience -> ResponseEntity.ok().body(experience))
                .orElse(ResponseEntity.notFound().build());
    }
    // ---------------------------------------------------

    // POST - Cria uma nova experiência (já existente)
    @PostMapping
    public Experience createExperience(@RequestBody Experience experience) {
        return experienceRepository.save(experience);
    }

    // PUT - Atualiza uma experiência existente (já existente)
    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience experienceDetails) {
        return experienceRepository.findById(id)
                .map(experience -> {
                    experience.setJobTitle(experienceDetails.getJobTitle());
                    experience.setCompany(experienceDetails.getCompany());
                    experience.setDuration(experienceDetails.getDuration());
                    experience.setDescriptionItems(experienceDetails.getDescriptionItems());
                    Experience updatedExperience = experienceRepository.save(experience);
                    return ResponseEntity.ok().body(updatedExperience);
                }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Deleta uma experiência (já existente)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id) {
        return experienceRepository.findById(id)
                .map(experience -> {
                    experienceRepository.delete(experience);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}