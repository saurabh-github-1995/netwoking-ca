
(function() {
	'use strict';

	app.controller('customerDetailsController', customerDetailsController);

	customerDetailsController.$inject = [ '$scope', 'datasource','serverEndpoints','authentication','navigation' ];
	function customerDetailsController($scope, datasource, serverEndpoints,authentication,navigation) {
		console.log("customerDetailsController()----> Start");
		var lvm = this;
		lvm.customers = [];
		/*lvm.showBanner=true;
		$scope.$apply();*/
		lvm.showBanner=true;
		lvm.customerId=navigation.getTransitionData();
		lvm.customer=null;
		$("#spouseDetailsBlock").slideUp();
		$("#otherDetailsBlock").slideUp();
		$("#visaDetailsBlock").slideUp();
		$("#frequentDetailsBlock").slideUp();
		$("#interestDetailsBlock").slideUp();
		
		if(lvm.customerId==null){
			navigation.routeTo(navigation.routes.HOME);
		}
		
		lvm.getCustomerDetailsByCustomerId = function(customerId) {
			var customerData={};
			var header = {};
			header[serverEndpoints.sessionToken]=authentication.getAdminSessionToken();
			customerData[serverEndpoints.id]=customerId;
			// Get product list of portal
			datasource.getData(
					serverEndpoints.getCustomerByIdUrl, customerData,
					header, function(isSuccess, data) {

						if (isSuccess) {
							lvm.customer = data;
							
						}
					});
		}

		lvm.getCustomerDetailsByCustomerId(lvm.customerId);
		
		lvm.updateCustomer=function(id){
			navigation.routeTo(navigation.routes.UPDATECUSTOMER,null,id);
		}

		
		$("#customerDetailsHeader").click(function () {
			
			$("#customerDetailsBlock").slideToggle();
		});
		$("#spouseDetailsHeader").click(function () {
			$("#spouseDetailsBlock").slideToggle();
		});
		$("#otherDetailsHeader").click(function () {
			$("#otherDetailsBlock").slideToggle();
		});
		$("#visaDetailsHeader").click(function () {
			$("#visaDetailsBlock").slideToggle();
		});
		$("#frequentDetailsHeader").click(function () {
			$("#frequentDetailsBlock").slideToggle();
		});
		$("#interestDetailsHeader").click(function () {
			$("#interestDetailsBlock").slideToggle();
		});
	}

	console.log("customerController()---->End");
})();