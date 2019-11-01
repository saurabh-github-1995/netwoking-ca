package com.ca.caws.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ca.caws.dao.ContactUsRequestDAO;
import com.ca.caws.models.ContactUsRequest;

@Service
public class ContactUsRequestService {

	@Autowired
	private ContactUsRequestDAO contactUsRequestDAO;
	
	public Object sendContactUsRequest(ContactUsRequest contactUsRequest) {
		contactUsRequest.setId(UUID.randomUUID().toString());
		contactUsRequest=contactUsRequestDAO.save(contactUsRequest);
		return contactUsRequest;
	}

}
