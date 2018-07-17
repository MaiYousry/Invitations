(function () {
    'use strict';

    angular
        .module('home')
        .controller('groupController', ['$rootScope', '$scope', '$filter', '$translate', '$uibModal', '$state', 'DeleteGroupResource', 'GroupPagingResource','AddGroupResource', '$localStorage', 'authorizationService', 'appCONSTANTS','groupPagingPrepService', 'ToastService', groupController]);


    function groupController($rootScope, $scope, $filter, $translate, $uibModal, $state,DeleteGroupResource ,GroupPagingResource,AddGroupResource, $localStorage, authorizationService, appCONSTANTS,groupPagingPrepService, ToastService) {
        var vm = this;
        $scope.sidebar.show = true;
        $scope.header.show = true;
    
        vm.groupList = groupPagingPrepService;
      
        //console.log($scope.groupList);

        function refreshGroups(){
			var k = GroupPagingResource.getAllPagingGroups({page:vm.currentPage}).$promise.then(function(results) {
				//vm.Now = $scope.getCurrentTime();	
				vm.groupList = results;
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }
        
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshGroups();
		}

        function confirmationDelete(groupID){
			DeleteGroupResource.deleteGroup({groupID:groupID}).$promise.then(function(results) {
                ToastService.show("right","bottom","fadeInUp",$translate.instant('DeleteSuccess'),"success");
                vm.currentPage = 1;
				refreshGroups();
            },
            
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }
        
        vm.UpdateGroup = function (group) {
            $uibModal.open({
                templateUrl: './app/GlobalAdmin/group/templates/editGroup.html',
                controller: 'editGroupController',
                controllerAs: 'editGroupCtrl',
                resolve:{
                    Group: function(){return group},
                    callBackFunction:function(){return refreshGroups;}
                }
            });
        }
        
        vm.AddGroup = function () {
            $uibModal.open({
                templateUrl: './app/GlobalAdmin/group/templates/addGroup.html',
                controller: 'addGroupController',
                controllerAs: 'addGroupCtrl',
                resolve:{
                    callBackFunction:function(){return refreshGroups;}
                }

            });
        }

        vm.DeleteGroup = function(groupID, groupName){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
                    itemId: function() { return groupID },
                    itemName: function() { return groupName },
                    message: function() { return null },
					callBackFunction:function() { return confirmationDelete; }
				}
				
			});
		}

        // $scope.AddNewGroup = function () {
        //     var newGroup = new AddGroupResource();

        //     newGroup.GroupName = $scope.GroupName;
            
        //     newGroup.$create().then(
        //         function (data, status) {
        //             ToastService.show("right", "bottom", "fadeInUp", $translate.instant('GroupAddSuccess'), "success");

        //             localStorage.setItem('data', JSON.stringify(data.GroupID));
        //             $state.go('groups');

        //         },
        //         function (data, status) {
        //             ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        //         }
        //     );
        // }
        // $scope.updateStatus = function (user) {
        //     var newClient = new AddUserResource();
        //     newClient.UserId =user.userId;  
        //     newClient.IsActive = user.isActive;
        //     newClient.$create().then(
        //         function (data, status) {
        //             ToastService.show("right", "bottom", "fadeInUp", $translate.instant('ClientEditSuccess'), "success"); 
        //             localStorage.setItem('data', JSON.stringify(data.userId));
        //             //$state.go('product');

        //         },
        //         function (data, status) {
        //             ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
        //         }
        //     );
        // }
        // vm.currentPage = 1;
        // $scope.changePage = function (page) {
        //     vm.currentPage = page;
        //     refreshUsers();
		// }
		 
    }

}());