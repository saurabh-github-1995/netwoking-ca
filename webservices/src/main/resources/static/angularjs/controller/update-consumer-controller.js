app.controller("updateConsumerController", function($scope, datasource, serverEndpoints,
		strings, navigation, authentication) {

	
	console.log("update-()----> Start");
	var lvm = this;
	lvm.customers = [];
	lvm.messageTitle = "";
	lvm.message = "";
	lvm.visaCountryModel = 2;
	lvm.visaModel = 2;
	lvm.flyerModel = 2;
	$("#sidebar-panel").show();
	/*
	 * lvm.showBanner=true; $scope.$apply();
	 */
	lvm.showBanner = true;
	lvm.getCustomerDetailsById = function (adminId) {
		$(".loader-background").css("display", "flex");
		var customerDetailsData = {};
		var header = {};
		header[serverEndpoints.sessionToken] = authentication
			.getCustomerSessionToken();

		customerDetailsData[serverEndpoints.id] = adminId;

		// Get product list of portal
		datasource.getData(serverEndpoints.getConsumerByIdUrl,
			customerDetailsData, header, function (isSuccess, data) {
			$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.firstName = data.name;
					lvm.email = data.emailId;
					lvm.mobileNumber = data.mobileNumber;
					lvm.summary = data.summary;
					lvm.customer=data.consumer;
					
					lvm.customer.passportDateOfIssue=lvm.covertStringToDate(lvm.customer.passportDateOfIssue);
					$("#issueDate").val(lvm.customer.passportDateOfIssue);

					lvm.customer.dateOfBirth=lvm.covertStringToDate(lvm.customer.dateOfBirth);
					$("#dateOfBirth").val(lvm.customer.dateOfBirth);

					lvm.customer.passportDateOfExpriry=lvm.covertStringToDate(lvm.customer.passportDateOfExpriry);
					$("#expiryDate").val(lvm.customer.passportDateOfExpriry);

					lvm.customer.spouseBirthDate=lvm.covertStringToDate(lvm.customer.spouseBirthDate);
					$("#spouseBirthDate").val(lvm.customer.spouseBirthDate);

					lvm.customer.weddingAnniversary=lvm.covertStringToDate(lvm.customer.weddingAnniversary);
					$("#anniversary").val(lvm.customer.weddingAnniversary);

					lvm.customer.spousePassportDateOfIssue=lvm.covertStringToDate(lvm.customer.spousePassportDateOfIssue);
					$("#spousePassportDateOfIssue").val(lvm.customer.spousePassportDateOfIssue);
					
					lvm.customer.spousePassportDateOfExpiry=lvm.covertStringToDate(lvm.customer.spousePassportDateOfExpiry);
					$("#spousePassportDateOfExpiry").val(lvm.customer.spousePassportDateOfIssue);
				
					
					
					lvm.setOldVisas(data.consumerVisas);
					lvm.setOldIntrest(data.consumerInterest);
					lvm.setOldFrequentFlyers(data.consumerFrequentFlyers);
				} else {/*
							 * lvm.messageTitle=strings.lbl_error;
							 * lvm.message=strings.msg_customer_registration_failed;
							 * $("#formSubmissionModal").modal("show");
							 */
				}
			});
	}
	var adminId = navigation.getTransitionData();

	if (adminId == null || adminId === "") {
		if (window.location.pathname.includes(navigation.routes.UPDATECUSTOMER)) {
			navigation.routeTo(navigation.routes.REGISTERCUSTOMER);
		}

		lvm.headerLabel = "Register Customer",
			lvm.buttonLabel = "Register",
				lvm.successMessage=strings.msg_customer_registration_succesfull;
	} else {
		lvm.getCustomerDetailsById(adminId);
		lvm.headerLabel = "Update Customer",
			lvm.buttonLabel = "Update",
			lvm.successMessage=strings.msg_customer_updation_succesfull;
			
	}
	lvm.registerCustomer = function () {
		$(".loader-background").css("display", "flex");
		var registerCustomerData = {};
		var customerObj={};
		var header = {};
		header[serverEndpoints.sessionToken] = authentication
			.getCustomerSessionToken();
		lvm.WSurl = null;
		if (adminId == null || adminId === "") {
			lvm.WSurl = serverEndpoints.registerNewConsumerUrl;

		} else {
			registerCustomerData[serverEndpoints.id] = adminId;
			lvm.WSurl = serverEndpoints.updateConsumerUrl;
		}

		customerObj[serverEndpoints.id] = lvm.customer.id;
		customerObj[serverEndpoints.title] = lvm.customer.title;
		customerObj[serverEndpoints.firstName] = lvm.customer.firstName;
		customerObj[serverEndpoints.middleName] = lvm.customer.middleName;
		customerObj[serverEndpoints.lastName] = lvm.customer.lastName;
		customerObj[serverEndpoints.dateOfBirth] = lvm.customer.dateOfBirth;
		customerObj[serverEndpoints.companyName] = lvm.customer.companyName;
		customerObj[serverEndpoints.designation] = lvm.customer.designation;
		customerObj[serverEndpoints.businessAddress] = lvm.customer.businessAddress;
		customerObj[serverEndpoints.telNo] = lvm.customer.telNo;
		customerObj[serverEndpoints.emailId] = lvm.customer.emailId;
		customerObj[serverEndpoints.homeAddress] = lvm.customer.homeAddress;
		customerObj[serverEndpoints.passPortNo] = lvm.customer.passPortNo;
		customerObj[serverEndpoints.passportDateOfIssue] = lvm.customer.passportDateOfIssue;
		customerObj[serverEndpoints.passportDateOfExpriry] = lvm.customer.passportDateOfExpriry;
		customerObj[serverEndpoints.spouseName] = lvm.customer.spouseName;
		customerObj[serverEndpoints.spouseBirthDate] = lvm.customer.spouseBirthDate;
		customerObj[serverEndpoints.weddingAnniversary] = lvm.customer.weddingAnniversary;
		customerObj[serverEndpoints.spousePassportNo] = lvm.customer.spousePassportNo;
		customerObj[serverEndpoints.spousePassportDateOfIssue] = lvm.customer.spousePassportDateOfIssue;
		customerObj[serverEndpoints.spousePassportDateOfExpiry] = lvm.customer.spousePassportDateOfExpiry;
		customerObj[serverEndpoints.spouseContactNo] = lvm.customer.spouseContactNo;
		customerObj[serverEndpoints.spouseEmail] = lvm.customer.spouseEmail;
		customerObj[serverEndpoints.gstinNo] = lvm.customer.gstinNo;
		customerObj[serverEndpoints.handicap] = lvm.customer.handicap;
		customerObj[serverEndpoints.reference] = lvm.customer.reference;
		customerObj[serverEndpoints.username] = lvm.customer.username;
		customerObj[serverEndpoints.password] = lvm.customer.password;


		var visaDataArray = [];
		var frequentDataArray = [];

		for (var i = 1; i < lvm.visaModel; i++) {
			var visaDataObj = {};
			if ($("#visaCountry" + i + "").val() === "" || typeof $("#visaCountry" + i + "").val() == 'undefined' || $("#visaCountry" + i + "").val() == null) {


			} else {
				visaDataObj.visaCountry = $("#visaCountry" + i + "").val();
				visaDataObj.visaExpiryDate = $("#visaExpiryDate" + i + "").val();
				visaDataArray.push(visaDataObj);
			}

		}
		for (var i = 1; i < lvm.flyerModel; i++) {
			var frequentDataObj = {};
			if ($("#flyerAirline" + i + "").val() === "" || typeof $("#flyerAirline" + i + "").val() == 'undefined' || $("#flyerAirline" + i + "").val() == null) {

			} else {
				frequentDataObj.airlines = $("#flyerAirline" + i + "").val();
				frequentDataObj.frequentNumber = $("#flyerNumber" + i + "").val();
				frequentDataArray.push(frequentDataObj);
			}


		}
		registerCustomerData[serverEndpoints.consumer]=customerObj;
		registerCustomerData[serverEndpoints.consumerVisas] = visaDataArray;
		registerCustomerData[serverEndpoints.consumerFrequentFlyers] = frequentDataArray;
		registerCustomerData[serverEndpoints.consumerInterest] = lvm.interests;
		datasource
			.getData(
				lvm.WSurl,
				registerCustomerData,
				header,
				function (isSuccess, data) {
					$(".loader-background").css("display", "none");

					if (isSuccess) {
						lvm.messageTitle = strings.lbl_success;
						lvm.message = lvm.successMessage;
						$("#formSubmissionModal").modal("show");
					} else {
						lvm.messageTitle = strings.lbl_error;
						lvm.message = strings.msg_customer_registration_failed;
						$("#formSubmissionModal").modal("show");
					}
				});
	}

	$("#visaButton").click(function () {

		$("#visaCountry").append('<div class="fomr-label-and-input-container"><div class="form-input-label">Country</div><div class="fomr-input-field-container"><input type="text" class="form-input-field" placeholder="" name="handicap" id="visaCountry' + lvm.visaModel + '" ng-model="lvm.country' + lvm.visaModel + '"></div></div>');
		$("#visaExpiryDate").append('<div class="fomr-label-and-input-container"><div class="form-input-label">Expiry Date</div><div class="fomr-input-field-container"><input type="Date" class="form-input-field" placeholder="" id="visaExpiryDate' + lvm.visaModel + '" name="gstinNo" ng-model="lvm.expiryDate' + lvm.visaModel + '"></div></div>');
		lvm.visaModel++;

	});



	$("#frequentFlyer").click(function () {

		$("#frequentFlyerAirline").append('<div class="fomr-label-and-input-container"><div class="form-input-label">Airline</div><div class="fomr-input-field-container"><input type="text" class="form-input-field" placeholder="" name="handicap" id="flyerAirline' + lvm.flyerAirline + '" ng-model="lvm.airlines' + lvm.flyerModel + '"></div></div>');
		$("#frequentFlyerNumber").append('<div class="fomr-label-and-input-container"><div class="form-input-label">Number</div><div class="fomr-input-field-container"><input type="number" class="form-input-field" placeholder="" name="gstinNo" id="flyerNumber' + lvm.flyerModel + '" ng-model="lvm.flyerNumber' + lvm.flyerModel + '"></div></div>');
		lvm.flyerModel++;

	});

	lvm.setOldVisas=function(oldVisas){
		for(var i=0;i<oldVisas.length;i++){
			
			$("#visaCountry").append('<div class="fomr-label-and-input-container"><div class="form-input-label">Country</div><div class="fomr-input-field-container"><input type="text" class="form-input-field" placeholder="" name="handicap" id="visaCountry' + lvm.visaModel + '" ng-model="lvm.country' + lvm.visaModel + '"></div></div>');
			$("#visaExpiryDate").append('<div class="fomr-label-and-input-container"><div class="form-input-label">Expiry Date</div><div class="fomr-input-field-container"><input type="Date" class="form-input-field" placeholder="" id="visaExpiryDate' + lvm.visaModel + '" name="gstinNo" ng-model="lvm.expiryDate' + lvm.visaModel + '"></div></div>');
			$("#visaCountry"+(lvm.visaModel-1)).val(oldVisas[i].visaCountry);
			
			let date = JSON.stringify(oldVisas[i].visaExpiryDate)
			date = date.slice(1,11);
			$("#visaExpiryDate"+(lvm.visaModel-1)).val(date);
			lvm.visaModel++;
		}
	}

	lvm.setOldIntrest=function(oldIntrest){
		lvm.interests="";
		for(var i=0;i<oldIntrest.length;i++){
			lvm.interests=lvm.interests+","+oldIntrest[i].customerIntrest;
		}
		lvm.interests=lvm.interests.substring(1);
	}

	lvm.setOldFrequentFlyers=function(oldFlyerData){
		for(var i=0;i<oldFlyerData.length;i++){
			
		$("#frequentFlyerAirline").append('<div class="fomr-label-and-input-container"><div class="form-input-label">Airline</div><div class="fomr-input-field-container"><input type="text" class="form-input-field" placeholder="" name="handicap" id="flyerAirline' + lvm.flyerModel + '" ng-model="lvm.airlines' + lvm.flyerModel + '"></div></div>');
		$("#frequentFlyerNumber").append('<div class="fomr-label-and-input-container"><div class="form-input-label">Number</div><div class="fomr-input-field-container"><input type="number" class="form-input-field" placeholder="" name="gstinNo" id="flyerNumber' + lvm.flyerModel + '" ng-model="lvm.flyerNumber' + lvm.flyerModel + '"></div></div>');
		$("#flyerAirline"+(lvm.flyerModel-1)).val(oldFlyerData[i].airlines);
		$("#flyerNumber"+(lvm.flyerModel-1)).val(oldFlyerData[i].frequentNumber);
		lvm.flyerModel++;
		}
	}

	lvm.covertStringToDate=function(stringDate){
		let date = JSON.stringify(stringDate)
		date = date.slice(1,11);
		return date;
		
	}
	console.log("updateConsumerController()---->End");
})