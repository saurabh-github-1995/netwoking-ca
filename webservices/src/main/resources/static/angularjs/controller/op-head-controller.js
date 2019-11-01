app.controller("opHeadEnquiriesController", function($scope, datasource,
		serverEndpoints, authentication, navigation, strings, $route, $window) {

	console.log("opHeadEnquiriesController()----> Start");
	var lvm = this;
	lvm.customers = [];
	lvm.searchedCustomers = [];

	$("#sidebar-panel").show();
	/*
	 * lvm.showBanner=true; $scope.$apply();
	 */
	lvm.showBanner = true;

	lvm.pageHeader="";


	lvm.getAssignedEnquiries = function () {
		$(".loader-background").css("display", "flex");

		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		// Get product list of portal
		datasource.getData(serverEndpoints.getAssigniedEnquiriesToOperationHeadUrl, {}, header,
			function (isSuccess, data) {
			$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.enquiries = data;

				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	lvm.getAssignedEnquiries();
	
	
	lvm.getOperationCustomers = function () {

		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		header[serverEndpoints.roleId] = 2;
		// Get product list of portal
		datasource.getData(serverEndpoints.getRoleWiseCustomersUrl, {}, header,
			function (isSuccess, data) {

				if (isSuccess) {
					lvm.operationsCustomers=data;

				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	lvm.getOperationCustomers();
	
	lvm.currentEnquiryId="";
	lvm.showOperationsModel=function(currentEnquiryId){
		$("#customerModels").modal('show');
		lvm.currentEnquiryId=currentEnquiryId;
	}

	lvm.assignRoleToCustomer = function () {
		$(".loader-background").css("display", "flex");
		// var selected = [];
		// 	$('#checkboxes input:checked').each(function () {
		// 		selected.push($(this).attr('value'));
		// 	});

		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		header[serverEndpoints.roleId] = 2;
		header[serverEndpoints.enquiryId] = lvm.currentEnquiryId;

		var uploadData={};

		uploadData[serverEndpoints.id] = lvm.selectedCustomer.id;
		// Get product list of portal
		datasource.getData(serverEndpoints.assignEnquiriesToRoleUrl, uploadData, header,
			function (isSuccess, data) {
			$(".loader-background").css("display", "none");
				if (isSuccess) {
					$("#customerModels").modal('hide');

				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}
	lvm.remark="";
	lvm.covertStringToDate=function(stringDate){
		let date = JSON.stringify(stringDate)
		date = date.slice(1,11);
		return date;
		
	}
	lvm.showRemarkModel=function(currentEnquiryId,currentRemark,status,dateOfNextAction){
		$("#remarkModel").modal('show');
		lvm.currentEnquiryId=currentEnquiryId;
		lvm.remark=currentRemark;
		lvm.status=status;
		$("#dateOfNextAction").val(lvm.covertStringToDate(dateOfNextAction));
	}
	lvm.updateEnquiryRemark = function () {
		
		$(".loader-background").css("display", "flex");
		
		var header = {};
		
		var uploadData={};
		
		
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		
		uploadData[serverEndpoints.remark] = lvm.remark;
		uploadData[serverEndpoints.id] = lvm.currentEnquiryId;
		uploadData[serverEndpoints.status] = lvm.status;
		uploadData[serverEndpoints.dateOfNextAction] = lvm.dateOfNextAction;

		

		
		// Get product list of portal
		datasource.getData(serverEndpoints.updateEnquiryRemarkUrl, uploadData, header,
			function (isSuccess, data) {
			$(".loader-background").css("display", "none");
				if (isSuccess) {
					$("#remarkModel").modal('hide');
					$route.reload();
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	console.log("opHeadEnquiriesController()---->End");
})