var app = angular.module("crmlogin", []);
app.controller("loginController", function($scope, $http, $location) {

	var lvm = this;

	lvm.login = function() {
		var loginData={};
		loginData.emailId=lvm.emailId;
		loginData.password=lvm.password;

		$http({
			method : 'POST',
			/*url : "https://localhost:8443/golfcrm/loginAdmin",*/
			url : "https://139.59.59.220/golfcrm/loginAdmin",
			data:loginData,
			headers:{"Content-Type":"application/json"}

		}).then(function successCallback(response) {
			if(response.data.operationStatus==1){
				localStorage.setItem("adminSessionToken", response.data.resultSet.sessionId);
				localStorage.setItem("adminId", response.data.resultSet.appAdminVO.id);
				window.location.href="/golfcrm";
			}
			
		}, function errorCallback(response) {
			// code for what happens when there's an error
		});
	}

});
