/**
 * Main controller
 */
app.controller("packagesController", function(serverEndpoints,navigation,datasource,strings) {
	console.log("packagesController()---->START");
	// selectedMenu.setActive("packages");
	$("#sidebar-panel").show();
	var lvm=this;
	lvm.imageUrl=serverEndpoints.baseFilesUrl;
	lvm.getAllPackages = function (form) {
		$(".loader-background").css("display", "flex");
		var header = {};
		// header[serverEndpoints.sessionToken] = resourceAuth.getSessionTokenLocalStorage();

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

	lvm.navigateToEditPackage=function(packageName){
		window.location.href=navigation.routes.UPDATEPACKAGE+"/"+packageName;
	}
	lvm.navigateToCreatePackage=function(){
		window.location.href=navigation.routes.CREATENEWPACKAGE;
	}

	// function imgError(image) {
	// 	image.onerror = "";
	// 	image.src = "/images/noimage.gif";
	// 	return true;
	// }
	console.log("packagesController()---->END");
});