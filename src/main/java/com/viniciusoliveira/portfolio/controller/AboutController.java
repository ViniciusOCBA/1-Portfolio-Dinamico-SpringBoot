// Substitua o conteúdo em: src/main/java/com/viniciusoliveira/portfolio/controller/AboutController.java
package com.viniciusoliveira.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viniciusoliveira.portfolio.model.About;
import com.viniciusoliveira.portfolio.repository.AboutRepository;

@RestController
@RequestMapping("/api/about")
public class AboutController {

    @Autowired
    private AboutRepository aboutRepository;

    // GET - Busca a informação "Sobre" (já existente)
    @GetMapping
    public ResponseEntity<About> getAboutInfo() {
        return aboutRepository.findAll().stream().findFirst()
                .map(about -> ResponseEntity.ok().body(about))
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT - Cria ou atualiza a informação "Sobre"
    @PutMapping
    public ResponseEntity<About> createOrUpdateAbout(@RequestBody About aboutDetails) {
        // Tenta encontrar o primeiro (e único) registro
        About about = aboutRepository.findAll().stream().findFirst()
                .orElse(new About()); // Se não encontrar, cria um novo

        about.setName(aboutDetails.getName());
        about.setSubtitle(aboutDetails.getSubtitle());
        about.setDescription(aboutDetails.getDescription());
        about.setProfileImageUrl(aboutDetails.getProfileImageUrl());
        
        About updatedAbout = aboutRepository.save(about);
        return ResponseEntity.ok(updatedAbout);
    }
}