<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="/crm/">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Insert title here</title>
<link rel="stylesheet" href="css/app.css">
<link rel="stylesheet" href="css/header.css">
<link rel="manifest" href="manifest.json">
<link href="https://fonts.googleapis.com/css?family=Libre+Franklin"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
	integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
	crossorigin="anonymous">
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.js"></script>
<script src="js/Controllers/customer-controller.js"></script>

<script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js"></script>

  <!-- Add Firebase products that you want to use -->

  <script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/6.3.3/firebase-messaging.js"></script>

</head>
<body>
	<div class="header">
		<div>
			<h1 class="h1-marging-0px">CRM</h1>
		</div>
		<div class="display-flex-align-items-centre">
			<i class="fas fa-user font-size-40px padding-5px"></i>
			<p class="p-margin-0px">Log out</p>
		</div>
	</div>
	<div class="sidebar-panel">
		<div class="sidebar-panel-items">
			<i class="fas fa-user-plus"></i> Register Customer
		</div>
		<div class="sidebar-panel-items">
			<i class="fas fa-users"></i> All Customers
		</div>
	</div>