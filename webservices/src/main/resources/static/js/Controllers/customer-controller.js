var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {

	var lvm = this;

	var getCustomer = function() {
		$http({
			method : 'POST',
			url : "https://localhost:8443/golfcrm/getAllCustomers",
			headers : {
				"sessionToken" : "acb65b32-18e0-4c70-b2ea-0da24b8fb30f"
			},

		}).then(function successCallback(response) {
			$scope.customers = response.data.resultSet;
			console.log($scope.customers);
		}, function errorCallback(response) {
			// code for what happens when there's an error
		});
	}
	getCustomer();
});
