/*
 * To setup navigation drawer
 * for every partial loading in
 * ng-view
 */
app
		.service(
				'navigationDrawerSetup',
				function() {

					var loadNavigationDrawerMenusListener = null;
					var navigationDrawerItemClickListener= null;

					var setLoadNavigationDrawerMenusListener = function(listener) {
						loadNavigationDrawerMenusListener = listener;
					}
					
					var setNavigationDrawerItemClickListener= function(listener){
						navigationDrawerItemClickListener= listener;
					}

					var loadNavigationDrawerMenu = function(navigatoinDrawerMenu) {
						if (loadNavigationDrawerMenusListener!=null){
							loadNavigationDrawerMenusListener(navigatoinDrawerMenu);
						}
					}
					
					var navigationItemClicked= function(itemName){
						if (itemName!=null && navigationDrawerItemClickListener!=null){
							navigationDrawerItemClickListener(itemName);
						}
					}

					var showItemsForAdminLogin=function(){
						$("#sidebar-panel").show();
						/*$("#allCustomers").show();
						$("#customerRegistrations").show();
						$("#customerUploads").show();*/
						
						
					}
					var showItemsForCustomerLogin=function(){
						$("#sidebar-panel").show();
						$("#allCustomers").show();
						$("#customerRegistrations").hide();
						$("#customerUploads").hide();
						
						
					}

					return {
						setLoadNavigationDrawerMenusListener : setLoadNavigationDrawerMenusListener,
						loadNavigationDrawerMenu : loadNavigationDrawerMenu,
						navigationItemClicked: navigationItemClicked,
						setNavigationDrawerItemClickListener: setNavigationDrawerItemClickListener,
						showItemsForAdminLogin:showItemsForAdminLogin,
						showItemsForCustomerLogin:showItemsForCustomerLogin
					}

				});
