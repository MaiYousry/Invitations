(function () {
    'use strict';

    angular
        .module('home')
        .controller('addContactController', ['$rootScope', 'GroupResource', '$scope', '$filter','callBackFunction', '$translate', '$uibModal','$uibModalInstance', '$state', 'ContactResource','AddContactResource', '$localStorage', 'authorizationService', 'groupPrepService', 'appCONSTANTS', 'ToastService','AddGroupResource', addContactController]);


    function addContactController($rootScope, GroupResource, $scope, $filter,callBackFunction, $translate, $uibModal, $uibModalInstance, $state,ContactResource,AddContactResource, $localStorage, authorizationService, groupPrepService,appCONSTANTS, ToastService,AddGroupResource) {
        var vm = this;
        $scope.contactObj = "";
        vm.groupListSelection = groupPrepService;
        vm.selectedGroups = [];

        // $(".js-example-data-array").select2({
        //     data: vm.groupListSelection
        //   })
        
          $(".js-example-data-array-selected").select2({
            data: vm.groupListSelection
          })
      
        // $scope.selected = [
        //     { id: 1, name: "Item 1" }
        // ];

        // $scope.selectedGroups = [];

        // $scope.$watch('selected', function(nowSelected){
        //     $scope.selectedGroups = [];

        //     if ( ! nowSelected ){
        //         return;
        //     }

        //     angular.forEach(nowSelected, function(val) {
        //         $scope.selectedGroups.push(val.id.toString());
        //     });
        //});AddNewContactMore

        function refreshGroupsList(){
            var k = GroupResource.getAllGroups().$promise.then(function(results) {
				//vm.Now = $scope.getCurrentTime();	
                vm.groupListSelection = results;
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

        vm.close = function(){
            $uibModalInstance.dismiss('cancel');
            callBackFunction();
		}
    
        $scope.AddNewContact = function () {
            var newContact = new AddContactResource();

            newContact.GroupName =  vm.ContactGroupName;

            newContact.ContactName = $scope.ContactName;
            newContact.ContactEmail = $scope.ContactEmail;
            newContact.ContactMobileNum = $scope.ContactMobileNum;
            newContact.ContactGroups =  vm.selectedGroups;
            // newContact.GroupName =  $scope.ContactGroupName;
            //var k = vm.groupListSelection;
            newContact.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddSuccess'), "success");
                    callBackFunction();
                    //close popup after save
                    $uibModalInstance.dismiss('cancel');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        $scope.AddNewContactMore = function () {
            var newContact = new AddContactResource();

            newContact.GroupName =  vm.ContactGroupName;
            newContact.ContactName = $scope.ContactName;
            newContact.ContactEmail = $scope.ContactEmail;
            newContact.ContactMobileNum = $scope.ContactMobileNum;
            newContact.ContactGroups =  vm.selectedGroups;
            //newContact.GroupName =  $scope.ContactGroupName;
            //var k = vm.groupListSelection;
            newContact.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddSuccess'), "success");
                    callBackFunction();
                    $scope.ContactName="";
                    $scope.ContactEmail="";
                    $scope.ContactMobileNum="";
                    vm.selectedGroups=[];
                    vm.ContactGroupName="";
                    refreshGroupsList();
                    //close popup after save
                  //  $uibModalInstance.dismiss('cancel');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        // $scope.AddNewGroup = function () {
        //     var newGroup = new AddGroupResource();

        //     newGroup.GroupName = $scope.GroupName;
            
        //     newGroup.$create().then(
        //         function (data, status) {
        //             ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddSuccess'), "success");
        //             //callBackFunction();
        //             //close popup after save
        //             //$uibModalInstance.dismiss('cancel');
        //             //localStorage.setItem('data', JSON.stringify(data.GroupID));
        //             //$state.go('groups');

        //         },
        //         function (data, status) {
        //             ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        //         }
        //     );
        // }
    
    }

}());