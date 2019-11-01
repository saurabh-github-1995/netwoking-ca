<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String appVersion = "47";
%>
<script>
	var appVersion = "<%=appVersion%>";
</script>
<html ng-app="crmapp" ng-controller="appController as lvm">
<head>
<base href="/">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Insert title here</title>
<link rel="stylesheet" href="angularjs/libs/font-awesome-4.7.0/css/font-awesome.css">



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
<body >
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
			<i class="fa fa-user-o font-size-40px padding-5px "></i>
			<p class="p-margin-0px" style=" cursor:pointer ;" ng-click="lvm.logOutSuperAdmin()">Log out</p>
		</div>
	</div>
	<div class="flex-container">
		<div class="sidebar-panel" 
			id="sidebar-panel" style="display: none">

			
			<div class="sidebar-panel-items " id="customerRegistrations">
				<a href="alladmins"><i
					class="fa fa-user-plus padding-right-5px"></i> Admin's</a>
			</div>
			

		</div>
		<div ng-view style="width: 100%; overflow-y: scroll;"></div>

	</div>
	<div class="footer"></div>

	<!-- CSS -->
	<link rel="stylesheet" href="angularjs/css/app.css?v=<%=appVersion%>">
	<link rel="stylesheet" href="angularjs/css/header.css?v=<%=appVersion%>">
	<link rel="stylesheet" href="angularjs/css/update-form.css?v=<%=appVersion%>">
	<link rel="stylesheet" href="angularjs/css/add-form.css?v=<%=appVersion%>">



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
	<script type="text/javascript" src="angularjs/routes/routes.js?v=<%=appVersion%>"></script>
	<!-- Strings -->
	<script type="text/javascript" src="angularjs/strings/strings.js?v=<%=appVersion%>"></script>
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
	<Script src="angularjs/controller/customers-controllers.js?v=<%=appVersion%>"></Script>
	<Script src="angularjs/controller/update-customer-controller.js?v=<%=appVersion%>"></Script>
	<Script src="angularjs/controller/login-controller.js?v=<%=appVersion%>"></Script>
	<Script src="angularjs/controller/customer-details-controller.js?v=<%=appVersion%>"></Script>
	<Script src="angularjs/controller/customer-visa-controller.js?v=<%=appVersion%>"></Script>
	<Script src="angularjs/controller/upload-customers-excel.js?v=<%=appVersion%>"></Script>
	<Script src="angularjs/controller/alladmins-controller.js?v=<%=appVersion%>"></Script>
	<Script src="angularjs/controller/addadmin-controller.js?v=<%=appVersion%>"></Script>





	<!-- Angular serverEnpoints -->
	<script type="text/javascript"
		src="angularjs/server-endpoints/server-endpoints.js?v=<%=appVersion%>"></script>