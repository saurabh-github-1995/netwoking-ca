app.controller("updateEnquiriesController", function($scope, datasource,
		serverEndpoints, authentication, navigation, strings, $route, $window) {

	console.log("updateEnquiriesController()----> Start");
	var lvm = this;
	lvm.customers = [];
	lvm.searchedCustomers = [];

	$("#sidebar-panel").show();
	/*
	 * lvm.showBanner=true; $scope.$apply();
	 */
	lvm.showBanner = true;

	lvm.journeyType=[{"id": 1, "journeyType": "ONE WAY"},{"id": 2, "journeyType": "RETURN"}]
	
	lvm.allMasterData = function() {

		var header = {};
		header[serverEndpoints.sessionToken] = authentication
				.getCustomerSessionToken();

		// Get product list of portal
		datasource.getData(serverEndpoints.getMasterDatasUrl, {}, {},
				function(isSuccess, data) {

					if (isSuccess) {
						lvm.masterData = data;
						lvm.serviceTypes=lvm.masterData.serviceTypes;
						lvm.destinationTypes=lvm.masterData.destinationTypes;
						lvm.visaTypes=lvm.masterData.visaTypes;

						if(lvm.enquiryId!=null){
							lvm.header="Update Enquiry";
							lvm.wsUrl=serverEndpoints.updateEnquiryUrl;
							lvm.getEnquiryDetails(lvm.enquiryId);
							
							
						}else{
							lvm.header="Add Enquiry";
							lvm.wsUrl=serverEndpoints.registerNewEnquiryUrl;
						}
					} else {

					}
				});
	}

	lvm.allMasterData();

	lvm.enquiryId=navigation.getTransitionData();
	lvm.getEnquiryDetails = function(id) {
		$(".loader-background").css("display", "flex");
		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		var uploadData={};
		uploadData[serverEndpoints.id] = id;
		// Get product list of portal
		datasource.getData(serverEndpoints.getEnquirieDetailsByIdUrl, uploadData, header,
				function(isSuccess, data) {
			$(".loader-background").css("display", "none");
					if (isSuccess) {
						lvm.enquiry = data;
						lvm.setPreviousService(lvm.enquiry.serviceId);
						lvm.setPreviousDestination(lvm.enquiry.destinationTypeId);
						lvm.setPreviousVisa(lvm.enquiry.visaTypeId);
						var date = lvm.covertStringToDate(lvm.enquiry.dateOfTravel);
						$("#dateOfTravel").val(date);
						lvm.enquiry.dateOfTravel=date;
						lvm.enquiry.child=parseInt(lvm.enquiry.child);
						lvm.enquiry.adult=parseInt(lvm.enquiry.adult);
						lvm.setPreviousJourneyType(lvm.enquiry.oneWayJourney);
					} else {

					}
				});
	}


	

	lvm.setPreviousService=function(oldServiceData){
		for(var i=0;i<lvm.serviceTypes.length;i++){
			if(lvm.serviceTypes[i].id==oldServiceData){
				lvm.selectedService=lvm.serviceTypes[i];
				break;
			}
			
		}
	}

	lvm.setPreviousDestination=function(previousDestination){
		for(var i=0;i<lvm.destinationTypes.length;i++){
			if(lvm.destinationTypes[i].id==previousDestination){
				lvm.selectedDestination=lvm.destinationTypes[i];
				break;
			}
			
		}
	}
	lvm.setPreviousVisa=function(previousVisa){
		for(var i=0;i<lvm.visaTypes.length;i++){
			if(lvm.visaTypes[i].id==previousVisa){
				lvm.selectedVisaType=lvm.visaTypes[i];
				break;
			}
			
		}
	}
	lvm.setPreviousJourneyType=function(oneWayJourney){
		if(oneWayJourney!=null && oneWayJourney==true){
			lvm.selectedJouneyType=lvm.journeyType[0];
		}else{
			lvm.selectedJouneyType=lvm.journeyType[1];
		}
	}

	

	lvm.addNewEnquiry = function() {
		$(".loader-background").css("display", "flex");
		var header = {};
		header[serverEndpoints.sessionToken] = authentication
				.getCustomerSessionToken();

		var uploadData={};
		uploadData[serverEndpoints.id] = lvm.enquiry.id;
		uploadData[serverEndpoints.guestName] = lvm.enquiry.guestName;
		uploadData[serverEndpoints.contactNo] = lvm.enquiry.contactNo;
		uploadData[serverEndpoints.emailId] = lvm.enquiry.emailId;

		if(lvm.selectedService!=null){
			uploadData[serverEndpoints.serviceId] = lvm.selectedService.id;
			uploadData[serverEndpoints.serviceName] = lvm.selectedService.serviceName;
		}
		if(lvm.selectedDestination!=null){
			uploadData[serverEndpoints.destinationTypeId] = lvm.selectedDestination.id;
			uploadData[serverEndpoints.destinationTypeName] = lvm.selectedDestination.destinationTypeName;
		}
		if( lvm.selectedVisaType!=null){
			uploadData[serverEndpoints.visaTypeId] = lvm.selectedVisaType.id;
			uploadData[serverEndpoints.visaTypeName] =lvm.selectedVisaType.visaTypeName;
		}

		
		uploadData[serverEndpoints.sector] = lvm.enquiry.sector;
		uploadData[serverEndpoints.dateOfTravel] = lvm.enquiry.dateOfTravel;
		uploadData[serverEndpoints.adult] = lvm.enquiry.adult;
		uploadData[serverEndpoints.child] = lvm.enquiry.child;
		
		if(lvm.selectedJouneyType!=null && lvm.selectedJouneyType.id==1){
			uploadData[serverEndpoints.oneWayJourney] = true;
			uploadData[serverEndpoints.returnJourney] = false;
		}else{
			uploadData[serverEndpoints.oneWayJourney] = false;
			uploadData[serverEndpoints.returnJourney] = true;
		}
		
		uploadData[serverEndpoints.journeyFrom] = lvm.enquiry.journeyFrom;
		uploadData[serverEndpoints.journeyTo] = lvm.enquiry.journeyTo;
		uploadData[serverEndpoints.status] = lvm.enquiry.status;
		uploadData[serverEndpoints.log] = lvm.enquiry.log;
		uploadData[serverEndpoints.remark] = lvm.enquiry.remark;
		uploadData[serverEndpoints.createdBy] = lvm.enquiry.createdBy;
		uploadData[serverEndpoints.status] = lvm.enquiry.status;

		// Get product list of portal
		datasource.getData(lvm.wsUrl, uploadData, header,
				function(isSuccess, data) {
				$(".loader-background").css("display", "none");
					if (isSuccess) {
						alert("");
					} else {

					}
				});
	}


	lvm.covertStringToDate=function(stringDate){
		let date = JSON.stringify(stringDate)
		date = date.slice(1,11);
		return date;
		
	}

	
	console.log("updateEnquiriesController()---->End");
})