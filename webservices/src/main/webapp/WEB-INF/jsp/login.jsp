<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="crmlogin" ng-controller="loginController as lvm">
<head>
<base href="/golfcrm/">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script
	src="angularjs/libs/angular.min.js"></script>
	<script
	src="js/Controllers/login-controller.js"></script>
</head>
<body>
<div class="login-form-container">
	<div class="form-group">
		<label for="email">Email:</label> <input type="email"
			class="form-control" id="email" placeholder="Enter email"
			name="email" ng-model="lvm.emailId">
	</div>
	<div class="form-group">
		<label for="pwd">Password:</label> <input type="password"
			class="form-control" id="pwd" placeholder="Enter password" name="pwd" ng-model="lvm.password">
	</div>

	<button type="submit" class="btn btn-default" ng-click="lvm.login()">Submit</button>
</div>
<link rel="stylesheet" href="angularjs/css/login-form.css">
<!-- Bootstrap -->
	<link rel="stylesheet"
		href="angularjs/libs/bootstrap/bootstrap.min.css">
	<script type="text/javascript"
		src="angularjs/libs/bootstrap/jquery.min.js"></script>
	<script type="text/javascript"
		src="angularjs/libs/bootstrap/bootstrap.min.js"></script>
</body>
</html>