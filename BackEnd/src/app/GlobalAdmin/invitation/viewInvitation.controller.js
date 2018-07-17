(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('viewInvitationController', ['$scope','$stateParams','$translate','appCONSTANTS','ToastService','$sce', 'InvitationResourceByID',  viewInvitationController])

    function viewInvitationController($scope,$stateParams ,$translate ,appCONSTANTS, ToastService,$sce, InvitationResourceByID){

        var vm = this;
        //Hide header and sidebar
        $scope.sidebar.show = false;
        $scope.header.show = false;

        $scope.htmlTag = $sce.trustAsHtml(localStorage.getItem("htmlTag"));
        $scope.imageUrl = localStorage.getItem("imageUrl");

        var dynamic = $('#dynamicStyleView');

        vm.height = 0;
        vm.width = 0;
        $('<img style="display:none;" src="' +  $scope.imageUrl + '"/>').appendTo('body').load(function() {
            var img = $(this);
            vm.height = img.height();
            vm.width = img.width();
            img.remove();
            dynamic.html('.viewInvClass{ background-image: url( ' + $scope.imageUrl + '); background-repeat: no-repeat; min-height: ' + vm.height + 'px !important; width: '+  vm.width +'px !important;}');
                                                                                                                                      
        });

        //if Cutomer ==> Get from DataBase
        if(($scope.htmlTag == null || $scope.htmlTag == "") &&  $scope.imageUrl == null){
        
            InvitationResourceByID.getCertainInvitation({invitationID:22}).$promise.then(function(results) {
				$scope.htmlTag = results.invitationDescription;
                $scope.imageUrl = results.templateURL;
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }
    }
}
());
