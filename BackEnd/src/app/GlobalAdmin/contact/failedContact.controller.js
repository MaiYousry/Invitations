(function () {
    'use strict';

    angular
        .module('home')
        .controller('failedContactController', ['$rootScope', '$scope', '$filter', '$translate', '$uibModal', '$uibModalInstance', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS','failedContactsPrepService', 'ToastService', failedContactController]);

    function failedContactController($rootScope, $scope, $filter, $translate, $uibModal, $uibModalInstance, $state , $localStorage, authorizationService, appCONSTANTS,failedContactsPrepService, ToastService) {
        var vm = this;

        vm.failedList = failedContactsPrepService;

        vm.close = function(){
            $uibModalInstance.dismiss('cancel');
		}
      
    }

}());