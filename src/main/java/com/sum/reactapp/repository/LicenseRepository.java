package com.sum.reactapp.repository;

import com.sum.reactapp.model.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="licenses")
public interface LicenseRepository extends JpaRepository<License, Long> {
}