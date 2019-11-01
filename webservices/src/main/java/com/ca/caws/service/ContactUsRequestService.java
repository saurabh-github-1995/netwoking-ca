package com.ca.caws.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ca.caws.dao.ContactUsRequestDAO;
import com.ca.caws.models.ContactUsRequest;

@Service
public class ContactUsRequestService {
	@Autowired
	EmailService emailService;

	@Autowired
	private ContactUsRequestDAO contactUsRequestDAO;

	public Object sendContactUsRequest(ContactUsRequest contactUsRequest) {
		contactUsRequest.setId(UUID.randomUUID().toString());
		contactUsRequest = contactUsRequestDAO.save(contactUsRequest);
		try {
			String subject = "CONTACT US REQUEST";
			String messageToSendClient = "Dear " + contactUsRequest.getName()
					+ ", thank you for your request we will get in touch with you as soon as possible";

			String messageToSendOwner = "New contact us request \n Name : " + contactUsRequest.getName() + "\n Email : "
					+ contactUsRequest.getEmailId();
			emailService.sendEmail(messageToSendClient, contactUsRequest.getEmailId(), subject);
			emailService.sendEmail(messageToSendOwner, "10531140@mydbs.ie", subject);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return contactUsRequest;
	}

}
