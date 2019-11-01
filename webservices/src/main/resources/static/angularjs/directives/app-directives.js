angular.module('UserValidation', [])
	.directive('validPassword', function() {
		return {
			require : 'ngModel',
			link : function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					var isBlank = viewValue === ''
					var invalidLen = !isBlank && (viewValue.length < 8 || viewValue.length > 20)
					var isWeak = !isBlank && !invalidLen && !/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/.test(viewValue)
					ctrl.$setValidity('isBlank', !isBlank)
					ctrl.$setValidity('isWeak', !isWeak)
					ctrl.$setValidity('invalidLen', !invalidLen)
					scope.passwordGood = !isBlank && !isWeak && !invalidLen
					scope.password = viewValue;

				})
			}
		}
	})
	.directive('validPasswordC', function() {
		return {
			require : 'ngModel',
			link : function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue, $scope) {
					var isBlank = viewValue === ''
					var noMatch = viewValue != scope.form.password.$viewValue
					ctrl.$setValidity('isBlank', !isBlank)
					ctrl.$setValidity('noMatch', !noMatch)
					scope.passwordCGood = !isBlank && !noMatch
				})
			}
		}
	}).directive('uiSelectRequired', function () {
	    return {
	        require: 'ngModel',
	        link: function (scope, element, attr, ctrl) {
	            ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {
	                if (attr.uiSelectRequired) {
	                    var isRequired = scope.$eval(attr.uiSelectRequired)
	                    if (isRequired == false)
	                        return true;
	                }
	                var determineVal;
	                if (angular.isArray(modelValue)) {
	                    determineVal = modelValue;
	                } else if (angular.isArray(viewValue)) {
	                    determineVal = viewValue;
	                } else {
	                    return false;
	                }
	                return determineVal.length > 0;
	            };
	        }
	    };
	});