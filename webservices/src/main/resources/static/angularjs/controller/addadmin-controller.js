app.controller("addadminController", function($scope, datasource,
		serverEndpoints, authentication, navigation, strings, $route, $window) {

	console.log("addadminController()----> Start");
	var lvm = this;

	$("#sidebar-panel").show();

	lvm.showBanner = true;

	lvm.admin = navigation.getTransitionData();
	if (lvm.admin != null) {
		lvm.buttonText = "Update User"
		lvm.wsUrl = serverEndpoints.updateAdminUrl;
	} else {
		lvm.buttonText = "Add User"
		lvm.wsUrl = serverEndpoints.registerAdminUrl;
	}

	lvm.registerAdmin = function() {

		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getSuperAdminSessionToken();

		var uploadData = {};
		uploadData[serverEndpoints.id] = lvm.admin.id;
		uploadData[serverEndpoints.emailId] = lvm.admin.emailId;
		uploadData[serverEndpoints.password] = lvm.admin.password;
		uploadData[serverEndpoints.name] = lvm.admin.name;
		uploadData[serverEndpoints.mobileNumber] = lvm.admin.mobileNumber;

		// Get product list of portal
		datasource.getData(lvm.wsUrl, uploadData,
				header, function(isSuccess, data) {

					if (isSuccess) {
						alert("User Added Succesfully");

					} else {

					}
				});
	}

	console.log("addadminController()---->End");
})