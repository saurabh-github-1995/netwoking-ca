/**
 * Main controller
 */
app.controller("appController", function($scope, $http, $route, authentication,
		navigation, $rootScope) {
	console.log("appController()---->START");
	var lvm = this;
	lvm.showBanner = false;

	/*
	 * if(authentication.isAuthenticated()){ lvm.showBanner=true; }else {
	 * lvm.showBanner=false; navigation.routeTo(navigation.routes.LOGIN); }
	 * console.log("text"+lvm.showBanner);
	 */

	$rootScope.userName = authentication.getCustomerName();

	$rootScope.adminName = authentication.getAdminName();
	lvm.logOut = function() {
		authentication.setAdminSessionToken(null);
		authentication.setAdminId(null);
		navigation.routeTo(navigation.routes.LOGIN);
		/* location.reload(); */
	}
	lvm.customerLogOut = function() {
		authentication.setCustomerSessionToken(null);
		authentication.setCustomerId(null);
		window.location = navigation.routes.CUSTOMERLOGIN;
		/* location.reload(); */
	}
	lvm.logOutSuperAdmin = function() {
		authentication.setSuperAdminSessionToken(null);
		authentication.setSuperAdminId(null);
		window.location = "superadminlogin";

	}
	lvm.navigateToParticularEnquiries = function() {
		if (authentication.getCustomerType() == 4) {
			/* window.location.href = navigation.routes.OPHEADENQUIRIES; */

			navigation.routeTo(navigation.routes.OPHEADENQUIRIES, null, null);
		} else if (authentication.getCustomerType() == 1) {
			/* window.location.href = navigation.routes.OWNENQUIRIES; */
			navigation.routeTo(navigation.routes.OWNENQUIRIES, null, null);
		}
	}

	lvm.allCustomers = function() {
		navigation.routeTo(navigation.routes.ALLCONSUMER);

	}

	lvm.customerpackages = function() {
		navigation.routeTo(navigation.routes.CUSTOMERPACKAGES);
	}
	
	lvm.customerpackages = function() {
		navigation.routeTo(navigation.routes.CUSTOMERPACKAGES);
	}
	lvm.navigateToAllQueries = function() {
		navigation.routeTo(navigation.routes.ALLQUERIES);
	}





		function send(){
		  var settings = {
		    "async": true,
		    "crossDomain": true,
		    "url": "https://fcm.googleapis.com/fcm/send",
		    "method": "POST",
		    "headers": {
		      "Authorization": "key=AIzaSyCa0sTrSI5wGFps5log7PwEJJhhvFxK4ok",
		      "Content-Type": "application/json",
		      "User-Agent": "PostmanRuntime/7.15.2",
		      "Accept": "*/*",
		      "Cache-Control": "no-cache",
		      "Postman-Token": "a0bb5665-be61-45ee-b44c-100c4ef33ca3,8788d6b1-4a51-4704-81fd-1145cd13a236",
		      "Host": "fcm.googleapis.com",
		      "Accept-Encoding": "gzip, deflate",
		      "Content-Length": "471",
		      "Connection": "keep-alive",
		      "cache-control": "no-cache"
		    },
		    "processData": false,
		    "data": "{\r\n \"to\" : \"cO0l_w_r95Q:APA91bGN1zbdzjCJ4aqNrR0hfPByLeFPyOf8OGQy0vXUQnD5hdVzzrqpD0EYcVoz-ORIXGBje1zMeEK13wxvCsEDNsFJW2CGN4tVNHvtgQheRh3Xb6Nb8g4nROylDHX4VRqPVUDBkGjP\",\r\n \"collapse_key\" : \"type_a\",\r\n \"notification\" : {\r\n     \"body\" : \"Body\",\r\n     \"title\": \"Saurabh Devade\"\r\n },\r\n \"data\" : {\r\n     \"body\" : \"Body of Your Notification in Data\",\r\n     \"title\": \"Title of Your Notification in Title\",\r\n     \"key_1\" : \"Value for key_1\",\r\n     \"key_2\" : \"Value for key_2\"\r\n }\r\n}"
		  }
		  
		  $.ajax(settings).done(function (response) {
		    console.log(response);
		  });
		  }
		  
		  

	
	console.log("appController()---->END");
});