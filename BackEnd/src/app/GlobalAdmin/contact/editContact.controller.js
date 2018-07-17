(function () {
    'use strict';

    angular
        .module('home')
        .controller('editContactController', ['$rootScope', '$scope','$uibModalInstance','GroupFilterByContactResource', 'groupPrepService','callBackFunction', '$filter', '$translate', '$uibModal', '$state', 'ContactResource', 'AddContactResource', 'UpdateContactResource', '$localStorage', 'authorizationService', 'appCONSTANTS', 'ToastService','Contact', editContactController]);


    function editContactController($rootScope, $scope, $uibModalInstance, GroupFilterByContactResource,groupPrepService,callBackFunction, $filter, $translate, $uibModal, $state , ContactResource, AddContactResource, UpdateContactResource, $localStorage, authorizationService, appCONSTANTS,ToastService, Contact) {
        var vm = this;
        $scope.contactObj = "";
        vm.groupListSelection = groupPrepService;
        vm.selectedGroups = Contact.contactGroups;
        vm.contactObj = Contact;

        var contactIDD = vm.contactObj.contactID;

        $(".js-example-data-array-selected").select2({
            data: vm.groupListSelection
          })

        vm.close = function(){
            $uibModalInstance.dismiss('cancel');
            callBackFunction();
        }

        vm.backdrop = function(){
            $uibModalInstance.dismiss('cancel');
            callBackFunction();
        }
        
        $scope.UpdateContact = function () {
            var newContact = new UpdateContactResource();
            newContact.ContactID =vm.contactObj.contactID;             
            newContact.ContactName = vm.contactObj.contactName;
            newContact.ContactEmail = vm.contactObj.contactEmail;
            newContact.ContactMobileNum = vm.contactObj.contactMobileNum;
            newContact.ContactGroups =  vm.selectedGroups;
            newContact.$updateContact().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('EditSuccess'), "success");
                    $uibModalInstance.dismiss('cancel');
                    //$state.go('product');
                    callBackFunction();

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
 
    }

})();


