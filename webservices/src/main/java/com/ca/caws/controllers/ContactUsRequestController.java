package com.ca.caws.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ca.caws.models.ContactUsRequest;
import com.ca.caws.service.ContactUsRequestService;
import com.ca.caws.utils.StatusCodes;
import com.ca.caws.utils.WSResponse;

@RestController
public class ContactUsRequestController {
	@Autowired
	private ContactUsRequestService contactUsRequestService;
	@CrossOrigin
	@PostMapping("/sendContactUsRequest")
	public WSResponse sendContactUsRequest(@RequestBody ContactUsRequest contactUsRequest) {

		WSResponse wsResponse = new WSResponse();

		try {
			wsResponse.setResultSet(contactUsRequestService.sendContactUsRequest(contactUsRequest));
			wsResponse.setOperationStatus(StatusCodes.OPERATIONSUCCESSFULL);

		
		} catch (Exception e) {
			e.printStackTrace();
			wsResponse.setOperationStatus(StatusCodes.UNKNOWNERROR);
			

		}

		return wsResponse;
	}
}
