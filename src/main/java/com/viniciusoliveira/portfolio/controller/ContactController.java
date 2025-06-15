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

import com.viniciusoliveira.portfolio.model.ContactLink;
import com.viniciusoliveira.portfolio.repository.ContactLinkRepository;

@RestController
@RequestMapping("/api/contact-links")
public class ContactController {

    @Autowired
    private ContactLinkRepository contactLinkRepository;

    @GetMapping
    public List<ContactLink> getAllContactLinks() {
        return contactLinkRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactLink> getContactLinkById(@PathVariable Long id) {
        return contactLinkRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ContactLink createContactLink(@RequestBody ContactLink contactLink) {
        return contactLinkRepository.save(contactLink);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactLink> updateContactLink(@PathVariable Long id, @RequestBody ContactLink linkDetails) {
        return contactLinkRepository.findById(id)
                .map(link -> {
                    link.setName(linkDetails.getName());
                    link.setUrl(linkDetails.getUrl());
                    link.setIconClass(linkDetails.getIconClass());
                    return ResponseEntity.ok(contactLinkRepository.save(link));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContactLink(@PathVariable Long id) {
        return contactLinkRepository.findById(id)
                .map(link -> {
                    contactLinkRepository.delete(link);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}