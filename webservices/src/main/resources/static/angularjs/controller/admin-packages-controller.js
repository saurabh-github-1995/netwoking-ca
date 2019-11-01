/**
 * Main controller
 */
app.controller("adminPackagesController", function(serverEndpoints,navigation,datasource,strings,authentication,$route) {
	console.log("adminPackagesController()---->START");
	$("#sidebar-panel").show();
	
	var lvm=this;
	lvm.imageUrl=serverEndpoints.baseFilesUrl;
	lvm.getAllPackages = function () {
		$(".loader-background").css("display", "flex");
		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getAdminSessionToken();

		// Get product list of portal
		datasource.getData(
			serverEndpoints.getAllPackagesUrl, null,
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

	lvm.approvePackage = function (packageId,status) {
		$(".loader-background").css("display", "flex");
		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getAdminSessionToken();

		var uploadData={};
		uploadData[serverEndpoints.id] = packageId;
		uploadData[serverEndpoints.status]=status;
		
		// Get product list of portal
		datasource.getData(
			serverEndpoints.approveDissapprovePackagesUrl, uploadData,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					$route.reload();
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
		navigation.routeTo(navigation.routes.CREATENEWPACKAGE);
	}
	console.log("adminPackagesController()---->END");
});