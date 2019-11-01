
	app.controller("consumerAllConsumers", function ($scope, datasource, serverEndpoints,authentication,navigation,strings,$route,$window) {
	
		console.log("consumerAllConsumers()----> Start");
		var lvm = this;
		lvm.customers = [];
		lvm.searchedCustomers=[];
		
		$("#sidebar-panel").show();
		/*
		 * lvm.showBanner=true; $scope.$apply();
		 */
		lvm.showBanner=true;
	
		
		
		lvm.getCustomers = function() {

			var header = {};
			header[serverEndpoints.sessionToken]=authentication.getCustomerSessionToken();

			// Get product list of portal
			datasource.getData(
					serverEndpoints.getAllConsumerByCustomerIdUrl, {},
					header, function(isSuccess, data) {

						if (isSuccess) {
							lvm.customers = data;
							
						}else {
							
						}
					});
		}

		lvm.getCustomers();
		
		
		lvm.getSearchedCustomers = function(searchString) {
			lvm.searchedCustomers=[];
			var requestData={};
			var header = {};
			header[serverEndpoints.sessionToken]=authentication.getCustomerSessionToken();
			requestData[serverEndpoints.searchData]=searchString;
			// Get product list of portal
			datasource.getData(
					serverEndpoints.getSearchedConsumerByCustomerIdUrl, requestData,
					header, function(isSuccess, data) {

						if (isSuccess) {
							lvm.searchedCustomers = data;
							if(lvm.searchedCustomers.length==0){
                       		 lvm.diplsaySearchResult=false;
                       		 lvm.noResultsFound=true;
                       	 }
                       	 else {
                       		 lvm.diplsaySearchResult=true;
                       		lvm.noResultsFound=false;
							}
							
						}
					});
		}
		
		lvm.clearSearch=function(){
        	lvm.searchQuery="";
        	 lvm.diplsaySearchResult=false;
        	 lvm.noResultsFound=false;
        }
		
		lvm.getCustomerDetails=function(id){
			navigation.routeTo(navigation.routes.PVTCUSTOMERDETAILS,null,id);
		}
		
		
		lvm.updateCustomer=function(id){
			navigation.routeTo(navigation.routes.UPDATECONSUMER,null,id);
		}
		
		lvm.navigateToCustomersVisaDetails=function(id){
			navigation.routeTo(navigation.routes.CUSTOMERVISADETAILS,null,id);
		}
		lvm.navigateToCustomersInterestDetails=function(id){
			navigation.routeTo(navigation.routes.CUSTOMERINTERESTDETAILS,null,id);
		}
		lvm.navigateToCustomersFrequentFlyerDetails=function(id){
			navigation.routeTo(navigation.routes.CUSTOMERFREQUENTFLYERDETAILS,null,id);
		}
		lvm.logOut=function(){
			authentication.setAdminSessionToken(null);
			authentication.setAdminId(null);
			navigation.routeTo(navigation.routes.LOGIN);
			location.reload();
		}
		lvm.addCustomer=function(){
			navigation.routeTo(navigation.routes.UPDATECONSUMER,null,null);
		}
		

		lvm.getMonthBirthdays = function() {
			
			var header = {};
			header[serverEndpoints.sessionToken]=authentication.getAdminSessionToken();
			
			// Get product list of portal
			datasource.getData(
					serverEndpoints.getWeeksBirthDayUrl, null,
					header, function(isSuccess, data) {

						if (isSuccess) {
							lvm.birthdayCustomers=data;
	                   	 }
	                   	 else {
	                   		 
							}
							
						
					});
		}
		//lvm.getMonthBirthdays();
	
		lvm.removeCustomer = function (id) {
			$(".loader-background").css("display", "flex");

			var header = {};
			header[serverEndpoints.sessionToken] = authentication
				.getCustomerSessionToken();

			var customerData = {};
			customerData[serverEndpoints.id] = id;
			// Get product list of portal
			datasource.getData(serverEndpoints.removeconsumerUrl, customerData,
				header, function (isSuccess, data) {
					$(".loader-background").css("display", "none");

					if (isSuccess) {
						lvm.requestedCustomerId = null;
						$("#deleteModal").modal("hide");
						$route.reload();

					} else {
						if (data === strings.msg_admin_not_logged_in) {
							lvm.logOut();

						}
					}
				});
		}
		lvm.showDeleteModal = function (id) {
			lvm.requestedCustomerId = id;
			$("#deleteModal").modal("show")
		}

	console.log("consumerAllConsumers()---->End");
})