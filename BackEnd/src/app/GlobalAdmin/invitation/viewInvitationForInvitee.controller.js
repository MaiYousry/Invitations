(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('viewInvitationForInviteeController', ['$scope', '$uibModal', '$stateParams','$translate', 'certainInviteePrepService', 'appCONSTANTS','ToastService','$sce', 'InvitationResourceForInvitee', 'UpdateInviteeStatusResource',  viewInvitationForInviteeController])

    function viewInvitationForInviteeController($scope, $uibModal, $stateParams ,$translate, certainInviteePrepService, appCONSTANTS, ToastService,$sce, InvitationResourceForInvitee, UpdateInviteeStatusResource){

        var vm = this;
        //Hide header and sidebar
        $scope.sidebar.show = false;
        $scope.header.show = false;

        vm.invitationID = $stateParams.invitationID;
        vm.inviteeID = $stateParams.inviteeID;
        vm.InviteeInfo = certainInviteePrepService;
        vm.ShowHideCond = false;
        vm.confirmStat = "Confirmed";
        vm.rejectStat = "Rejected";
        $scope.icsFileURL="";

        if(vm.InviteeInfo.inviteeStatus == "Pending"){
            vm.ShowHideCond = true
        }

        function confirmDWFile(){
            $uibModal.open({
                templateUrl: './app/GlobalAdmin/invitation/templates/icsDownload.html',
                controller: 'confirmDWFileController',
                controllerAs: 'confirmDWFileCtrl',
                resolve:{
                    filePath:function(){return $scope.icsFileURL;}
                }

            });
        }
        
        InvitationResourceForInvitee.getinviteeInvitation({invitationID:vm.invitationID, inviteeID:vm.inviteeID}).$promise.then(function(results) {
            $scope.htmlTag = results.invitationDescription;
            $scope.imageUrl = results.templateURL;
            $scope.icsFileURL = results.icsFileURL

            var dynamic = $('#dynamicStyleViewInv');

            vm.height = 0;
            vm.width = 0;
            $('<img style="display:none;" src="' +  $scope.imageUrl + '"/>').appendTo('body').load(function() {
                var img = $(this);
                vm.height = img.height();
                vm.width = img.width();
                img.remove();
                dynamic.html('.viewInvInvClass{ background-image: url( ' + $scope.imageUrl + '); background-repeat: no-repeat; min-height: ' + vm.height + 'px !important; width: '+  vm.width +'px !important;}');
                                                                                                                                        
            });

        },
        function(data, status) {
            ToastService.show("right","bottom","fadeInUp",data.message,"error");
        });

        vm.confirmInvitation = function () {
            var newConfirm = new UpdateInviteeStatusResource();

            newConfirm.InviteeStatus = "Confirmed";

            newConfirm.$updateInviteeStatus({invitationID:vm.invitationID, inviteeID:vm.inviteeID, isConfirmed:true}).then(
                function (data, status) {
                    vm.ShowHideCond = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ConfirmSuccess'), "success");
                    confirmDWFile();
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        vm.rejectInvitation = function () {
            var newConfirm = new UpdateInviteeStatusResource();

            newConfirm.InviteeStatus = "Rejected";
            
            newConfirm.$updateInviteeStatus({invitationID:vm.invitationID, inviteeID:vm.inviteeID, isConfirmed:false}).then(
                function (data, status) {
                    vm.ShowHideCond = false;
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('RejectSuccess'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    }
}
());
