/**
 * Main controller
 */
app.controller("customerPackagesController", function(serverEndpoints,navigation,datasource,strings,authentication) {
	console.log("customerPackagesController()---->START");

	/*$("#CUSTOMERS").hide();
	$("#ENQUIRIES").hide();
	$("#PACKAGES").show();*/

	$("#sidebar-panel").show();
	
	var lvm=this;
	lvm.imageUrl=serverEndpoints.baseFilesUrl;
	lvm.getAllPackages = function () {
		$(".loader-background").css("display", "flex");
		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		// Get product list of portal
		datasource.getData(
			serverEndpoints.getAllPackagesByCustomerUrl, null,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {


					lvm.packages=data;

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});

	}

	lvm.getAllPackages();

	lvm.approvePackage = function (packageId) {
		$(".loader-background").css("display", "flex");
		var header = {};
		header[serverEndpoints.sessionToken] = resourceAuth.getCustomerSessionToken();

		var uploadData={};
		uploadData[serverEndpoints.id] = packageId;
		
		// Get product list of portal
		datasource.getData(
			serverEndpoints.approvePackagesUrl, uploadData,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});

	}

	

	lvm.navigateToEditPackage=function(packageName){
		window.location.href=navigation.routes.UPDATEPACKAGE+"/"+packageName;
	}
	lvm.navigateToCreatePackage=function(){
		window.location.href=navigation.routes.CREATENEWPACKAGE;
	}
	console.log("customerPackagesController()---->END");
});