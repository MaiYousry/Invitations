(function () {
    'use strict';

    angular
        .module('home')
        .controller('contactGroupsContactController', ['$rootScope', '$scope','$uibModalInstance', '$filter', '$translate', '$uibModal', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService','ContactID', 'contactGroupsPrepService', 'GroupFilterByContactResource', contactGroupsContactController]);


    function contactGroupsContactController($rootScope, $scope, $uibModalInstance, $filter, $translate, $uibModal, $state, $localStorage, authorizationService, appCONSTANTS,ToastService, ContactID, contactGroupsPrepService, GroupFilterByContactResource) {
        var vm = this;
        $scope.contactObj = "";
        vm.contactID = ContactID;
        vm.groupsContactList = contactGroupsPrepService;

        vm.close = function(){
            $uibModalInstance.dismiss('cancel');
            callBackFunction();
        }
        
        $scope.ShowGroupsForCertainContact = function () {
            var groupsForContact = new GroupFilterByContactResource();
            groupsForContact.ContactID =vm.contactID;           

            groupsForContact.$getContactsForCertainGroup({contactID:groupsForContact.ContactID}).$promise.then(function(results) {
                         //vm.Now = $scope.getCurrentTime();	
                vm.groupsContactList = results;
            },
            function(data, status) {
                ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }
 
    }

})();


