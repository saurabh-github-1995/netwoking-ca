(function () {
	'use strict';

	app.controller('customerController', customerController);

	customerController.$inject = ['$scope', 'datasource', 'serverEndpoints',
		'authentication', 'navigation', 'strings', '$route', '$window'];
	function customerController($scope, datasource, serverEndpoints,
		authentication, navigation, strings, $route, $window) {
		console.log("customerController()----> Start");
		var lvm = this;
		lvm.customers = [];
		lvm.searchedCustomers = [];

		$("#sidebar-panel").show();
		/*
		 * lvm.showBanner=true; $scope.$apply();
		 */
		/*lvm.showBanner=true;
		lvm.isRedirectedFromLoginPage=navigation.getTransitionData();
		
		if(lvm.isRedirectedFromLoginPage==true){
			$window.location.reload()
		}*/
		lvm.getCustomers = function () {
			$(".loader-background").css("display", "flex");

			var header = {};
			header[serverEndpoints.sessionToken] = authentication
				.getAdminSessionToken();

			// Get product list of portal
			datasource.getData(serverEndpoints.getAllCustomersUrl, {}, header,
				function (isSuccess, data) {
				$(".loader-background").css("display", "none");
					if (isSuccess) {
						lvm.customers = data;

					} else {
						if (data === strings.msg_admin_not_logged_in) {
							lvm.logOut();

						}
					}
				});
		}

		lvm.getCustomers();

		lvm.getAllRoles = function () {

			var header = {};
			header[serverEndpoints.sessionToken] = authentication
				.getAdminSessionToken();

			// Get product list of portal
			datasource.getData(serverEndpoints.getAllRolesUrl, null, null,
				function (isSuccess, data) {

					if (isSuccess) {
						lvm.roles = data;
					} else {

					}

				});
		}

		lvm.getAllRoles();

		lvm.removeCustomer = function (id) {
			$(".loader-background").css("display", "flex");

			var header = {};
			header[serverEndpoints.sessionToken] = authentication
				.getAdminSessionToken();

			var customerData = {};
			customerData[serverEndpoints.id] = id;
			// Get product list of portal
			datasource.getData(serverEndpoints.removecustomerUrl, customerData,
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

		lvm.getSearchedCustomers = function (searchString) {
			$(".loader-background").css("display", "flex");
			lvm.searchedCustomers = [];
			var requestData = {};
			var header = {};
			header[serverEndpoints.sessionToken] = authentication
				.getAdminSessionToken();
			requestData[serverEndpoints.searchData] = searchString;
			// Get product list of portal
			datasource.getData(serverEndpoints.getSearchedCustomersUrl,
				requestData, header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
					if (isSuccess) {
						
						lvm.searchedCustomers = data;
						if (lvm.searchedCustomers.length == 0) {
							lvm.diplsaySearchResult = false;
							lvm.noResultsFound = true;
						} else {
							lvm.diplsaySearchResult = true;
							lvm.noResultsFound = false;
						}

					}
				});
		}

		lvm.clearSearch = function () {
			lvm.searchQuery = "";
			lvm.diplsaySearchResult = false;
			lvm.noResultsFound = false;
		}

		lvm.getCustomerDetails = function (id) {
			navigation.routeTo(navigation.routes.CUSTOMERDETAILS, null, id);
		}

		lvm.updateCustomer = function (id) {
			navigation.routeTo(navigation.routes.UPDATECUSTOMER, null, id);
		}

		lvm.navigateToCustomersVisaDetails = function (id) {
			navigation.routeTo(navigation.routes.CUSTOMERVISADETAILS, null, id);
		}
		lvm.navigateToCustomersInterestDetails = function (id) {
			navigation.routeTo(navigation.routes.CUSTOMERINTERESTDETAILS, null,
				id);
		}
		lvm.navigateToCustomersFrequentFlyerDetails = function (id) {
			navigation.routeTo(navigation.routes.CUSTOMERFREQUENTFLYERDETAILS,
				null, id);
		}
		lvm.logOut = function () {
			authentication.setAdminSessionToken(null);
			authentication.setAdminId(null);
			navigation.routeTo(navigation.routes.LOGIN);
			location.reload();
		}

		lvm.getMonthBirthdays = function () {

			var header = {};
			header[serverEndpoints.sessionToken] = authentication
				.getAdminSessionToken();

			// Get product list of portal
			datasource.getData(serverEndpoints.getWeeksBirthDayUrl, null,
				header, function (isSuccess, data) {

					if (isSuccess) {
						lvm.birthdayCustomers = data;
					} else {

					}

				});
		}
		// lvm.getMonthBirthdays();
		lvm.getRolesByCustomerId = function (customerId) {

			var uploadData = {};
			uploadData[serverEndpoints.id] = customerId;

			// Get product list of portal
			datasource.getData(serverEndpoints.getRolesByCustomerIdUrl, uploadData,
				null, function (isSuccess, data) {

					if (isSuccess) {
						lvm.customerRoles = data;
						for(var i=0;i<lvm.customerRoles.length;i++){
							$("input[value='"+lvm.customerRoles[i].roleId+"']").prop('checked', true);
						}
						
					} else {

					}

				});
		}
		lvm.currentCustomerId=null;
		lvm.showRolesModel = function (customerId) {
			$('input:checkbox').removeAttr('checked');
			lvm.getRolesByCustomerId(customerId);
			lvm.currentCustomerId=customerId;

			
			$("#rolesModal").modal('show');
		}

		lvm.updateRoles = function () {
			var selected = [];
			$('#checkboxes input:checked').each(function () {
				selected.push($(this).attr('value'));
			});
			
			lvm.rolesList=[];
			
			for(var i=0;i<selected.length;i++){
				for(var j=0;j<lvm.roles.length;j++){
					
					if(Number(selected[i])==lvm.roles[j].id){
						lvm.roleObj={};
						lvm.roleObj.customerId=lvm.currentCustomerId;
						lvm.roleObj.roleName=lvm.roles[j].roleName;
						lvm.roleObj.roleId=lvm.roles[j].id;
						lvm.rolesList.push(lvm.roleObj);
					}
				}
			}

			var uploadData = {};
			uploadData[serverEndpoints.customerRolesMappings] = lvm.rolesList;

			var header = {};
			header[serverEndpoints.sessionToken] = authentication
				.getAdminSessionToken();

			// Get product list of portal
			datasource.getData(serverEndpoints.assignRolesToUserUrl, uploadData,
				header, function (isSuccess, data) {

					if (isSuccess) {
						$("#rolesModal").modal('hide');
					} else {

					}

				});
			
		}


	}


	console.log("customerController()---->End");
})();