var app = angular.module('portfolio', []);
app.controller('myCtrl', function($scope, $http) {
  
   var lvm = this;
  lvm.sendContactUsRequest=function(){
    if(lvm.email!=="" && lvm.email!=null && lvm.name!=="" && lvm.name!=null && lvm.email!=undefined && lvm.name!=undefined){
      $("#preloader").show();
      var data={};
      data={
        "emailId":lvm.email,
        "contactNo":"00000000000",
        "address":lvm.subject,
        "msg":lvm.message,
        "name":lvm.name
      }
      $http({
          method : "POST",
          url : "https://139.59.59.220/portfoliows/sendContactUsRequest",
          data:data
          
        }).then(function mySuccess(response) {
           $("#preloader").hide();
           alert("success");
          }, function myError(response) {
            $("#preloader").hide();
            alert("SOMETHING WENT WRONG PLEASE TRY AGAIN SOME TIME");
        });
    }else{
      alert("Name and Email cannot be null");
    }
   
  } 

  
});