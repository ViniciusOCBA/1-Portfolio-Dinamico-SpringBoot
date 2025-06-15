package com.viniciusoliveira.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.viniciusoliveira.portfolio.model.ContactLink;

@Repository
public interface ContactLinkRepository extends JpaRepository<ContactLink, Long> {
}