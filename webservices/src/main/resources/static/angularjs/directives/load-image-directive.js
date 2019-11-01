
(function () {
  'use strict';

  app.directive('loadImage', function() {
		return {
			link : function(scope, element, attrs) {
				
				element.bind('error', function() {
					attrs.$set('src', 'images/noimagefound.jpg');
				});
				
				attrs.$observe('ngSrc', function(value) {
					  if (!value) {
					    attrs.$set('src', 'images/noimage.jpg');
					  }
				});
			}
		}
	});

})();