
(function() {
	'use strict';

	app.controller('customerVisaController', customerVisaController);

	customerVisaController.$inject = [ '$scope', 'datasource','serverEndpoints','authentication','navigation' ,'strings','$route','$window'];
	function customerVisaController($scope, datasource, serverEndpoints,authentication,navigation,strings,$route,$window) {
		console.log("customerVisaController()----> Start");
		var lvm = this;
		lvm.customers = [];
		lvm.searchedCustomers=[];
		lvm.isRedirectedFromLoginPage=false;
		/*lvm.showBanner=true;
		$scope.$apply();*/
		lvm.showBanner=true;
	
		lvm.customerId=navigation.getTransitionData();
		
		lvm.getCustomersVisaDetails = function(customerId) {
			var requestPayLoad={};
			var header = {};
			header[serverEndpoints.sessionToken]=authentication.getAdminSessionToken();
			requestPayLoad[serverEndpoints.customerId]=customerId;
			// Get product list of portal
			datasource.getData(
					serverEndpoints.getListOfCustomerVisaDetailsUrl, requestPayLoad,
					header, function(isSuccess, data) {

						if (isSuccess) {
							lvm.visaList = data;
							
							
						}else {
							if(data===strings.msg_admin_not_logged_in){
								lvm.logOut();
								
							}
						}
					});
		}

		
		if(lvm.customerId==null || lvm.customerId===""){
			navigation.routeTo(navigation.routes.HOME)
		}else {
			lvm.getCustomersVisaDetails(lvm.customerId);
		}
		
		lvm.logOut=function(){
			authentication.setAdminSessionToken(null);
			authentication.setAdminId(null);
			navigation.routeTo(navigation.routes.LOGIN);
			location.reload();
		}
	}

	console.log("customerVisaController()---->End");
})();