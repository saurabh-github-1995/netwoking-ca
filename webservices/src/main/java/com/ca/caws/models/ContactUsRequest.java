package com.ca.caws.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class ContactUsRequest {

	@Id
	private String id;
	
	@NotNull
	private String emailId;
	
	private String contactNo;
	
	private String address;
	
	private String msg;
	
	private String name;
	
	@Column(name = "createdOn", updatable = false)
	@CreationTimestamp
	private LocalDateTime createdOn;

	@Column
	@UpdateTimestamp
	private LocalDateTime updatedOn;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public LocalDateTime getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(LocalDateTime updatedOn) {
		this.updatedOn = updatedOn;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "ContactUsRequest [id=" + id + ", emailId=" + emailId + ", contactNo=" + contactNo + ", address="
				+ address + ", msg=" + msg + ", name=" + name + ", createdOn=" + createdOn + ", updatedOn=" + updatedOn
				+ "]";
	}

	
	
	
	
}
