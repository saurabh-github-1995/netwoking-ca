/**
 * Main controller
 */
app.controller("addUpdatePackageController", function (serverEndpoints, navigation, datasource, $scope, strings, $compile, $route,authentication) {
	console.log("addUpdatePackageController()---->START");
	/*$("#CUSTOMERS").hide();
	$("#ENQUIRIES").hide();
	$("#PACKAGES").show();*/
	$("#sidebar-panel").show();

	var lvm = this;
	lvm.package = {};
	lvm.categoriesOptions = ["INTERNATIONAL", "DOMESTIC"];
	lvm.showIternary = false;
	lvm.imageUrl = serverEndpoints.baseFilesUrl;
	lvm.updatePackage=false;

	lvm.getAllBannerImages = function () {
		$(".loader-background").css("display", "flex");
		var header = {};

		var uploadData = {};
		header[serverEndpoints.packageId] = lvm.package.id;


		datasource.getData(
			serverEndpoints.getAllBannerImagesUrl, null,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.bannerImages=data;
					
					// $("#formSubmissionModal").modal('show');

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}

	lvm.getPackageDetailsByName = function (packageName) {
		$(".loader-background").css("display", "flex");
		var header = {};

		var uploadData = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();


		uploadData[serverEndpoints.name] = packageName;
		datasource.getData(
			serverEndpoints.getPackageDetailsByPackageNameUrl, uploadData,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.package = data;
					lvm.package.validity = new Date(lvm.package.validity);
					// lvm.setSelectedValue(lvm.package.banner_image);


					lvm.getIternaryDetailsByPackageId(lvm.package.id);
					lvm.getAllBannerImages();
					// $("#formSubmissionModal").modal('show');

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}
	if (packageName != null && packageName !== "") {
		lvm.getPackageDetailsByName(packageName);
		lvm.webserviceurl = serverEndpoints.updatepackageUrl;
		lvm.addUpdatePackageButton = "Update Package";
		lvm.updateIternary = "Update Iternary";
		lvm.showIternary = true;
		lvm.updatePackage=true;
	} else {
		lvm.updatePackage=false;
		lvm.addUpdatePackageButton = "Add Package";
		lvm.webserviceurl = serverEndpoints.createPackageUrl;
		lvm.showIternary = false;
	}


	lvm.createnewpackage = function (form) {
		$(".loader-background").css("display", "flex");
		var header = {};


		var uploadData = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();

		uploadData[serverEndpoints.id] = lvm.package.id;



		uploadData[serverEndpoints.name] = lvm.package.name;
		uploadData[serverEndpoints.title] = lvm.package.title;
		uploadData[serverEndpoints.banner_image] = lvm.package.banner_image;
		uploadData[serverEndpoints.night] = lvm.package.night;
		uploadData[serverEndpoints.days] = lvm.package.night + 1;
		uploadData[serverEndpoints.listingDetails] = lvm.package.listingDetails;
		uploadData[serverEndpoints.inclusion] = lvm.package.inclusion;
		uploadData[serverEndpoints.exlusion] = lvm.package.exlusion;
		uploadData[serverEndpoints.validity] = lvm.package.validity;
		uploadData[serverEndpoints.seoTitle] = lvm.package.seoTitle;
		uploadData[serverEndpoints.seoDescri] = lvm.package.seoDescri;
		uploadData[serverEndpoints.seoKeywords] = lvm.package.seoKeywords;
		uploadData[serverEndpoints.packageNo] = lvm.package.packageNo;
		uploadData[serverEndpoints.categoryId] = lvm.package.categoryId;
		uploadData[serverEndpoints.country] = lvm.selectedCountry.name;
		uploadData[serverEndpoints.city] = lvm.selectedCity.name;
		uploadData[serverEndpoints.region] = lvm.selectedRegion.name;
		uploadData[serverEndpoints.status] = 'APPROVED';
		// Get product list of portal
		datasource.getData(
			lvm.webserviceurl, uploadData,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					if(lvm.updatePackage==false){
						window.location.href=navigation.routes.UPDATEPACKAGE+"/"+data.name;
					}

					// $("#formSubmissionModal").modal('show');

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});

	}


	$scope.PreviewImage = function (img) {
		lvm.packageBannerImage = img.files[0];
		var oFReader = new FileReader();
		oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

		oFReader.onload = function (oFREvent) {
			$(".product-tag-preview-image-container").css("display", "flex");
			document.getElementById("uploadPreview").src = oFREvent.target.result;

		};
	};

	lvm.removeImage = function () {
		$(".product-tag-preview-image-container").hide();
		lvm.packageBannerImage = null;
		lvm.packageBannerImageName = null;
	}

	lvm.setSelectedValue = function (bannerImage) {

		$(".product-tag-preview-image-container").hide();
		if (bannerImage !== "" && bannerImage != null) {
			$(".product-tag-preview-image-container").show();
			document.getElementById("uploadPreview").src = serverEndpoints.baseFilesUrl + "/" + bannerImage;
			document.getElementById("uploadPreview1").src = serverEndpoints.baseFilesUrl + "/" + bannerImage;
		}
	}
	lvm.uploadimage = function () {
		$(".loader-background").css("display", "flex");
		var header = {};



		var fd = new FormData();
		fd.append('files', lvm.packageBannerImage);
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();


		// Get product list of portal
		datasource.httpCallFormData(
			serverEndpoints.uploadFilesUrl, fd,
			null, function (isSuccess, data) {
				$(".loader-background").css("display", "none");

				if (isSuccess) {
					lvm.package.banner_image = data[0].fileName;
					lvm.mapImageToPackage(data[0].fileName);
					// lvm.createnewpackage();
					// $("#formSubmissionModal").modal('show');

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});

	}

	lvm.mapImageToPackage = function (imageUrl) {
		$(".loader-background").css("display", "flex");
		var header = {};

		var uploadData = {};
		header[serverEndpoints.packageId] = lvm.package.id;

		uploadData[serverEndpoints.fileName] = imageUrl;
		datasource.getData(
			serverEndpoints.uploadBannerImagesForPackageUrl, uploadData,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					$route.reload();
					// $("#formSubmissionModal").modal('show');

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}
	lvm.deleteImage = function (imageId) {
		$(".loader-background").css("display", "flex");
		var header = {};

		var uploadData = {};
		header[serverEndpoints.imageId] = imageId;


		datasource.getData(
			serverEndpoints.removeBannerImageUrl, null,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.getAllBannerImages();
					// $("#formSubmissionModal").modal('show');

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}



	lvm.uploadImageAndPackage = function () {
		if (lvm.packageBannerImage != null) {
			lvm.uploadimage();
		} else {
			lvm.createnewpackage();
		}

	}

	lvm.generateIternary = function (previousPackageData) {
		lvm.noOfDays = previousPackageData.days;
		lvm.daysArray = [];

		for (var i = 0; i < lvm.noOfDays; i++) {
			lvm.daysObj = { dayNo: "" };
			lvm.daysObj.dayNo = i + 1;
			lvm.daysArray[i] = lvm.daysObj;

		}


	}



	lvm.addTimeSlot = function (dayId) {
		var newSlot = document.getElementById("day-" + dayId + "-container").childElementCount + 1;

		var html = '<div><div>From : <input type="time" id="day-' + dayId + '-slot-' + newSlot + '-fromTime-' + newSlot + '"> To : <input type="time" id="day-' + dayId + '-slot-' + newSlot + '-toTime-' + newSlot + '"></div><div><textarea rows="3" id="day-' + dayId + '-slot-' + newSlot + '-iternary" class="iternary-textarea"></textarea></div></div>';
		$("#day-" + dayId + "-container").append(html);




	}

	lvm.getPackageIternaryImages = function (packageId) {
		$(".loader-background").css("display", "flex");
		var header = {};




		header[serverEndpoints.packageId] = packageId;


		// Get product list of portal
		datasource.httpCallFormData(
			serverEndpoints.getPackageIternaryImagesUrl, null,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");

				if (isSuccess) {
					lvm.iternaryImages = data;
					lvm.setOldIternaryImages(lvm.iternaryImages);
				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});

	}

	lvm.getIternaryDetailsByPackageId = function (packageId) {
		$(".loader-background").css("display", "flex");
		var header = {};

		var uploadData = {};
		header[serverEndpoints.sessionToken] =authentication.getCustomerSessionToken();


		uploadData[serverEndpoints.packageId] = packageId;
		datasource.getData(
			serverEndpoints.getIternaryDetailsByPackageIdUrl, uploadData,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.oldIternaries = data;
					lvm.generateIternary(lvm.package);
					lvm.setPreviousIternaries(lvm.oldIternaries);
					lvm.getPackageIternaryImages(lvm.package.id);

					// $("#formSubmissionModal").modal('show');

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}

	lvm.addUpdateIternary = function () {
		lvm.iternary = [];
		for (var i = 0; i < lvm.noOfDays; i++) {
			var x = i + 1;
			var currentSlots = document.getElementById("day-" + x + "-container").childElementCount;
			for (var j = 0; j < currentSlots; j++) {
				var y = j + 1;
				if ($('#day-' + x + '-slot-' + y + '-iternary').val() != null && $('#day-' + x + '-slot-' + y + '-iternary').val() !== "" && $('#day-' + x + '-slot-' + y + '-iternary').val() != undefined) {
					var uploadData = {};
					uploadData[serverEndpoints.id] = null;
					uploadData[serverEndpoints.dayFromTimeSlot] = $('#day-' + x + '-slot-' + y + '-fromTime-' + y + '').val();
					uploadData[serverEndpoints.dayToTimeSlot] = $('#day-' + x + '-slot-' + y + '-toTime-' + y + '').val();
					uploadData[serverEndpoints.dayNumber] = x;
					uploadData[serverEndpoints.dayDate] = null;
					uploadData[serverEndpoints.packageId] = lvm.package.id;
					uploadData[serverEndpoints.packageName] = lvm.package.name;
					uploadData[serverEndpoints.slotDetails] = $('#day-' + x + '-slot-' + y + '-iternary').val();
					uploadData[serverEndpoints.fromTimeUniqueId] = '#day-' + x + '-slot-' + y + '-fromTime-' + y + '';
					uploadData[serverEndpoints.toTimeUniqueId] = '#day-' + x + '-slot-' + y + '-toTime-' + y + '';
					uploadData[serverEndpoints.iternaryDetailsUniqueId] = '#day-' + x + '-slot-' + y + '-iternary';
					if($("#day-" + x + "-old-image").attr('src') !== undefined){
						uploadData[serverEndpoints.dayImage] = ($("#day-" + x + "-old-image").attr('src')).replace('/PACKAGE_CRM_FILES/','');
					}
					lvm.iternary.push(uploadData);
				}

			}
		}
		var header = {};
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();
		datasource.getData(
			serverEndpoints.createIternaryForPackageUrl, lvm.iternary,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {

					lvm.message = data;
					lvm.messageTitle = strings.error;

					alert("Iternary created Succesfully");
					$("#formSubmissionModal").modal('show');
				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});

	}

	lvm.setPreviousIternaries = function (oldIternaries) {


		angular.element(document).ready(function () {
			for (var i = 0; i < oldIternaries.length; i++) {
				lvm.addTimeSlot(oldIternaries[i].dayNumber);
			}
			for (var i = 0; i < oldIternaries.length; i++) {
				$(oldIternaries[i].fromTimeUniqueId).val(oldIternaries[i].dayFromTimeSlot);
				$(oldIternaries[i].iternaryDetailsUniqueId).val(oldIternaries[i].slotDetails);
				$(oldIternaries[i].toTimeUniqueId).val(oldIternaries[i].dayToTimeSlot);
			}
		});
	}


	lvm.getAllCountries = function () {



		datasource.getData(
			serverEndpoints.getAllCountriesUrl, null,
			null, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.countries = data;
					if(lvm.updatePackage==true){
						lvm.setLocationValues();
					}
					
				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}
	lvm.getAllCountries();


	lvm.getRegionsByCountry = function (countryId) {
		$(".loader-background").css("display", "flex");
		var uploadData = {};
		uploadData[serverEndpoints.countryId] = countryId;


		datasource.getData(
			serverEndpoints.getRegionsByCountryUrl, uploadData,
			null, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.regions = data;
					if(lvm.updatePackage==true){
						var regionIndex = lvm.regions.findIndex(x => x.name === lvm.package.region);
						lvm.selectedRegion = lvm.regions[regionIndex];
						lvm.getCitiesByRegions(lvm.selectedRegion.id);
					}
					

				} else {
					$(".loader-background").css("display", "none");
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}

	lvm.getCitiesByRegions = function (regionId) {
		$(".loader-background").css("display", "flex");
		var uploadData = {};
		uploadData[serverEndpoints.regionId] = regionId;


		datasource.getData(
			serverEndpoints.getCitiesByRegionsUrl, uploadData,
			null, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					lvm.cities = data;
					if(lvm.updatePackage==true){
						var cityIndex = lvm.cities.findIndex(x => x.name === lvm.package.city);
						lvm.selectedCity = lvm.cities[cityIndex];
				}
				} else {
					$(".loader-background").css("display", "none");
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}

	lvm.setLocationValues = function () {
		if(lvm.package.country!=null){
			var countryIndex = lvm.countries.findIndex(x => x.name === lvm.package.country);
			lvm.selectedCountry = lvm.countries[countryIndex];
	
			lvm.getRegionsByCountry(lvm.selectedCountry.id);
	
		}
		

	}


	lvm.uploadimageForIternary = function (dayNumber) {
		$(".loader-background").css("display", "flex");
		var header = {};



		var fd = new FormData();
		fd.append('files', lvm.iternaryImage);
		header[serverEndpoints.sessionToken] = authentication.getCustomerSessionToken();


		// Get product list of portal
		datasource.httpCallFormData(
			serverEndpoints.uploadFilesUrl, fd,
			null, function (isSuccess, data) {
				$(".loader-background").css("display", "none");

				if (isSuccess) {
					lvm.iternaryImage = data[0].fileName;
					lvm.mapImageToIternary(lvm.iternaryImage, dayNumber);

				} else {
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});

	}

	lvm.mapImageToIternary = function (fileName, dayNumber) {
		$(".loader-background").css("display", "flex");
		var uploadData = {};
		uploadData[serverEndpoints.packageId] = lvm.package.id;
		uploadData[serverEndpoints.dayImage] = fileName
		uploadData[serverEndpoints.dayNumber] = dayNumber;



		datasource.getData(
			serverEndpoints.uploadImageForIternaryUrl, uploadData,
			null, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					$route.reload();

				} else {
					$(".loader-background").css("display", "none");
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}
	$scope.PreviewImageForIternary = function (img, id) {
		lvm.iternaryImage = img.files[0];
		var oFReader = new FileReader();
		oFReader.readAsDataURL(document.getElementById(id).files[0]);

		oFReader.onload = function (oFREvent) {
			$("#" + id + "-preview-container").css("display", "flex");
			document.getElementById(id + "-preview").src = oFREvent.target.result;

		};
	};

	lvm.setOldIternaryImages = function (iternaryImages) {
		angular.element(document).ready(function () {
			for (var i = 0; i < iternaryImages.length; i++) {
				if(iternaryImages[i].dayImage!=null){
					$("#day-" + iternaryImages[i].dayNumber + "-old-image-container").css("display", "flex");
					$("#day-" + iternaryImages[i].dayNumber + "-old-image").attr('src', lvm.imageUrl+iternaryImages[i].dayImage);	
				}
				
			}
		});
	}

	lvm.removeOldIternaryImage=function(dayNo){
		$(".loader-background").css("display", "flex");
		var header = {};
		header[serverEndpoints.packageId] = lvm.package.id;
		
		header[serverEndpoints.dayNumber] = dayNo;



		datasource.getData(
			serverEndpoints.removeIternaryImageUrl, null,
			header, function (isSuccess, data) {
				$(".loader-background").css("display", "none");
				if (isSuccess) {
					$route.reload();

				} else {
					$(".loader-background").css("display", "none");
					lvm.message = data;
					lvm.messageTitle = strings.error;

					$("#formSubmissionModal").modal('show');

				}
			});
	}
	

	console.log("addUpdatePackageController()---->END");
});