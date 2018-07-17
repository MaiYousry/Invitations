(function () {
    'use strict';

    angular
        .module('home')
        .controller('editGroupController', ['$rootScope', '$scope','$uibModalInstance','callBackFunction', '$filter', '$translate', '$uibModal', '$state', 'GroupResource', 'AddGroupResource', 'UpdateGroupResource', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService','Group', editGroupController]);


    function editGroupController($rootScope, $scope, $uibModalInstance,callBackFunction, $filter, $translate, $uibModal, $state , GroupResource, AddGroupResource, UpdateGroupResource, $localStorage, authorizationService, appCONSTANTS,ToastService, Group) {
        var vm = this;
        $scope.groupObj = "";
        vm.groupObj = Group;

        vm.close = function(){
            $uibModalInstance.dismiss('cancel');
            callBackFunction();
		}
     
        $scope.UpdateGroup = function () {
            var newGroup = new UpdateGroupResource();
            newGroup.GroupID =vm.groupObj.groupID;             
            newGroup.GroupName = vm.groupObj.groupName;
            newGroup.$updateGroup().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('EditSuccess'), "success");
                    $uibModalInstance.dismiss('cancel');
                    //$state.go('product');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
 
    }

})();


