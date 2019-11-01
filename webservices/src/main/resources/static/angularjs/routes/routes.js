/**
 * App routes
 */

app.config(function($routeProvider, $locationProvider) {
	
	$routeProvider.when('/', {
		templateUrl : 'angularjs/partial_views/customers.html?v='+appVersion,
		controller : 'customerController',
		controllerAs : 'lvm'
	}).when('/dashboard', {
		templateUrl : 'angularjs/partial_views/customers.html?v='+appVersion,
		controller : 'customerController',
		controllerAs : 'lvm'
	}).when('/registerCustomer', {
		templateUrl : 'angularjs/partial_views/updateCustomer.html?v='+appVersion,
		controller : 'updateCustomerController',
		controllerAs : 'lvm'
	}).when('/updateCustomer', {
		templateUrl : 'angularjs/partial_views/updateCustomer.html?v='+appVersion,
		controller : 'updateCustomerController',
		controllerAs : 'lvm'
	}).when('/customerdetails', {
		templateUrl : 'angularjs/partial_views/customerdetails.html?v='+appVersion,
		controller : 'customerDetailsController',
		controllerAs : 'lvm'
	}).when('/login', {
		templateUrl : 'angularjs/partial_views/login.html?v='+appVersion,
		controller : 'loginController',
		controllerAs : 'lvm'
	}).when('/customerVisaDetails', {
		templateUrl : 'angularjs/partial_views/customerVisa.html?v='+appVersion,
		controller : 'customerVisaController',
		controllerAs : 'lvm'
	}).when('/uploadCustomers', {
		templateUrl : 'angularjs/partial_views/uploadCustomers.html?v='+appVersion,
		controller : 'uploadCustomers',
		controllerAs : 'lvm'
	}).when('/customerlogin', {
		templateUrl : 'angularjs/partial_views/customerlogin.html?v='+appVersion,
		controller : 'loginController',
		controllerAs : 'lvm'
	}).when('/allcustomers', {
		templateUrl : 'angularjs/partial_views/customer_allcustomers.html?v='+appVersion,
		controller : 'customerAllCUstomers',
		controllerAs : 'lvm'
	}).when('/pvtcustomerdetails', {
		templateUrl : 'angularjs/partial_views/pvt_customerdetails.html?v='+appVersion,
		controller : 'pvtcustomerDetailsController',
		controllerAs : 'lvm'
	}).when('/alladmins', {
		templateUrl : 'angularjs/partial_views/alladmins.html?v='+appVersion,
		controller : 'alladminsController',
		controllerAs : 'lvm'
	}).when('/addadmin', {
		templateUrl : 'angularjs/partial_views/addadmin.html?v='+appVersion,
		controller : 'addadminController',
		controllerAs : 'lvm'
	}).when('/enquiries', {
		templateUrl : 'angularjs/partial_views/enquiries.html?v='+appVersion,
		controller : 'enquiriesController',
		controllerAs : 'lvm'
	}).when('/addEnquiry', {
		templateUrl : 'angularjs/partial_views/update-enquiries.html?v='+appVersion,
		controller : 'updateEnquiriesController',
		controllerAs : 'lvm'
	}).when('/updateEnquiry', {
		templateUrl : 'angularjs/partial_views/update-enquiries.html?v='+appVersion,
		controller : 'updateEnquiriesController',
		controllerAs : 'lvm'
	}).when('/op-head-enquiries', {
		templateUrl : 'angularjs/partial_views/op-head-enquiries.html?v='+appVersion,
		controller : 'opHeadEnquiriesController',
		controllerAs : 'lvm'
	}).when('/ownEnquiries', {
		templateUrl : 'angularjs/partial_views/ownEnquiries.html?v='+appVersion,
		controller : 'customerOwnEnquiriesController',
		controllerAs : 'lvm'
	}).when('/operationenquiries', {
		templateUrl : 'angularjs/partial_views/operationenquiries.html?v='+appVersion,
		controller : 'operationenquiries',
		controllerAs : 'lvm'
	}).when('/registerConsumer', {
		templateUrl : 'angularjs/partial_views/updateConsumers1.html?v='+appVersion,
		controller : 'updateConsumerController',
		controllerAs : 'lvm'
	}).when('/allConsumer', {
		templateUrl : 'angularjs/partial_views/consumer_allconsumer.html?v='+appVersion,
		controller : 'consumerAllConsumers',
		controllerAs : 'lvm'
	}).when('/createnewpackage', {
		templateUrl : 'angularjs/partial_views/add-update-package.html?v='+appVersion,
		controller : 'addUpdatePackageController',
		controllerAs : 'lvm'
	}).when('/packages', {
		templateUrl : 'angularjs/partial_views/packages.html?v='+appVersion,
		controller : 'packagesController',
		controllerAs : 'lvm'
	}).when('/updatepackage/:packagename', {
		templateUrl : 'angularjs/partial_views/add-update-package.html?v='+appVersion,
		controller : 'addUpdatePackageController',
		controllerAs : 'lvm'
	}).when('/adminpackages', {
		templateUrl : 'angularjs/partial_views/adminpackages.html?v='+appVersion,
		controller : 'adminPackagesController',
		controllerAs : 'lvm'
	}).when('/customer-packages', {
		templateUrl : 'angularjs/partial_views/customerpackages.html?v='+appVersion,
		controller : 'customerPackagesController',
		controllerAs : 'lvm'
	}).when('/allqueries', {
		templateUrl : 'angularjs/partial_views/ownQueries11.html?v='+appVersion,
		controller : 'allOwnQueriesController',
		controllerAs : 'lvm'
	}).when('/allqueries/open/:queryId', {
		templateUrl : 'angularjs/partial_views/ownQueries11.html?v='+appVersion,
		controller : 'allOwnQueriesController',
		controllerAs : 'lvm'
	}).when('/superadminlogin', {
		templateUrl : 'angularjs/partial_views/superadminlogin.html?v='+appVersion,
		controller : 'loginController',
		controllerAs : 'lvm'
	});

	
	

	$locationProvider.html5Mode(true);
});