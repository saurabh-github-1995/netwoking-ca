app.controller("customerOwnEnquiriesController", function ($scope, datasource,
	serverEndpoints, authentication, navigation, strings, $route, $window, $compile) {

	console.log("customerOwnEnquiriesController()----> Start");
	var lvm = this;
	lvm.customers = [];
	lvm.searchedCustomers = [];

	$("#sidebar-panel").show();
	/*
	 * lvm.showBanner=true; $scope.$apply();
	 */
	lvm.showBanner = true;



	lvm.getAllAirports = function () {
		$(".loader-background").css("display", "flex");

		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		// Get product list of portal
		datasource.getData(serverEndpoints.getAllAirportsUrl, {}, null,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.airports = data;
					lvm.airportsForSearch = data;
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	lvm.getAllAirports();

	lvm.getAllCountries = function () {
		$(".loader-background").css("display", "flex");

		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		// Get product list of portal
		datasource.getData(serverEndpoints.getAllCountriesUrl, {}, null,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.countries = data;
					lvm.countriesForSearch = data;
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	lvm.getAllCountries();

	lvm.getOwnEnquiries = function () {
		$(".loader-background").css("display", "flex");

		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		// Get product list of portal
		datasource.getData(serverEndpoints.getEnquiriesCreatedBySalesUrl, {}, header,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.enquiries = data;

				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	lvm.getOwnEnquiries();

	lvm.navigateToUpdateEnquiry = function (id) {
		navigation.routeTo(navigation.routes.UPDATEENQUIRY, null, id);
	}
	lvm.navigateToAddEnquiry = function () {
		navigation.routeTo(navigation.routes.ADDENQUIRY, null, null);
	}

	lvm.enquiry = {};



	lvm.showAddEnquiryModal = function (modelName, modalId) {
		$("#" + modelName).modal('show');
		lvm.enquiry.serviceName = modelName;
		lvm.enquiry.serviceId = modalId;
	}

	lvm.selectJourneyType = function (type) {
		lvm.enquiry.journeyType = type;
		$("#oneWay").removeClass("selected");
		$("#roundTrip").removeClass("selected");
		$("#multiCity").removeClass("selected");
		$("#returnDate").removeClass('disabled');
		$("#returnDate").removeClass('display-none');

		$("#" + type).addClass("selected");

		if (type === "oneWay") {
			$("#returnDate").addClass('disabled');
			$("#addCity").addClass('display-none');
			lvm.removeMultiCityRows();

		} else if (type === "multiCity") {
			$("#returnDate").addClass('display-none');
			$("#addCity").removeClass('display-none');
		} else if (type === "roundTrip") {
			$("#addCity").addClass('display-none');
			lvm.removeMultiCityRows();
		}
	}

	var options = {
		shouldSort: true,
		threshold: 0.6,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 1,
		keys: [
			"airportName", "cityName", "citiCode", "code", "countryCode", "countryName"
		]
	};

	lvm.searchAirport = function (query) {

		if (query != undefined) {
			if (query === "") {
				lvm.airports = lvm.airportsForSearch;
			} else {
				var fuse = new Fuse(lvm.airports, options); // "list" is the item array
				lvm.airports = fuse.search(query);

			}

		} else {
			lvm.airports = lvm.airportsForSearch;
		}

	}
	lvm.fromJourney = false;
	lvm.toJourney = false;
	lvm.fromCityName = "Select City";
	lvm.fromAirportDetails = "";
	lvm.toCityName = "Select City";
	lvm.toAirportDetails = "";

	lvm.currentAirport = null;
	lvm.multicityAirports = [];
	lvm.setAirport = function (airport) {
		if (lvm.fromJourney == true) {

			lvm.fromCityName = airport.cityName;
			lvm.fromAirportDetails = airport.code + " , " + airport.airportName;

			lvm.enquiry.fromAirportAppId = airport.airportAppId;
			lvm.enquiry.fromAirportCode = airport.code;
			lvm.enquiry.fromAirportCity = airport.cityName;
			lvm.enquiry.fromAirportName = airport.airportName;
		} else if (lvm.toJourney == true) {

			lvm.toCityName = airport.cityName;
			lvm.toAirportDetails = airport.code + " , " + airport.airportName;

			lvm.enquiry.toAirportAppId = airport.airportAppId;
			lvm.enquiry.toAirportCode = airport.code;
			lvm.enquiry.toAirportCity = airport.cityName;
			lvm.enquiry.toAirportName = airport.airportName;

			lvm.currentAirport = airport;
		}

		$("#airportModel").hide(500);
	}
	lvm.setAirportForMultipleCity = function (airport) {
		if (lvm.fromJourney == true) {

			$("#fromCityName" + lvm.currentAirportId).text(airport.cityName);
			$("#fromAirportCode" + lvm.currentAirportId).text(airport.code);
			$("#fromAirportAppId" + lvm.currentAirportId).text(airport.airportAppId);
			$("#fromAirportName" + lvm.currentAirportId).text(airport.airportName);
			$("#fromAirportName" + lvm.currentAirportId).text(airport.airportName);
			$("#fromAirportCombine" + lvm.currentAirportId).text(airport.code + " , " + airport.airportName);
		} else if (lvm.toJourney == true) {

			$("#toCityName" + lvm.currentAirportId).text(airport.cityName);
			$("#toAirportCode" + lvm.currentAirportId).text(airport.code);
			$("#toAirportAppId" + lvm.currentAirportId).text(airport.airportAppId);
			$("#toAirportName" + lvm.currentAirportId).text(airport.airportName);
			$("#toAirportName" + lvm.currentAirportId).text(airport.airportName);
			$("#toAirportCombine" + lvm.currentAirportId).text(airport.code + " , " + airport.airportName);
			lvm.currentAirport = airport;
		}

		$("#airportModelForMultipleCity").hide(500);
	}



	lvm.showCityModel = function (journeyFromOrTo) {
		$("#airportModel").show(1000);
		if (journeyFromOrTo == "fromJourney") {
			lvm.fromJourney = true;
			lvm.toJourney = false;
		} else if (journeyFromOrTo == "toJourney") {
			lvm.toJourney = true;
			lvm.fromJourney = false;
		}
	}
	lvm.currentAirportId = null;
	lvm.airportModelForMultipleCity = function (journeyFromOrTo, currentId) {
		lvm.currentAirportId = currentId;
		$("#airportModelForMultipleCity").show(1000);
		if (journeyFromOrTo == "fromJourney") {
			lvm.fromJourney = true;
			lvm.toJourney = false;
		} else if (journeyFromOrTo == "toJourney") {
			lvm.toJourney = true;
			lvm.fromJourney = false;
		}
	}
	var detailsContainerId = 1;
	lvm.addMulticityRow = function () {
		if (lvm.fromCityName === "Select City" || lvm.toCityName === "Select City") {
			alert("Please select current destinations to add more");
		} else {
			detailsContainerId++;

			var html = '<div class="detials-containers" id="details-container-' + detailsContainerId + '">' +
				'<div class="details-20perc-container" ng-click="lvm.airportModelForMultipleCity(' + "'fromJourney'," + detailsContainerId + ')">' +
				'<p class="font-weight-bold margin-bottom-0px">FROM</p>' +
				'<p class="city-name margin-bottom-0px" id="fromCityName' + detailsContainerId + '"></p>' +
				'<p   class="margin-bottom-0px" id="fromAirportCombine' + detailsContainerId + '"></p>' +
				'<p   class="margin-bottom-0px" id="fromAirportCode' + detailsContainerId + '" style="display:none"> </p>' +
				'<p   class="margin-bottom-0px" id="fromAirportAppId' + detailsContainerId + '" style="display:none"></p>' +
				'<p   class="margin-bottom-0px" id="fromAirportName' + detailsContainerId + '" style="display:none"></p>' +

				'</div>' +
				'<div class="details-20perc-container" ng-click="lvm.airportModelForMultipleCity(' + "'toJourney'," + detailsContainerId + ')">' +
				'<p class="font-weight-bold margin-bottom-0px">TO</p>' +
				'<p class="city-name margin-bottom-0px" id="toCityName' + detailsContainerId + '">SELECT CITY</p>' +
				'<p   class="margin-bottom-0px" id="toAirportCombine' + detailsContainerId + '"></p>' +
				'<p   class="margin-bottom-0px" id="toAirportCode' + detailsContainerId + '" style="display:none"> </p>' +
				'<p   class="margin-bottom-0px" id="toAirportAppId' + detailsContainerId + '" style="display:none"></p>' +
				'<p   class="margin-bottom-0px" id="toAirportName' + detailsContainerId + '" style="display:none"></p>' +
				'</div>' +
				'<div class="details-20perc-container">' +
				'<p class="font-weight-bold">DEPARTURE</p>' +
				'<input type="date" class="new-input-field" id="dipartureDate' + detailsContainerId + '">' +
				'</div>' +

				'<div class="details-20perc-container display-none" id="addCity">' +
				'<p class="font-weight-bold">ADD CITY</p>' +
				'<button ng-click="lvm.addMulticityRow()">Add city</button>' +
				'</div>' +

				'</div>';
			angular.element($('#details-container')).append($compile(html)($scope));
			angular.element(document).ready(function () {
				console.log($("#fromCityName" + detailsContainerId).val("lvm.currentAirport.cityName"));
				$("#fromCityName" + detailsContainerId).text(lvm.currentAirport.cityName);
				$("#fromAirportCode" + detailsContainerId).text(lvm.currentAirport.code);
				$("#fromAirportAppId" + detailsContainerId).text(lvm.currentAirport.airportAppId);
				$("#fromAirportName" + detailsContainerId).text(lvm.currentAirport.airportName);
				$("#fromAirportName" + detailsContainerId).text(lvm.currentAirport.airportName);
				$("#fromAirportCombine" + detailsContainerId).text(lvm.currentAirport.code + " , " + lvm.currentAirport.airportName);
			});

		}

	}

	lvm.removeMultiCityRows = function () {
		for (var i = 2; i <= detailsContainerId; i++) {
			$("#details-container-" + i).remove();
		}
		detailsContainerId = 1;
	}

	lvm.selectTravelClass = function (type) {
		$("#economy").removeClass("selected");
		$("#economyPremium").removeClass("selected");
		$("#business").removeClass("selected");

		lvm.enquiry.travelClass = type;
		$("#" + type).addClass("selected");
	}
	lvm.hideTravelInfo = function () {
		$("#travellersModal").hide(500);
	}
	lvm.showTravelInfo = function () {
		$("#travellersModal").show(500);
	}

	lvm.registerEnquiry = function () {
		$(".loader-background").css("display", "flex");

		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		var uploadData = {};
		var enquiryData = {};
		enquiryData[serverEndpoints.guestName] = lvm.enquiry.guestName;
		enquiryData[serverEndpoints.contactNo] = lvm.enquiry.contactNo;
		enquiryData[serverEndpoints.emailId] = lvm.enquiry.emailId;
		enquiryData[serverEndpoints.serviceName] = lvm.enquiry.serviceName;
		enquiryData[serverEndpoints.serviceId] = lvm.enquiry.serviceId;
		enquiryData[serverEndpoints.destinationTypeId] = lvm.enquiry.destinationTypeId;
		enquiryData[serverEndpoints.destinationTypeName] = lvm.enquiry.destinationTypeName;
		enquiryData[serverEndpoints.visaTypeId] = lvm.enquiry.visaTypeId;
		enquiryData[serverEndpoints.visaTypeName] = lvm.enquiry.visaTypeName;
		enquiryData[serverEndpoints.sector] = lvm.enquiry.sector;
		enquiryData[serverEndpoints.dateOfTravel] = lvm.enquiry.dateOfTravel;
		enquiryData[serverEndpoints.adult] = lvm.enquiry.adult;
		enquiryData[serverEndpoints.child] = lvm.enquiry.child;
		enquiryData[serverEndpoints.infants] = lvm.enquiry.infants;
		enquiryData[serverEndpoints.journeyType] = lvm.enquiry.journeyType;
		enquiryData[serverEndpoints.departureDate] = lvm.enquiry.departureDate;
		enquiryData[serverEndpoints.returnDate] = lvm.enquiry.returnDate;
		enquiryData[serverEndpoints.travelClass] = lvm.enquiry.travelClass;
		enquiryData[serverEndpoints.journeyFrom] = lvm.enquiry.journeyFrom;
		enquiryData[serverEndpoints.journeyTo] = lvm.enquiry.journeyTo;
		enquiryData[serverEndpoints.status] = lvm.enquiry.status;
		enquiryData[serverEndpoints.log] = lvm.enquiry.log;
		enquiryData[serverEndpoints.remark] = lvm.enquiry.remark;
		enquiryData[serverEndpoints.fromAirportAppId] = lvm.enquiry.fromAirportAppId;
		enquiryData[serverEndpoints.fromAirportCity] = lvm.enquiry.fromAirportCity;
		enquiryData[serverEndpoints.fromAirportName] = lvm.enquiry.fromAirportName;
		enquiryData[serverEndpoints.fromAirportName] = lvm.enquiry.fromAirportName;
		enquiryData[serverEndpoints.fromAirportCode] = lvm.enquiry.fromAirportCode;
		enquiryData[serverEndpoints.toAirportAppId] = lvm.enquiry.toAirportAppId;
		enquiryData[serverEndpoints.toAirportCode] = lvm.enquiry.toAirportCode;
		enquiryData[serverEndpoints.toAirportCity] = lvm.enquiry.toAirportCity;
		enquiryData[serverEndpoints.toAirportName] = lvm.enquiry.toAirportName;
		enquiryData[serverEndpoints.visaCountry] = lvm.enquiry.visaCountry;
		enquiryData[serverEndpoints.holidayFromCity] = lvm.enquiry.holidayFromCity;
		enquiryData[serverEndpoints.holidayToCity] = lvm.enquiry.holidayToCity;
		enquiryData[serverEndpoints.holidayFromCountry] = lvm.enquiry.holidayFromCountry;
		enquiryData[serverEndpoints.holidayToCountry] = lvm.enquiry.holidayToCountry;
			
			
			
		
			uploadData[serverEndpoints.enquiries] = enquiryData;

		var airticketMulticityList = [];

		if (lvm.enquiry.serviceName === "AIRTICKET" && lvm.enquiry.journeyType === "multiCity") {
			lvm.airticketMulticityObj = {};

					lvm.airticketMulticityObj.departureDate=lvm.enquiry.departureDate;
					lvm.airticketMulticityObj.fromAirportAppId=lvm.enquiry.fromAirportAppId;
					lvm.airticketMulticityObj.fromAirportCode=lvm.enquiry.fromAirportCode;
					lvm.airticketMulticityObj.fromAirportCity=lvm.enquiry.fromAirportCity;
					lvm.airticketMulticityObj.fromAirportName=lvm.enquiry.fromAirportName;

					lvm.airticketMulticityObj.toAirportAppId=lvm.enquiry.toAirportAppId;
					lvm.airticketMulticityObj.toAirportCode=lvm.enquiry.toAirportCode;
					lvm.airticketMulticityObj.toAirportCity=lvm.enquiry.toAirportCity;
					lvm.airticketMulticityObj.toAirportName=lvm.enquiry.toAirportName;
					airticketMulticityList.push(lvm.airticketMulticityObj);

			for (var i = 2; i <= detailsContainerId; i++) {
				lvm.airticketMulticityObj = {};
				if($("#fromAirportCode" + i).text()!=null && $("#toAirportCode" + i).text()!=null ){
					lvm.airticketMulticityObj.departureDate=$("#dipartureDate" + i).val();
					lvm.airticketMulticityObj.fromAirportAppId=$("#fromAirportAppId" + i).text();
					lvm.airticketMulticityObj.fromAirportCode=$("#fromAirportCode" + i).text();
					lvm.airticketMulticityObj.fromAirportCity=$("#fromCityName" + i).text();
					lvm.airticketMulticityObj.fromAirportName=$("#fromAirportName" + i).text();

					lvm.airticketMulticityObj.toAirportAppId=$("#toAirportAppId" + i).text();
					lvm.airticketMulticityObj.toAirportCode=$("#toAirportCode" + i).text();
					lvm.airticketMulticityObj.toAirportCity=$("#toCityName" + i).text();
					lvm.airticketMulticityObj.toAirportName=$("#toAirportName" + i).text();


					airticketMulticityList.push(lvm.airticketMulticityObj);
					
				}

			}
		}
		uploadData[serverEndpoints.airTicketMappings]=airticketMulticityList;
		
		var hotelMultipleRowList=[];
		
		if (lvm.enquiry.serviceName === "HOTELS") {
			
			for (var i = 1; i <= hotelRowIndex; i++) {
				lvm.hotelObj = {};
				
				lvm.hotelObj.checkIn=$("#checkin-date-" + i).val();
				lvm.hotelObj.checkOut=$("#checkout-date-" + i).val();
				
				lvm.hotelObj.adult=$("#adult-"+i).text();
				lvm.hotelObj.infants=$("#infant-"+i).text();
				lvm.hotelObj.child=$("#children-"+i).text();
				lvm.hotelObj.rooms=$("#rooms-"+i).text();
				lvm.hotelObj.country=$("#hotel-country-" + i).text();
				lvm.hotelObj.city=$("#hotel-city-" + i).text();
				

				hotelMultipleRowList.push(lvm.hotelObj);
					
				

			}
		}

		uploadData[serverEndpoints.enquiryToHotelMappings]=hotelMultipleRowList;
		
		
		//Get product list of portal
		datasource.getData(serverEndpoints.registerNewEnquiryUrl, uploadData, header,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					$("#"+lvm.enquiry.serviceName).modal('hide');
					alert("Enquiry Added Succesfully");
					$route.reload();
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	lvm.setVisaType=function(type){
		$("#BUSINESS").removeClass("selected");
		$("#TOURIST").removeClass("selected");

		$("#"+type).addClass("selected");
		lvm.enquiry.visaTypeName=type;


	}

	lvm.getAllPopularCountries = function () {
		$(".loader-background").css("display", "flex");

	
		// Get product list of portal
		datasource.getData(serverEndpoints.getAllPopularCountriesUrl, {}, null,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.popularCountries=data;
					lvm.popularCountriesForSearch=data;
					
					
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}
	lvm.getAllPopularCountries();
	

	var countriesOptions = {
		shouldSort: true,
		threshold: 0.6,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 1,
		keys: [
			"name"
		]
	};

	lvm.searchCountry = function (query) {

		if (query != undefined) {
			if (query === "") {
				lvm.popularCountries = lvm.popularCountriesForSearch;
			} else {
				var fuse = new Fuse(lvm.popularCountries, countriesOptions); // "list" is the item array
				lvm.popularCountries = fuse.search(query);

			}

		} else {
			lvm.popularCountries = lvm.popularCountriesForSearch;
		}

	}

	lvm.setCountry=function(country){
		lvm.searchForCountry=country.name;
		lvm.enquiry.visaCountry=country.name;
		$("#countriesList").hide(500);
	}
	lvm.showCountryList=function(id){
		$("#"+id).show(500);
	}
	
	
	
	lvm.getAllCitiesOfCountries = function (countryId,toOrFrom) {
		$(".loader-background").css("display", "flex");

		var header = {};
		header[serverEndpoints.countryId] = countryId;

		// Get product list of portal
		datasource.getData(serverEndpoints.getAllPopularCitiesOfCountriesUrl, {}, header,
			function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					
					if(toOrFrom==="fromCountriesList"){
						lvm.fromCities = data;
						lvm.fromCitiesForSearch = data;	
						lvm.showCitiesList('fromCitiesList');
					}else if(toOrFrom==="toCountriesList"){
						lvm.toCities = data;
						lvm.toCitiesForSearch = data;	
						lvm.showCitiesList('toCitiesList');
					}else if(toOrFrom==="hotelCountryList"){
						lvm.hotelCities = data;
						lvm.hotelCitiesForSearch = data;	
						lvm.showCitiesList('hotelCitiesList');
					}
					
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}

	lvm.setHolidayCountry=function(country,id){
		if(id==="fromCountriesList"){
			lvm.enquiry.holidayFromCountry=country.name;
			lvm.getAllCitiesOfCountries(country.code,id);
		}else if(id==="toCountriesList"){
			lvm.enquiry.holidayToCountry=country.name;
			lvm.getAllCitiesOfCountries(country.code,id);
		}else if(id==="hotelCountryList"){
			lvm.hotelCountry=country.name;
			lvm.getAllCitiesOfCountries(country.code,id);
		}
		
		
		$("#"+id).hide(500);
	}
	lvm.showCitiesList=function(id){
		$("#"+id).show(500);
	}

	// lvm.setHolidayCity=function(city,id){
	// 	if(id==="fromCitiesList"){
	// 		lvm.enquiry.holidayFromCity=country.name;
	// 		lvm.getAllCitiesOfCountries(country.id,id);
	// 	}else if(id==="toCitiesList"){
	// 		lvm.enquiry.holidayToCity=country.name;
	// 		lvm.getAllCitiesOfCountries(country.id,id);
	// 	}
		
		
	// 	$("#"+id).hide(500);
	// }

	var citiesOptions = {
		shouldSort: true,
		threshold: 0.6,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 1,
		keys: [
			"cityname"
		]
	};

	lvm.searchFromCity = function (query) {

		if (query != undefined) {
			if (query === "") {
				lvm.fromCities = lvm.fromCitiesForSearch;
			} else {
				var fuse = new Fuse(lvm.fromCities, citiesOptions); // "list" is the item array
				lvm.fromCities = fuse.search(query);

			}

		} else {
			lvm.fromCities = lvm.fromCitiesForSearch;
		}

	}

	lvm.searchToCity = function (query) {

		if (query != undefined) {
			if (query === "") {
				lvm.toCities = lvm.toCitiesForSearch;
			} else {
				var fuse = new Fuse(lvm.toCities, citiesOptions); // "list" is the item array
				lvm.toCities = fuse.search(query);

			}

		} else {
			lvm.toCities = lvm.toCitiesForSearch;
		}

	}

	lvm.searchHotelCity = function (query) {

		if (query != undefined) {
			if (query === "") {
				lvm.hotelCities = lvm.hotelCitiesForSearch;
			} else {
				var fuse = new Fuse(lvm.hotelCities, citiesOptions); // "list" is the item array
				lvm.hotelCities = fuse.search(query);

			}

		} else {
			lvm.hotelCities = lvm.hotelCitiesForSearch;
		}

	}

	lvm.setHolidayCity=function(city,id){
		if(id==="fromCitiesList"){
			lvm.enquiry.holidayFromCity=city.cityname;
		}else if(id==="toCitiesList"){
			lvm.enquiry.holidayToCity=city.cityname;
		}else if(id==="hotelCitiesList"){
			lvm.hotelCity=city.cityname;
		}

		$("#"+id).hide(500);
	}

	lvm.setHolidayDestiantion=function(type){
		$("#DOMESTIC").removeClass('selected');
		$("#INTERNATIONAL").removeClass('selected');

		$("#"+type).addClass('selected');
		lvm.enquiry.destinationTypeName=type;

	}

	var hotelRowIndex=1;
	lvm.addHotelRow = function () {
		hotelRowIndex++;
		var html = '<div class="detials-containers" id="hotel-details-container-'+hotelRowIndex+'">' +
			'<div class="details-20perc-container" ng-click="lvm.displayHotelCountry('+hotelRowIndex+')">' +
			'	<p class="font-weight-bold margin-bottom-0px">PLACE</p>' +
			'	<p class="city-name margin-bottom-0px" id="hotel-city-'+hotelRowIndex+'"></p>' +
			'	<p class="margin-bottom-0px"  id="hotel-country-'+hotelRowIndex+'"></p>' +

			'</div>' +

			'<div class="details-20perc-container">' +
			'<p class="font-weight-bold">CHECK-IN</p>' +
			'<input type="date" class="new-input-field" id="checkin-date-'+hotelRowIndex+'">' +
			'</div>' +
			'<div class="details-20perc-container" id="returnDate">' +
			'<p class="font-weight-bold">CHECK-OUT</p>' +
			'<input type="date" class="new-input-field" id="checkout-date-'+hotelRowIndex+'">' +
			'</div>' +
			'<div class="details-20perc-container" ng-click="lvm.showTravelInfo()">' +
			'<p class="font-weight-bold">ROOMS & GUESTS <i class="fa fa-pencil-square-o" aria-hidden="true" ng-click="lvm.showRommsAndGuestModal('+hotelRowIndex+')"></i></p>' +
			'<div class="adult-children-infants-flex-container">' +
			'	<div class="adult-children-infants-30p">AD - <span id="adult-'+hotelRowIndex+'">0</span></div>' +
			'	<div class="adult-children-infants-30p">CH - <span id="children-'+hotelRowIndex+'">0</span></div>' +
			'	<div class="adult-children-infants-30p">IF - <span id="infant-'+hotelRowIndex+'">0</span></div>' +
			'	<div class="adult-children-infants-30p">ROOMS - <span id="rooms-'+hotelRowIndex+'">0</span></div>' +
			'</div>' +
			'</div>' +

			'</div>';
		angular.element($('#hotel-details-container')).append($compile(html)($scope));
	}

	var currentRoomId=null;
	lvm.showRommsAndGuestModal=function(rowId){
		$("#rommsAndGuestModal").show(500);
		currentRoomId=rowId;
	}
	lvm.applyGuestAndRoomValues=function(){
		$("#adult-"+currentRoomId).text(lvm.adult);
		$("#children-"+currentRoomId).text(lvm.child);
		$("#infant-"+currentRoomId).text(lvm.infants);
		$("#rooms-"+currentRoomId).text(lvm.rooms);
		

		lvm.adult=0;
		lvm.child=0;
		lvm.infants=0;
		lvm.rooms=0;
		$("#rommsAndGuestModal").hide(500);
	}

	lvm.displayHotelCountry=function(rowId){
		currentRoomId=rowId
		$("#hotelCountryModal").show(500);
	}
	
	lvm.applyCityAndCountry=function(){
		
		$("#hotel-country-"+currentRoomId).text(lvm.hotelCountry);
		$("#hotel-city-"+currentRoomId).text(lvm.hotelCity);
		
		
		lvm.hotelCity="";
		lvm.hotelCountry="";
		$("#hotelCountryModal").hide(500);
	}

	lvm.covertStringToDate=function(stringDate){
		let date = JSON.stringify(stringDate)
		date = date.slice(1,11);
		return date;
		
	}
	lvm.showRemarkModel=function(currentEnquiryId,currentRemark,status,dateOfNextAction){
		$("#remarkModel").modal('show');
		lvm.currentEnquiryId=currentEnquiryId;
		lvm.remark=currentRemark;
		lvm.status=status;
		$("#dateOfNextAction").val(lvm.covertStringToDate(dateOfNextAction));
	}
	
	lvm.updateEnquiryRemark = function () {
		
		$(".loader-background").css("display", "flex");
		
		var header = {};
		
		var uploadData={};
		
		
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		
		uploadData[serverEndpoints.remark] = lvm.remark;
		uploadData[serverEndpoints.id] = lvm.currentEnquiryId;
		uploadData[serverEndpoints.status] = lvm.status;
		uploadData[serverEndpoints.dateOfNextAction] = lvm.dateOfNextAction;

		

		
		// Get product list of portal
		datasource.getData(serverEndpoints.updateEnquiryRemarkUrl, uploadData, header,
			function (isSuccess, data) {
			$(".loader-background").css("display", "none");
				if (isSuccess) {
					$("#remarkModel").modal('hide');
					$route.reload();
				} else {
					if (data === strings.msg_admin_not_logged_in) {
						lvm.logOut();

					}
				}
			});
	}
	console.log("customerOwnEnquiriesController()---->End");
})