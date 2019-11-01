<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<base href="/">
<%
String appVersion= "3";

%>

<meta charset="ISO-8859-1">
<title>Insert title here</title>

<link rel="stylesheet" href="angularjs/libs/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="angularjs/css/login-form.css">

<script>
    var appVersion = "<%=appVersion%>";

    var globalPatientNo =<%=request.getAttribute("patientNo") %>


</script>
</head>
<body  ng-app="myApp" ng-controller="superadminlogin as lvm">


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
	<p style="color: red">{{lvm.message}}</p>	
	<button type="submit" class="btn btn-default" ng-click="lvm.superadminlogin()">Submit</button>
</div>
<script src="angularjs/libs/angular.min.js"></script>

 <script>
		var app = angular.module('myApp', []);
        app.controller('superadminlogin', function ($scope, serverEndpoints, datasource, strings,navigation,authentication) {
            var lvm = this;
            
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
        });
    </script>

<!-- Bootstrap -->
	
	<script type="text/javascript"
		src="angularjs/libs/bootstrap/jquery.min.js"></script>
	<script type="text/javascript"
		src="angularjs/libs/bootstrap/bootstrap.min.js"></script>    
    
    <script type="text/javascript" src="angularjs/libs/bootstrap/jquery.min.js"></script>
<script type="text/javascript" src="angularjs/libs/bootstrap/bootstrap.min.js"></script>
<script src="angularjs/libs/custom-jquery.js"></script>
<script type="text/javascript" src="angularjs/strings/strings.js?v=<%=appVersion%>"></script>
<!-- Server Endpoints -->
<script type="text/javascript" src="angularjs/server-endpoints/server-endpoints.js?v=<%=appVersion%>"></script>
<!-- Angular Services -->
<script type="text/javascript" src="angularjs/services/datasource-service.js?v=<%=appVersion%>"></script>
<script type="text/javascript" src="angularjs/services/popups-service.js?v=<%=appVersion%>"></script>
<script type="text/javascript" src="angularjs/services/navigation-service.js?v=<%=appVersion%>"></script>
<script type="text/javascript" src="angularjs/services/authentication-service.js?v=<%=appVersion%>"></script>

<script type="text/javascript" src="angularjs/server-endpoints/server-endpoints.js?v=<%=appVersion%>"></script>



</body>
</html>