(function () {
    'use strict';

    angular
        .module('home')
        .controller('invitationHistoryController', ['$rootScope', '$window', 'InvitationPagingResource', '$scope', '$filter', '$translate', '$uibModal', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS','invitationPagingPrepService', 'ToastService', invitationHistoryController]);


    function invitationHistoryController($rootScope, $window, InvitationPagingResource, $scope, $filter, $translate, $uibModal, $state, $localStorage, authorizationService, appCONSTANTS,invitationPagingPrepService, ToastService) {
        var vm = this;
        $scope.sidebar.show = true;
        $scope.header.show = true;
    
        vm.invitationList = invitationPagingPrepService;

        vm.InvitationDetails = function (invitationID) {
            var host = $window.location.host;
            var landingUrl = "http://" + host + "/#!/inviteesOfInvitation/" + invitationID;

            $window.location.href = landingUrl;
        }

        function refreshInvitations(){
			var k = InvitationPagingResource.getAllPagingInvitation({page:vm.currentPage}).$promise.then(function(results) {
				//vm.Now = $scope.getCurrentTime();	
				vm.invitationList = results;
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }
        
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshInvitations();
		}


    }

}());