package com.ca.caws.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ca.caws.models.ContactUsRequest;

@Repository
public interface ContactUsRequestDAO extends JpaRepository<ContactUsRequest, String>{

}
