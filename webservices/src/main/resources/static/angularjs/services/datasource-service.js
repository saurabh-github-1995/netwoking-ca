/*
 * Service to fetch data from data source
 */
app
		.service(
				'datasource',
				function($http, strings, serverEndpoints,authentication,navigation) {

					/*
					 * Fetch data from data source
					 */
					var makeHttpCall = function(vUrl, vMethod, vData, vHeaders) {

						return $http({
							method : vMethod,
							url : vUrl,
							data : vData,
							headers : vHeaders,
							cache : true
						});
					};

					var getData = function(url, requestData, requestHeaders,
							handler) {

						var fullAddress = "";

						fullAddress = serverEndpoints.baseUrl + url;

						makeHttpCall(fullAddress, dataFetchMethod.POST,
								requestData, requestHeaders)
								.then(
										function(response) {

											if (response != null
													&& response.data != null) {
												var operationStatus = response.data[serverEndpoints.operationStatus];

												if (operationStatus == STATUS.OPERATIONSUCCESSFULL) {
													var resultSet = response.data[serverEndpoints.resultSet];
													handler(true, resultSet);
												} else {
													handler(
															false,
															getErrorMessageForOperationStatusCode(operationStatus));
												}
											} else {
												handler(false, null);
											}

										}, function(response) {
											handler(false, "Network error!");
										});
					}

					/*
					 * File upload
					 */
					var updateFile = function(file, fileId, vAuthToken, handler) {
						var fd = new FormData();
						var uploadUrl = serverEndpoints.baseUrl;
						fd.append(serverEndpoints.fileContent, file);

						if (fileId != null) {
							fd.append(serverEndpoints.fileId, fileId);
							uploadUrl = uploadUrl
									+ serverEndpoints.updateFileUrl;
						} else {
							uploadUrl = uploadUrl
									+ serverEndpoints.uploadFileUrl;
						}

						var vHeaders = {};
						vHeaders[serverEndpoints.authToken] = vAuthToken;
						vHeaders[serverEndpoints.contentType] = undefined;

						return $http
								.post(uploadUrl, fd, {
									transformRequest : angular.identity,
									headers : vHeaders
								})
								.then(
										function(response) {

											if (response != null
													&& response.data != null) {
												var operationStatus = response.data[serverEndpoints.operationStatus];

												if (operationStatus == STATUS.OPERATIONSUCCESSFULL) {
													var resultSet = response.data[serverEndpoints.resultSet];
													handler(true, resultSet);
												} else {
													handler(
															false,
															getErrorMessageForOperationStatusCode(operationStatus));
												}
											} else {
												handler(false, null);
											}

										}, function(response) {
											handler(false, "Network error!");
										});
					};
					
					var httpCallFormData = function (url, formData, header, handler) {

						if (header == null) {
							header = {};
						}
						header[serverEndpoints.contentType] = undefined;

						return $http
							.post(serverEndpoints.baseUrl + url, formData, {
								transformRequest: angular.identity,
								headers: header
							})
							.then(
								function (response) {
									console.log(response);

									if (response != null
										&& response.data != null) {
										var operationStatus = response.data[serverEndpoints.operationStatus];

										if (operationStatus == STATUS.OPERATIONSUCCESSFULL) {
											var resultSet = response.data[serverEndpoints.resultSet];
											handler(true, resultSet);
										} else {
											handler(false, operationStatus);
										}
									} else {
										handler(false, STATUS.UNKNOWNERROR);
									}

								}, function (response) {
									handler(false, STATUS.NETWORKERROR);
								});
					};

					/*
					 * Data Fetch Method ENUM
					 */
					var dataFetchMethod = {
						GET : 'GET',
						POST : 'POST'
					};

					/*
					 * Operation status
					 */

					var STATUS = {
						OPERATIONSUCCESSFULL : 1,
						ADMINNOTLOGGEDIN : -3,
						WRONGCREDENTIALS : -2,
						WRONGCUSTOMERCREDENTIALS : -6,
						CUSTOMERNOTLOGGEDIN:-7,
						UNKNOWNERROR: -1,
					};

					var getErrorMessageForOperationStatusCode = function(
							operationStatusCode) {
						if (operationStatusCode == STATUS.USEREMAILALREADYEXIST) {
							return strings.msg_emailid_already_exists;
						} else if (operationStatusCode == STATUS.ADMINNOTLOGGEDIN) {
							return strings.msg_admin_not_logged_in;
						} else if (operationStatusCode == STATUS.WRONGCREDENTIALS) {
							return strings.msg_wrong_admin_credential;
						} else if (operationStatusCode == STATUS.WRONGCUSTOMERCREDENTIALS) {
							return strings.msg_wrong_admin_credential;
						} else if (operationStatusCode == STATUS.UNKNOWNERROR) {
							return strings.msg_unknown_error;
						}  else if (operationStatusCode == STATUS.CUSTOMERNOTLOGGEDIN) {
							authentication.setCustomerSessionToken(null);
							authentication.setCustomerId(null);
							window.location=navigation.routes.CUSTOMERLOGIN;
						} else {
							return strings.msg_unknown_error;
						}
					};

					return {
						getData : getData,
						updateFile : updateFile,
						httpCallFormData:httpCallFormData
					}
				});