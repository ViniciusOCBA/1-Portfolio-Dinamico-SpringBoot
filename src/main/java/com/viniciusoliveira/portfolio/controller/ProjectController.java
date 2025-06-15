// Arquivo corrigido: src/main/java/com/viniciusoliveira/portfolio/controller/ProjectController.java
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

import com.viniciusoliveira.portfolio.model.Project;
import com.viniciusoliveira.portfolio.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(project -> ResponseEntity.ok().body(project))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    // MÉTODO CORRIGIDO ABAIXO
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setTitle(projectDetails.getTitle());
                    project.setShortDescription(projectDetails.getShortDescription());
                    project.setLongDescription(projectDetails.getLongDescription());
                    project.setImageUrl(projectDetails.getImageUrl());
                    project.setDetailImageUrl(projectDetails.getDetailImageUrl());
                    
                    // --- LINHA ADICIONADA PARA CORRIGIR O BUG ---
                    project.setTechnologies(projectDetails.getTechnologies());
                    // ---------------------------------------------

                    Project updatedProject = projectRepository.save(project);
                    return ResponseEntity.ok().body(updatedProject);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(project -> {
                    projectRepository.delete(project);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}