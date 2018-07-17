(function() {
	angular
		.module('core')
		.constant('appCONSTANTS', { 
 		 'API_URL': 'http://invitationsbackend.azurewebsites.net/api/',
		  	// 'API_URL': 'http://localhost:33343/api/',
			'defaultLanguage':'en'
		})
		.constant('messageTypeEnum', {
			success: 0,
			warning: 1,
			error: 2
		}).constant('userRolesEnum', {
			GlobalAdmin:"GlobalAdmin"
    });
}());