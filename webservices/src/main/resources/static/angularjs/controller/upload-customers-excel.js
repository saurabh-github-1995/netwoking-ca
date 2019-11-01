
app.controller("uploadCustomers", function (serverEndpoints, datasource, strings, navigation, $http, authentication) {
    console.log("uploadCustomers()---->START");
    /* $("#appointments").addClass("menu-active"); */
    var lvm = this;
    $("#sidebar-panel").show();


    lvm.uploadCustomers = function () {
        var myFile = $('#fileinput').prop('files');

        var fd = new FormData();

        fd.append('file', myFile[0]);
        $http.post(serverEndpoints.registerCustomersFromExcelUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                sessionToken: authentication.getAdminSessionToken()

            }
        })
            .success(function (data) {

                if (data.operationStatus == 1) {
                    lvm.messageTitle = strings.lbl_success;
                    lvm.message = strings.msg_users_data_uploaded_succesfully;
                    $("#formSubmissionModal").modal("show");
                } else {
                    lvm.messageTitle = strings.lbl_error;
                    lvm.message = strings.msg_users_data_uploaded_failed;
                    $("#formSubmissionModal").modal("show");
                }

            })
            .error(function () {
                lvm.messageTitle = strings.lbl_error;
                lvm.message = strings.msg_users_data_uploaded_failed;
                $("#formSubmissionModal").modal("show");
            });

    }





    console.log("resourceLoginController()---->END");
});