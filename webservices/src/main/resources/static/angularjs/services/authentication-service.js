/*
 * Service to manage authentication activities
 */
app.service('authentication',
		function(navigation) {
			var adminSessionToken = localStorage.adminSessionToken;
			var customerSessionToken = localStorage.customerSessionToken;
			var adminId = localStorage.adminId;
			var customerId = localStorage.customerId;
			var customerType = localStorage.customerType;

			var authToken = localStorage.npAuthToken;
			var userId = localStorage.npUserId;

			var userType = localStorage.userType;

			var superAdminSessionToken = localStorage.superAdminSessionToken;
			var superAdminId = localStorage.superAdminId;

			var customerName = localStorage.customerName;
			var adminName = localStorage.adminName;
			
			var getCustomerName = function() {
				customerName = localStorage.customerName;

				if (customerName != null
						&& customerName != "null") {
					return customerName;
				} else {

					return null;
				}
			}

			var setCustomerName = function(vAuthToken) {
				customerName = vAuthToken;
				localStorage.customerName = customerName;
			}
			
			var getAdminName = function() {
				adminName = localStorage.adminName;

				if (adminName != null
						&& adminName != "null") {
					return adminName;
				} else {

					return null;
				}
			}

			var setAdminName = function(vAuthToken) {
				adminName = vAuthToken;
				localStorage.adminName = adminName;
			}
			
			var getSuperAdminSessionToken = function() {
				superAdminSessionToken = localStorage.superAdminSessionToken;

				if (superAdminSessionToken != null
						&& superAdminSessionToken != "null") {
					return superAdminSessionToken;
				} else {

					return null;
				}
			}

			var setSuperAdminSessionToken = function(vAuthToken) {
				superAdminSessionToken = vAuthToken;
				localStorage.superAdminSessionToken = superAdminSessionToken;
			}

			var getSuperAdminId = function() {
				superAdminId = localStorage.superAdminId;

				if (superAdminId != null && superAdminId != "null") {
					return superAdminId;
				} else {

					return null;
				}
			}

			var setSuperAdminId = function(vAuthToken) {
				superAdminId = vAuthToken;
				localStorage.superAdminId = superAdminId;
			}

			var getAuthToken = function() {
				authToken = localStorage.npAuthToken;

				if (authToken != null && authToken != "null") {
					return authToken;
				} else {
					navigation.routeTo(navigation.routes.LOGIN);
					return null;
				}
			}

			var setAuthToken = function(vAuthToken) {
				authToken = vAuthToken;
				localStorage.npAuthToken = authToken;
			}

			var getUserType = function() {
				userType = localStorage.userType;

				if (userType != null && userType != "null") {
					return userType;
				} else {

					return null;
				}
			}

			var setUserType = function(vAuthToken) {
				userType = vAuthToken;
				localStorage.userType = userType;
			}

			var getAdminSessionToken = function() {
				adminSessionToken = localStorage.adminSessionToken;

				if (adminSessionToken != null && adminSessionToken != "null") {
					return adminSessionToken;
				} else {
					navigation.routeTo(navigation.routes.LOGIN);
					return null;
				}
			}

			var setAdminSessionToken = function(vAdminSessionToken) {
				adminSessionToken = vAdminSessionToken;
				localStorage.adminSessionToken = adminSessionToken;
			}

			var getCustomerId = function() {
				customerId = localStorage.customerId;

				if (customerId != null && customerId != "null") {
					return customerId;
				} else {

					return null;
				}
			}

			var setCustomerId = function(vAdminSessionToken) {
				customerId = vAdminSessionToken;
				localStorage.customerId = customerId;
			}

			var getCustomerSessionToken = function() {
				customerSessionToken = localStorage.customerSessionToken;

				if (customerSessionToken != null
						&& customerSessionToken != "null") {
					return customerSessionToken;
				} else {
					// navigation.routeTo(navigation.routes.LOGIN);
					return null;
				}
			}

			var setCustomerSessionToken = function(vAdminSessionToken) {
				customerSessionToken = vAdminSessionToken;
				localStorage.customerSessionToken = customerSessionToken;
			}

			var getAdminId = function() {
				adminId = localStorage.adminId;

				if (adminId != null) {
					return adminId;
				} else {
					navigation.routeTo(navigation.routes.LOGIN, false);
					return null;
				}
			}

			var setAdminId = function(vAdminId) {
				adminId = vAdminId;
				localStorage.adminId = adminId;
			}
			var getUserId = function() {
				userId = localStorage.npUserId;

				if (userId != null) {
					return userId;
				} else {
					navigation.routeTo(navigation.routes.LOGIN, false);
					return null;
				}
			}

			var setUserId = function(vUserId) {
				userId = vUserId;
				localStorage.npUserId = vUserId;
			}

			var changeLoginLinkStateListener = null;

			var setChangeLoginLinkState = function(listener) {
				changeLoginLinkStateListener = listener;
			}

			var changeLoginLinkState = function(isLoggedIn) {
				if (changeLoginLinkStateListener != null) {
					changeLoginLinkStateListener(isLoggedIn);
				}
			}

			var isAuthenticated = function() {
				adminSessionToken = localStorage.adminSessionToken;

				if (adminSessionToken == null || adminSessionToken == "null") {
					return false;
				} else {
					return true;
				}
			}
			
			var getCustomerType = function() {
				customerType = localStorage.customerType;

				if (customerType != null) {
					return customerType;
				} else {
					
					return null;
				}
			}

			var setCustomerType = function(VcustomerType) {
				customerType = VcustomerType;
				localStorage.customerType = customerType;
			}
			

			return {
				getAuthToken : getAuthToken,
				setAuthToken : setAuthToken,
				getUserId : getUserId,
				setUserId : setUserId,
				setChangeLoginLinkState : setChangeLoginLinkState,
				changeLoginLinkState : changeLoginLinkState,
				isAuthenticated : isAuthenticated,
				getAdminSessionToken : getAdminSessionToken,
				setAdminSessionToken : setAdminSessionToken,
				getAdminId : getAdminId,
				setAdminId : setAdminId,
				getUserType : getUserType,
				setCustomerSessionToken : setCustomerSessionToken,
				getCustomerSessionToken : getCustomerSessionToken,
				setCustomerId : setCustomerId,
				getCustomerId : getCustomerId,
				getSuperAdminSessionToken : getSuperAdminSessionToken,
				setSuperAdminSessionToken : setSuperAdminSessionToken,
				getSuperAdminId : getSuperAdminId,
				setSuperAdminId : setSuperAdminId,
				getCustomerType:getCustomerType,
				setCustomerType:setCustomerType,
				setCustomerName:setCustomerName,
				getCustomerName:getCustomerName,
				setAdminName:setAdminName,
				getAdminName:getAdminName
			}
		});
