app.controller("allOwnQueriesController", function ($scope, datasource,
	serverEndpoints, authentication, navigation, strings, $route, $window, $compile, $sce) {

	console.log("allOwnQueriesController()----> Start");
	var lvm = this;
	lvm.customers = [];
	lvm.searchedCustomers = [];
	
	$("#sidebar-panel").show();
	/*
	 * lvm.showBanner=true; $scope.$apply();
	 */
	lvm.showBanner = true;

	lvm.showAddEnquiryModal = function () {
		$("#AIRTICKET").modal('show');
	}

	lvm.showHideContentOnUserType = function () {
		var userType = parseInt(authentication.getCustomerType());
		if (userType == serverEndpoints.SALES ) {
			$(".enquiry-icon-container").css("display", "flex");
			
		} else if (userType == serverEndpoints.OPHEAD) {
			$(".enquiry-icon-container").css("display", "flex");
			$(".assignButton").css("display", "inline");
			/*$(".assignButton").css("display", "block");*/
		}
		
	}
	
	angular.element(document).ready(function () {
		lvm.showHideContentOnUserType();
		
	});

	lvm.createQuery = function () {

		$(".loader-background").css("display", "flex");

		var header = {};

		var uploadData = {};


		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		uploadData[serverEndpoints.queryData] = lvm.queryData;
		uploadData[serverEndpoints.status] = lvm.status;




		// Get product list of portal
		datasource.getData(serverEndpoints.registerNewQueryUrl, uploadData, header,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					$("#AIRTICKET").modal('hide');
					$route.reload();
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	lvm.getAllQueries = function () {

		$(".loader-background").css("display", "flex");

		var header = {};

		var uploadData = {};


		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		header[serverEndpoints.roleType] = authentication.getCustomerType();
		// Get product list of portal
		datasource.getData(serverEndpoints.getAllQueriesUrl, null, header,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.queries = data;
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}
	lvm.getAllQueries();

	lvm.currentQuery = null;
	
	lvm.showEditPanel = function (currentQuery) {
		//lvm.currentQuery = currentQuery;
		window.location.href=navigation.routes.ALLQUERIES+"/"+navigation.routes.OPEN+"/"+currentQuery.appQueries.id;
		//lvm.getQueryRemarksByQueryId(currentQuery.appQueries.id);
		

	}

	lvm.scrollToBottom = function (id) {
		
		var currentQueryDiv = document.getElementById(id+"-remarkDiv");
	
		console.log( currentQueryDiv.scrollHeight,"-------------------");
		currentQueryDiv.scrollTop = 5000;
		

	}
	$("#button").click(function() {
		
	});
	lvm.sendRemark = function (queryToBeUpdated,index) {

		$(".loader-background").css("display", "flex");

		var header = {};

		var uploadData = {};


		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		var appQueries = {};

		appQueries[serverEndpoints.queryData] = queryToBeUpdated.queryData;
		appQueries[serverEndpoints.status] = $("#remarkstatus_"+index).val();
		appQueries[serverEndpoints.createdBy] = queryToBeUpdated.createdBy;
		appQueries[serverEndpoints.id] = queryToBeUpdated.id;
		appQueries[serverEndpoints.appQueryNumber] = queryToBeUpdated.appQueryNumber;
		appQueries[serverEndpoints.createdByName] = queryToBeUpdated.createdByName;

		var appQueriesRemark = {};
		appQueriesRemark[serverEndpoints.nextActiondate] = $("#nextaction_"+index).val();
		appQueriesRemark[serverEndpoints.remark] = $("#remark_"+index).val();
		appQueriesRemark[serverEndpoints.status] = $("#remarkstatus_"+index).val();

		uploadData[serverEndpoints.appQueries] = appQueries;
		uploadData[serverEndpoints.appQueriesRemarks] = appQueriesRemark;

		// Get product list of portal
		datasource.getData(serverEndpoints.updateQueryRemarkUrl, uploadData, header,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					//lvm.currentQuery=data;
					lvm.nextActiondate = null;
					lvm.remark = "";
					lvm.remarkStatus = "";

				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}


	lvm.getRoleWiseCustomers = function () {

		$(".loader-background").css("display", "flex");

		var header = {};

		var uploadData = {};


		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		header[serverEndpoints.roleId] = serverEndpoints.OPERATION;
		// Get product list of portal
		datasource.getData(serverEndpoints.getRoleWiseCustomersUrl, null, header,
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

	lvm.getRoleWiseCustomers();

	lvm.currentQueryToMapped = null;
	lvm.showUsersModel = function (queryId) {
		lvm.currentQueryToMapped = queryId;
		lvm.getQueriesPreviousCustomersRoleWise();



	}

	lvm.mapQeryToCustomer = function () {
		$(".loader-background").css("display", "flex");
		lvm.currentUser = JSON.parse(lvm.selectedUSer);
		if(lvm.checkIfQueryAlreadyMapped(lvm.currentUser)){
			alert("This Query Is already assigned to customer");
			$("#customerModels").modal('hide');
			$(".loader-background").css("display", "none");
		}else{
			var header = {};

			var uploadData = {};
	
	
			header[serverEndpoints.queryId] = lvm.currentQueryToMapped;
			header[serverEndpoints.roleId] = serverEndpoints.OPERATION;
			header[serverEndpoints.customerId] = lvm.currentUser.id;
			// Get product list of portal
			datasource.getData(serverEndpoints.mappQueryToNormalCustomerUrl, null, header,
				function (isSuccess, data) {
					$(".loader-background").css("display", "none");
					if (isSuccess) {
	
						$("#customerModels").modal('hide');
					} else {
						if (data === strings.msg_admin_not_logged_in) {
							lvm.logOut();
	
						}
					}
				});
		}
		
	}
	
	

	lvm.getQueriesPreviousCustomersRoleWise = function () {

		//lvm.currentUser = JSON.parse(lvm.selectedUSer);

		$(".loader-background").css("display", "flex");

		var header = {};

		var uploadData = {};


		header[serverEndpoints.queryId] = lvm.currentQueryToMapped;
		header[serverEndpoints.roleId] = serverEndpoints.OPERATION;
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		// Get product list of portal
		datasource.getData(serverEndpoints.getQueriesPreviousCustomersRoleWiseUrl, null, header,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {

					lvm.previousMappedUsers = data;
					$("#customerModels").modal('show');
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}
	
	lvm.getQueryNotesByQueryId = function (id) {
			
		$(".loader-background").css("display", "flex");
	
			var header = {};
			var uploadData = {};
			header[serverEndpoints.queryId] = id;
			header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
			// Get product list of portal
			datasource.getData(serverEndpoints.getQueryNotesByQueryIdUrl, null, header,
				function (isSuccess, data) {
					$(".loader-background").css("display", "none");
					if (isSuccess) {
	
						lvm.currentQueryNotes = data;
						angular.element(document).ready(function () {
							   $("#"+id+"-notes").show();
							   setTimeout(function () {
								lvm.scrollBottom(id);
							}, 2000);
	  					 });
					/*	$(".data1").show();*/
					} else {
						if (data === strings.msg_admin_not_logged_in) {
							lvm.logOut();
	
						}
					}
				});
		}

	lvm.getQueryRemarksByQueryId = function (id) {

		
		var header = {};
		var uploadData = {};
		header[serverEndpoints.queryId] = id;
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		// Get product list of portal
		datasource.getData(serverEndpoints.getQueryRemarksByQueryIdUrl, null, header,
			function (isSuccess, data) {

				if (isSuccess) {

					lvm.currentQuery = data;
					lvm.getQueryNotesByQueryId(id);
					angular.element(document).ready(function () {
						$("#" + id).show();
						setTimeout(function () {
							lvm.scrollToBottom(id);
						}, 2000);
						
							$('html, body').animate({
								scrollTop: $("#"+globalQueryId+"-main-query").offset().top
							}, 2000);
						

						
					});
					  
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	messaging.onMessage((payload) => {

		console.log('Message received. ', payload);
		if (payload.data.body === lvm.currentQuery.appQueries.id) {
			lvm.getQueryRemarksByQueryId(payload.data.body);
		}
	});

	
	lvm.checkIfQueryAlreadyMapped=function(currentSelectedCustomer){
		
		for(var i=0;i<lvm.previousMappedUsers.length;i++){
			if(lvm.previousMappedUsers[i].id===currentSelectedCustomer.id){
				lvm.previousMappedUsers=true;
				return true;
				break;
			}
		}
	}
	if(globalQueryId!=null && globalQueryId!=='null'){
		lvm.getQueryRemarksByQueryId(globalQueryId);
	}
	
	
	lvm.currentQueryNotes=null; 
	lvm.scrollBottom = function (id) {
		var currentNotesDiv = document.getElementById(id+"-notesDiv");
		currentNotesDiv.scrollTop = currentNotesDiv.scrollHeight;
	}

	lvm.sendNotes = function (id) 
	{
		$(".loader-background").css("display", "flex");

		var header = {};

		var uploadData = {};

		header[serverEndpoints.queryId] = id;
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		uploadData[serverEndpoints.nextActiondate] = $("#"+id+"-note-date").val();
		uploadData[serverEndpoints.notes] = $("#"+id+"-note-input").val();
		
		
		// Get product list of portal
		datasource.getData(serverEndpoints.updateQueryNotesUrl, uploadData, header,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					
					lvm.nextActiondate = null;
					lvm.notes = "";
					lvm.getQueryNotesByQueryId(id);
					lvm.scrollBottom(id);
				
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}


	
	
	
	console.log("allOwnQueriesController()---->End");
})

app.filter('multiline', function ($sce) {
	return function (text) {
		var filtred = "";
		if (text != null) {
			filtred = $sce.trustAsHtml(text.replace(/\n/g, '<br>'));
		}
		
		return filtred;
	}
});


