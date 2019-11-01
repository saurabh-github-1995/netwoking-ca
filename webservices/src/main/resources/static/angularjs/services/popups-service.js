/*
 * Popup service
 */
app.service('popupsService', function() {
	
	var showProgressListener= null;
	var dismissProgressListener= null;
	var showConfirmationDialogListener= null;
	var dismissConfirmationDailogListener= null;
	
	var setShowProgressListener= function(listener){
		showProgressListener= listener;
	}
	
	var setDismissProgressListener= function(listener){
		dismissProgressListener= listener;
	}

	var setShowConfirmationDialogListener= function(listener){
		showConfirmationDialogListener= listener;
	}
	
	var setDismissConfirmationDialogListener= function(listener){
		dismissConfirmationDailogListener= listener;
	}
	
	var showProgress= function(){
		if (showProgressListener!=null){
			showProgressListener();
		}
	}
	
	var dismissProgress= function(){
		
		if (dismissProgressListener!=null){
			dismissProgressListener();
		}
	}
	
	var showConfirmationDialog= function(message, buttonClickListener){
		
		if (showConfirmationDialogListener!=null){
			showConfirmationDialogListener(message, buttonClickListener);
		}
	}
	
	var dismissConfirmationDialog= function(){
		
		if (dismissConfirmationDailogListener!=null){
			dismissConfirmationDailogListener();
		}
	}
	
	return {
		setShowProgressListener : setShowProgressListener,
		setDismissProgressListener : setDismissProgressListener,
		setShowConfirmationDialogListener: setShowConfirmationDialogListener,
		setDismissConfirmationDialogListener: setDismissConfirmationDialogListener,
		showProgress: showProgress,
		dismissProgress: dismissProgress,
		showConfirmationDialog: showConfirmationDialog,
		dismissConfirmationDialog: dismissConfirmationDialog
	}

});
