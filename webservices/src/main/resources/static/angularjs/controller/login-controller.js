(function() {
	'use strict';

	app.controller('loginController', loginController);

	loginController.$inject = [ '$scope', 'datasource', 'serverEndpoints',
			'navigation', 'authentication','$rootScope' ];
	function loginController($scope, datasource, serverEndpoints, navigation,
			authentication,$rootScope) {
		console.log("loginController()----> Start");
		
		
		var lvm = this;
		lvm.showBanner = false;
		$("#sidebar-panel").hide();
		$rootScope.userName="";
		$rootScope.adminName="";
		lvm.login = function() {
			$(".loader-background").css("display", "flex");

			var header = {}
			var usersCredentials = {};
			usersCredentials[serverEndpoints.emailId] = lvm.emailId;
			usersCredentials[serverEndpoints.password] = lvm.password;
			// Get product list of portal
			datasource
					.getData(
							serverEndpoints.loginAdminUrl,
							usersCredentials,
							header,
							function(isSuccess, data) {
								$(".loader-background").css("display", "none");

								if (isSuccess) {

									authentication
											.setAdminSessionToken(data.sessionId);
									authentication
											.setAdminId(data.appAdminVO.id);
									authentication
									.setAdminName(data.appAdminVO.name);
									// navigationDrawerSetup.showItemsForAdminLogin();
									window.location.href=navigation.routes.HOME;
								} else {
									lvm.message = data;
								}
							});
		}

		var token="";
			messaging.getToken().then((currentToken) => {
				token=currentToken;
				console.log("11");
			});
		lvm.customerLogin = function() {
			$(".loader-background").css("display", "flex");
			
			
			var header = {}
			header[serverEndpoints.pushToken] = token;
			var usersCredentials = {};
			usersCredentials[serverEndpoints.emailId] = lvm.emailId;
			usersCredentials[serverEndpoints.password] = lvm.password;
			
			
			// Get product list of portal
			datasource
					.getData(
							serverEndpoints.logincustomerUrl,
							usersCredentials,
							header,
							function(isSuccess, data) {
								$(".loader-background").css("display", "none");
								if (isSuccess) {

									authentication
											.setCustomerSessionToken(data.customerSession.id);
									authentication
											.setCustomerId(data.customer.id);
									authentication
											.setCustomerType(data.customerRolesMappings[0].roleId)
									authentication.setCustomerName(data.customer.title+" "+data.customer.firstName+" "+data.customer.lastName);

									if (data.customerRolesMappings[0].roleId == 4) {
										window.location.href = navigation.routes.ALLQUERIES;
									} else if (data.customerRolesMappings[0].roleId == 1) {
										window.location.href = navigation.routes.ALLQUERIES;
									}else if (data.customerRolesMappings[0].roleId == 6) {
										window.location.href = navigation.routes.ALLQUERIES;
									}else if (data.customerRolesMappings[0].roleId == 2) {
										window.location.href = navigation.routes.ALLQUERIES;
									}

								} else {
									lvm.message = data;
								}
							});
		}
		
		lvm.superadminlogin = function () {
            lvm.message = "";
            $(".loader-background").css("display", "flex");
            var loginData = {};
            loginData[serverEndpoints.emailId] = lvm.emailId;
            loginData[serverEndpoints.password] = lvm.password;
            // Get product list of portal
            datasource.getData(
                serverEndpoints.loginSuperAdminUrl, loginData,
                null, function (isSuccess, data) {

                    if (isSuccess) {
                        $(".loader-background").css("display", "none");
                        lvm.superAdmin = data;
                        authentication.setSuperAdminSessionToken(lvm.superAdmin.appAdminSession.sessionId);
                        authentication.setSuperAdminId(lvm.superAdmin.superAdmin.id);
							window.location=navigation.routes.ALLADMINS;
                        
                    } else {
                        lvm.message = data;
                        lvm.messageTitle = strings.error;

                        $("#formSubmissionModal").modal('show');
                        $(".loader-background").css("display", "none");
                    }
                });

        }
		
		
		
	}

	console.log("loginController()---->End");
})();