package com.ca.caws.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	@Autowired
	private JavaMailSender mailSender;

	public void sendEmail(String messageToSend, String reciepent, String subject) throws MessagingException {
		final MimeMessage mimeMessage = mailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
		message.setFrom("10531140@mydbs.ie");

		if (reciepent != null) {
			message.setSubject(subject);
			message.setTo(reciepent);
			message.setText(messageToSend);
		} 

		 mailSender.send(mimeMessage);

	}
}
