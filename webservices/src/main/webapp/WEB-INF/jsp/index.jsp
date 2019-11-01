<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String appVersion = "67";
	String packageName = null; 
	if (request.getAttribute("packagename") != null) {
		 packageName = request.getAttribute("packagename").toString();
	}
%>
<script>
	var appVersion = "<%=appVersion%>";
	var packageName="<%=packageName%>";
</script>
<html ng-app="crmapp" ng-controller="appController as lvm">
<head>
<base href="/">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Insert title here</title>
<link rel="manifest" href="manifest.json">
<link rel="stylesheet"
	href="angularjs/libs/font-awesome-4.7.0/css/font-awesome.css">
	
	
	<script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js"></script>

  <!-- Add Firebase products that you want to use -->

  <script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-messaging.js"></script>

<script>
            //// Give sometime for anguar processing
            //document.body.style.display="none";
            //setTimeout(function(){
            //	document.body.style.display="block";
            //}, 5000);
           <%--  var appVersion = "<%=appVersion%>"; --%>

            function appInitialisation() {
                setTimeout(function() {
                    document.body.style.display = "block";
                }, 500);
            }
        </script>

<!-- <link href="https://fonts.googleapis.com/css?family=Libre+Franklin"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
	integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
	crossorigin="anonymous"> -->
<script src="angularjs/libs/angular.min.js"></script>
<script type="text/javascript" src="angularjs/libs/angular-route.min.js"></script>
<!-- <script src="js/Controllers/customer-controller.js"></script> -->
</head>
<body ng-cloak onload="appInitialisation()">
	<div class="loader-background">
		<img src="angularjs/images/loader.gif" class="loader-image">
	</div>
	<div class="header">
		<div class="display-flex-align-items-centre">
			<span
				class="glyphicon glyphicon-menu-hamburger navigation-bar-hamburger"
				id="navbar"></span>
			<h1 class="h1-marging-0px">CRM</h1>
		</div>
		<div class="display-flex-align-items-centre">
			<h4 style="padding: 0px 20px;">{{$root.adminName}}</h4>
			<i class="fa fa-user-o font-size-40px padding-5px "></i>
			<p class="p-margin-0px" ng-click="lvm.logOut()"
				style="cursor: pointer;">Log out</p>
		</div>
	</div>
	<div class="flex-container">
		<div class="sidebar-panel" id="sidebar-panel" style="display: none">

			<div class="sidebar-panel-items " id="allCustomers">
				<a href="dashboard"><i class="fa fa-users padding-right-5px"></i>
					ALL USERS</a>
			</div>
			<div class="sidebar-panel-items " id="customerRegistrations">
				<a href="registerCustomer"><i
					class="fa fa-user-plus padding-right-5px"></i> REGISTER USER</a>
			</div>
			<div class="sidebar-panel-items " id="customerRegistrations">
				<a href="adminpackages"><i
					class="fa fa-user-plus padding-right-5px"></i> PACKAGES</a>
			</div>
			<!-- <div class="sidebar-panel-items " id="customerUploads">
				<a href="uploadCustomers"><i
					class="fa fa-cloud-upload padding-right-5px"></i> Upload Customers</a>
			</div> -->

		</div>
		<div ng-view style="width: 100%;" ></div>

	</div>
	<div class="footer"></div>

	<!-- CSS -->
	<link rel="stylesheet"
		href="angularjs/css/package.css?v=<%=appVersion%>">
	<link rel="stylesheet" href="angularjs/css/app.css?v=<%=appVersion%>">
	<link rel="stylesheet"
		href="angularjs/css/header.css?v=<%=appVersion%>">
	<link rel="stylesheet"
		href="angularjs/css/update-form.css?v=<%=appVersion%>">
	<link rel="stylesheet"
		href="angularjs/css/style.css?v=<%=appVersion%>">



	<!-- Bootstrap -->
	<link rel="stylesheet"
		href="angularjs/libs/bootstrap/bootstrap.min.css">
	<script type="text/javascript"
		src="angularjs/libs/bootstrap/jquery.min.js"></script>
	<script type="text/javascript"
		src="angularjs/libs/bootstrap/bootstrap.min.js"></script>
	<script src="angularjs/libs/custom-jquery.js"></script>
	<!-- Angular module -->
	<script src="angularjs/modules/app.js?v=<%=appVersion%>"></script>
	<!-- Angular Routes -->
	<script type="text/javascript"
		src="angularjs/routes/routes.js?v=<%=appVersion%>"></script>
	<!-- Strings -->
	<script type="text/javascript"
		src="angularjs/strings/strings.js?v=<%=appVersion%>"></script>
	<!-- Server Endpoints -->
	<script type="text/javascript"
		src="angularjs/server-endpoints/server-endpoints.js?v=<%=appVersion%>"></script>
	<!-- Angular Services -->
	<script type="text/javascript"
		src="angularjs/services/datasource-service.js?v=<%=appVersion%>"></script>
	<script type="text/javascript"
		src="angularjs/services/datasource-service.js?v=<%=appVersion%>"></script>
	<script type="text/javascript"
		src="angularjs/services/navigation-service.js?v=<%=appVersion%>"></script>
	<script type="text/javascript"
		src="angularjs/services/authentication-service.js?v=<%=appVersion%>"></script>
	<script type="text/javascript"
		src="angularjs/services/navigation-drawer-setup-service.js?v=<%=appVersion%>"></script>

	<!-- Angular Controllers -->
	<Script src="angularjs/controller/app-controller.js?v=<%=appVersion%>"></Script>
	<Script
		src="angularjs/controller/customers-controllers.js?v=<%=appVersion%>"></Script>
	<Script
		src="angularjs/controller/update-customer-controller.js?v=<%=appVersion%>"></Script>
	<Script
		src="angularjs/controller/login-controller.js?v=<%=appVersion%>"></Script>
	<Script
		src="angularjs/controller/customer-details-controller.js?v=<%=appVersion%>"></Script>
	<Script
		src="angularjs/controller/customer-visa-controller.js?v=<%=appVersion%>"></Script>
	<Script
		src="angularjs/controller/upload-customers-excel.js?v=<%=appVersion%>"></Script>

	<Script
		src="angularjs/controller/add-update-package-controller.js?v=<%=appVersion%>"></Script>
	<Script
		src="angularjs/controller/packages-controller.js?v=<%=appVersion%>"></Script>
	<Script
		src="angularjs/controller/admin-packages-controller.js?v=<%=appVersion%>"></Script>





	<!-- Angular serverEnpoints -->
	<script type="text/javascript"
		src="angularjs/server-endpoints/server-endpoints.js?v=<%=appVersion%>"></script>

		<script>
		var firebaseConfig = {
		    apiKey: "AIzaSyDJ7Cf4kMzLS4Jc-PcfYD4jinAREZEzc0s",
		    authDomain: "automentum-b55dd.firebaseapp.com",
		    databaseURL: "https://automentum-b55dd.firebaseio.com",
		    projectId: "automentum-b55dd",
		    storageBucket: "automentum-b55dd.appspot.com",
		    messagingSenderId: "222615061761",
		    // appId: "1:222615061761:web:3912126ee7004419"
		  };
		  // Initialize Firebase
		  firebase.initializeApp(firebaseConfig);
		  
		  const messaging = firebase.messaging();
		  messaging.requestPermission()
		  .then(function(){
		      console.log('permission');
		     getRegisterToken();
		    // return messaging.getToken();
		  })
		  // .then(function(token){
		  // console.log(token);
		  // })
		  .catch(function(err){
		    console.log('Error Occured');
		  })

		  // Get Instance ID token. Initially this makes a network call, once
			// retrieved
		// subsequent calls to getToken will return from cache.

		function getRegisterToken(){
		  messaging.getToken().then((currentToken) => {
		    if (currentToken) {
		      console.log(currentToken);
		      sendTokenToServer(currentToken);
		      
		      // updateUIForPushEnabled(currentToken);
		    } else {
		      // Show permission request.
		      console.log('No Instance ID token available. Request permission to generate one.');
		      // Show permission UI.
		      // updateUIForPushPermissionRequired();
		      setTokenSentToServer(false);
		    }
		  }).catch((err) => {
		    console.log('An error occurred while retrieving token. ', err);
		    // showToken('Error retrieving Instance ID token. ', err);
		    setTokenSentToServer(false);
		  });
		}
		function setTokenSentToServer(sent) {
		  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
		}

		function sendTokenToServer(currentToken) {
		  if (!isTokenSentToServer()) {
		    console.log('Sending token to server...');
		    // TODO(developer): Send the current token to your server.
		    setTokenSentToServer(true);
		  } else {
		    console.log('Token already sent to server so won\'t send it again ' +
		        'unless it changes');
		  }
		}
		function isTokenSentToServer() {
		  return window.localStorage.getItem('sentToServer') === '1';
		}

		/* messaging.onMessage((payload) => {
		 
		  console.log('Message received. ', payload);
		  // ...
		}); */


		</script>