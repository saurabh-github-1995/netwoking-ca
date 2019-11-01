
(function() {
	'use strict';

	app.controller('pvtcustomerDetailsController', pvtcustomerDetailsController);

	pvtcustomerDetailsController.$inject = [ '$scope', 'datasource','serverEndpoints','authentication','navigation' ];
	function pvtcustomerDetailsController($scope, datasource, serverEndpoints,authentication,navigation) {
		console.log("pvtcustomerDetailsController()----> Start");
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
			navigation.routeTo(navigation.routes.ALLCUSTOMERS);
		}
		
		lvm.getCustomerDetailsByCustomerId = function(customerId) {
			var customerData={};
			var header = {};
			header[serverEndpoints.sessionToken]=authentication.getCustomerSessionToken();
			customerData[serverEndpoints.id]=customerId;
			// Get product list of portal
			datasource.getData(
					serverEndpoints.pvtGetCustomerByIdUrl, customerData,
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

	console.log("pvtcustomerDetailsController()---->End");
})();