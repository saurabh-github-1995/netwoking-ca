app.controller("enquiriesController", function($scope, datasource,
		serverEndpoints, authentication, navigation, strings, $route, $window) {

	console.log("enquiriesController()----> Start");
	var lvm = this;
	lvm.customers = [];
	lvm.searchedCustomers = [];

	$("#sidebar-panel").show();
	/*
	 * lvm.showBanner=true; $scope.$apply();
	 */
	lvm.showBanner = true;

	lvm.pageHeader="";
	
	console.log("enquiriesController()---->End");
})