
	app.controller("alladminsController", function ($scope, datasource, serverEndpoints,authentication,navigation,strings,$route,$window) {
	
		console.log("alladminsController()----> Start");
		var lvm = this;
		
		
		$("#sidebar-panel").show();
		
		lvm.showBanner=true;
	
		
		
		lvm.getAllAdmins = function() {

			var header = {};
			header[serverEndpoints.sessionToken]=authentication.getSuperAdminSessionToken();

			// Get product list of portal
			datasource.getData(
					serverEndpoints.getAllAdminsUrl, {},
					header, function(isSuccess, data) {

						if (isSuccess) {
							lvm.admins = data;
							
						}else {
							
						}
					});
		}

		lvm.getAllAdmins();
		
		
		lvm.navigateToUpdateAdmin=function(admin){
			navigation.routeTo(navigation.routes.UPDATEADMIN,null,admin)
		}

	console.log("alladminsController()---->End");
})