(function () {
    'use strict';

    angular
        .module('home')
        .controller('inviteeController', ['$rootScope', '$scope', '$stateParams', '$filter', '$translate', '$uibModal', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS','InviteeResourceByInvitationID', 'ToastService', 'InvitationResourceByID', 'inviteesPagingPrepService', inviteeController]);


    function inviteeController($rootScope, $scope, $stateParams, $filter, $translate, $uibModal, $state, $localStorage, authorizationService, appCONSTANTS,InviteeResourceByInvitationID, ToastService, InvitationResourceByID, inviteesPagingPrepService) {
        var vm = this;
        $scope.sidebar.show = true;
        $scope.header.show = true;
        vm.invitationID = $stateParams.invitationID;
        vm.html = "";
        vm.templateUrl="";
    
        vm.inviteesOfInvitationList = inviteesPagingPrepService;

        function refreshInvitees(){
			var k = InviteeResourceByInvitationID.getInviteesOfInvitation({invitationID:vm.invitationID, page:vm.currentPage}).$promise.then(function(results) {
                vm.inviteesOfInvitationList = results;
            },
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }
        
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshInvitees();
		}

        // InviteeResourceByInvitationID.getInviteesOfInvitation({invitationID:vm.invitationID, page:vm.currentPage}).$promise.then(function(results) {
        //     vm.inviteesOfInvitationList = results;
        // },
        // function(data, status) {
        //     ToastService.show("right","bottom","fadeInUp",data.message,"error");
        // });

        InvitationResourceByID.getCertainInvitation({invitationID:vm.invitationID}).$promise.then(function(results) {
            vm.html = results.invitationDescription;
            vm.templateUrl = results.templateURL;

            var dynamic = $('#dynamicStyleHistory');

            vm.height = 0;
            vm.width = 0;
            $('<img style="display:none;" src="' +  vm.templateUrl + '"/>').appendTo('body').load(function() {
                var img = $(this);
                vm.height = img.height();
                vm.width = img.width();
                img.remove();
                dynamic.html('.invitationHistoryClass{ background-image: url( ' + vm.templateUrl + '); background-repeat: no-repeat; min-height: ' + vm.height + 'px !important; width: '+  vm.width +'px !important;}');
                                                                                                                                        
            });
        },
        function(data, status) {
            ToastService.show("right","bottom","fadeInUp",data.message,"error");
        });

    }

}());