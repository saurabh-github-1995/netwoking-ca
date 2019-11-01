/*
 * Navigation service
 */
app.service('navigation', function($location, $window) {

	var transitionData = null;
	var navigationStack = [];

	/*
	 * Function to fetch transition data
	 */
	var getTransitionData = function() {

		var data = transitionData;
		transitionData = null;
		return data;
	}

	/*
	 * Distroy screen
	 */
	var destroyScreen = function(route, data) {
		transitionData = data;

		if (navigationStack.length >= 1) {
			$window.history.back();
		} else {
			routeTo(route, false, data);
		}

	}

	/*
	 * This function will route page to specified path
	 */
	var routeTo = function(route, keepHistory, data) {

		if (keepHistory == null || keepHistory) {
			$location.path("/" + route);
			navigationStack.push(route);
		} else {
			$location.path("/" + route).replace();
			navigationStack.pop();
			navigationStack.push(route);
		}

		transitionData = data;
	};

	/*
	 * Routes keys
	 */
	var routes = {
		HOME : "",
		LOGIN : "login",
		UPDATECUSTOMER : "updateCustomer",
		REGISTERCUSTOMER : "registerCustomer",
		CUSTOMERDETAILS : "customerdetails",
		CUSTOMERVISADETAILS : "customerVisaDetails",
		CUSTOMERINTERESTDETAILS : "customerInterestsDetails",
		CUSTOMERFREQUENTFLYERDETAILS : "customerFrequentFlyerDetails",
		ALLCUSTOMERS : "allcustomers",
		CUSTOMERLOGIN : "customerlogin",
		PVTCUSTOMERDETAILS : "pvtcustomerdetails",
		UPDATEADMIN : "addadmin",
		ALLADMINS : "alladmins",
		OWNENQUIRIES:"ownEnquiries",
		OPHEADENQUIRIES:"op-head-enquiries",
		UPDATEENQUIRY:"updateEnquiry",
		ADDENQUIRY:"addEnquiry",
		OPERATIONEQNUIRIES:"operationenquiries",
		UPDATECONSUMER:"registerConsumer",
		ALLCONSUMER:"allConsumer",
		UPDATEPACKAGE:"updatepackage",
		DASHBOARD:"dashboard",
		PACKAGES:"packages",
		USERLOGIN:"userlogin",
		CREATENEWPACKAGE:"createnewpackage",
		CUSTOMERPACKAGES:"customer-packages",
		ALLQUERIES	:"allqueries",
		OPEN:"open"
	};

	return {
		routeTo : routeTo,
		routes : routes,
		getTransitionData : getTransitionData,
		destroyScreen : destroyScreen
	}

});
