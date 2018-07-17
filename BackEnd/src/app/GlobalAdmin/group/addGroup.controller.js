(function () {
    'use strict';

    angular
        .module('home')
        .controller('addGroupController', ['$rootScope', '$scope', '$filter','callBackFunction', '$translate', '$uibModal','$uibModalInstance', '$state', 'GroupResource','AddGroupResource', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService', addGroupController]);


    function addGroupController($rootScope, $scope, $filter,callBackFunction, $translate, $uibModal, $uibModalInstance, $state,GroupResource,AddGroupResource, $localStorage, authorizationService, appCONSTANTS, ToastService) {
        var vm = this;
        $scope.groupObj = "";

        vm.close = function(){
            $uibModalInstance.dismiss('cancel');
            callBackFunction();
		}
    
        $scope.AddNewGroup = function () {
            var newGroup = new AddGroupResource();

            newGroup.GroupName = $scope.GroupName;
            
            newGroup.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddSuccess'), "success");
                    callBackFunction();
                    //close popup after save
                    $uibModalInstance.dismiss('cancel');
                    //localStorage.setItem('data', JSON.stringify(data.GroupID));
                    //$state.go('groups');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
    
    }

}());