
/**
 * Service to keep all strings at one place
 */
app.service('strings', function() {

	return {
		
		/****** Error Messages ****************/
		
		msg_admin_not_logged_in : "Admin not logged in",
		msg_users_data_uploaded_succesfully:"Customers Data Uploaded Successfully",
		msg_users_data_uploaded_failed:"Customers Data Upload failed",
		msg_wrong_admin_credential : "Sorry !! Wrong Credentials ",
		msg_unknown_error:"Something Went Wrong",
		
		/******** Confirmation Popups ***************/
		btn_confirm: "Confirm",
		btn_cancel:"Cancel",
		
		
		
	


		
	    
	    
	    /*Customer labels*/
	    lbl_success:"Success",
	    lbl_error:"Error",
	    
	    /*Customer Messages*/
	    msg_customer_registration_succesfull:"New customer registred succesfully",
	    msg_customer_updation_succesfull:"Customer updated succesfully",
	    msg_customer_registration_failed:"New customer registration failed",
	    msg_customer_update_succesfull:"Customer Updated Succesfully",
	    msg_customer_update_failed:"Failed to update customer",
	    
	    /*************** Keys ********************************************/
	    screenDataPortalIdKey:"screenDataPortalIdKey",
	    screenDataProductIdKey: "screenDataProductIdKey",
	    screenDataPostIdKey: "screenDataPostIdKey"
	}
});
