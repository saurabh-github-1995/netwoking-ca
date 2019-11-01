/**
 * Popup service
 */
app
		.service(
				'portalSetup',
				function(serverEndpoints, strings, datasource) {
					
					var currentPortalId="-1";
					var loadPortalDataListener;
					var portalSetupCompletedListener;
					
					/**
					 * Set up portal for given portal id
					 * Caller of this function (some partial view) will be pass portal id
					 * while the setup work will be delegated to receiver (app-controller)
					 */
					var setUpPortalForPortalId = function(portalId) {

						if (portalId != null) {
							
							// Check if portal already set
							if (currentPortalId.toLowerCase()==portalId.toLowerCase()){
								portalSetupCompletedListener();
								return;
							}
							
							if (loadPortalDataListener!=null){
								loadPortalDataListener(portalId);
								currentPortalId= portalId;
							}
						}
					}
					
					/**
					 * Set up listener for loading portal data
					 */
					var setLoadPortalDataListener= function(handler){
						loadPortalDataListener= handler;
					}
					
					/**
					 * Listener after portal setup completed
					 */
					var setPortalSetupCompletedListener= function(handler){
						portalSetupCompletedListener= handler;
					}
					
					/**
					 * On portal setup completed
					 */
					
					var onPortalSetupCompleted= function(){
						if (portalSetupCompletedListener!=null){
							portalSetupCompletedListener();
						}
					}

					return {
						setLoadPortalDataListener : setLoadPortalDataListener,
						setUpPortalForPortalId : setUpPortalForPortalId,
						setPortalSetupCompletedListener: setPortalSetupCompletedListener,
						onPortalSetupCompleted: onPortalSetupCompleted
					}

				});
