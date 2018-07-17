(function () {
    'use strict';

    angular
        .module('home')
        .controller('contactController', ['$rootScope', '$http', '$scope', '$filter', 'AddContactListResource', 'GroupResource', '$translate', '$uibModal', '$state', 'DeleteContactResource', 'ContactPagingResource','AddContactResource', '$localStorage', 'authorizationService', 'appCONSTANTS','contactPagingPrepService', 'groupPrepService', 'ContactFilterByGroupResource', 'GroupFilterByContactResource', 'ToastService', contactController]);


    function contactController($rootScope, $http, $scope, $filter, AddContactListResource, GroupResource, $translate, $uibModal, $state,DeleteContactResource, ContactPagingResource,AddContactResource, $localStorage, authorizationService, appCONSTANTS,contactPagingPrepService,groupPrepService, ContactFilterByGroupResource, GroupFilterByContactResource,ToastService) {
        var vm = this;
        $scope.sidebar.show = true;
        $scope.header.show = true;
    
        vm.contactList = contactPagingPrepService;
        vm.groupList = [];
        $scope.selectedFile = null;
        vm.failedContactList = [];

        vm.groupList.push({groupID: -1, groupName: "All", userID: -1, groupIsDeleted: false});

        for(var i=0; i<groupPrepService.length; i++)
        {
            vm.groupList.push(groupPrepService[i]);
        }
        //vm.groupList.push(groupPrepService);
        vm.selectedGroup = vm.groupList[0];
        
        //console.log(vm.groupList);

        /********** Upload Excel**************/

        $scope.loadFile = function (files) {  
  
            $scope.$apply(function () {  
                $scope.selectedFile = files[0];
            })  
      
        } 

        $scope.handleFile = function () {  
  
            var file = $scope.selectedFile;  
      
            if (file) {  
                var reader = new FileReader();  
      
                reader.onload = function (e) {  
                    var data = e.target.result;  
                    var workbook = XLSX.read(data, { type: 'binary' });  
                    var first_sheet_name = workbook.SheetNames[0];  
                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
      
                    //console.log(excelData);  
                    if (dataObjects.length > 0) {  
                        $scope.save(dataObjects);  
                        
                    } else {  
                        $scope.msg = "Error : Sheet is Empty";  
                    }  
                }  
                reader.onerror = function (ex) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }  
                reader.readAsBinaryString(file);  
            }  
        }  

        $scope.save = function (data) {

            $http({  
                method: "POST",  
                url: appCONSTANTS.API_URL + 'ContactsList/',  
                useToken: true,
                data: JSON.stringify(data),  
                headers: {  
                    'Content-Type': 'application/json'  
                }  
      
            }).then(function (data) {  
                if (data.status) {  
                    if(data.data.length > 0){
                        //vm.failedContactList = data;
                        $uibModal.open({
                            templateUrl: './app/GlobalAdmin/contact/templates/failedContactList.html',
                            controller: 'failedContactController',
                            controllerAs: 'failedContactCtrl',
                            resolve:{
                                failedContactsPrepService: function(){return data.data;}
                            }
            
                        });

                    }
                    else{
                        ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddSuccess'), "success");
                        refreshContacts();
                    }
                }  
                else {  
                    $scope.msg = "Error : Sheet is Empty or Repeated Contacts";  
                }  
            }, function (error) {  
                $scope.msg = "Error : Sheet has repeated contacts or doesn't follow the recommended sample format";  
            })  
            //var newContactList = new AddContactListResource();
            
            // newContactList.contactModelList = data;

            //var k = vm.groupListSelection;
            // newContactList.$createContactList().then(
            //     function (data, status) {
            //         ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddSuccess'), "success");
            //         callBackFunction();

            //     },
            //     function (data, status) {
            //         ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
            //     }
            // );
        }

        /********** End Of Upload Excel**************/

        $scope.showSelectID = function() {
            // vm.selectedGroup = selected_Group.groupID;
            //alert(vm.selectedGroup);

            if(vm.selectedGroup.groupID == -1){
                vm.contactList = contactPagingPrepService;
            }
            
            else{
                var contactsForCertainGroup = ContactFilterByGroupResource.getContactsForCertainGroup({groupID:vm.selectedGroup.groupID}).$promise.then(function(results) {
                    //vm.Now = $scope.getCurrentTime();	
                     vm.contactList = results;
                
                },
                function(data, status) {
                    ToastService.show("right","bottom","fadeInUp",$translate.instant('NoContactsInThisGroup'),"error");
                    // ToastService.show("right","bottom","fadeInUp",data.message,"error");
                });
            }
            
        }
         
        function refreshContacts(){

            if(vm.selectedGroup.groupID == -1){
                var k = ContactPagingResource.getAllPagingContacts({page:vm.currentPage}).$promise.then(function(results) {
                    //vm.Now = $scope.getCurrentTime();	
                    vm.contactList = results;
                },
                function(data, status) {
                    ToastService.show("right","bottom","fadeInUp",data.message,"error");
                });
            }

            else{
                var contactsForCertainGroup = ContactFilterByGroupResource.getContactsForCertainGroup({groupID:vm.selectedGroup.groupID, page:vm.currentPage}).$promise.then(function(results) {
                    //vm.Now = $scope.getCurrentTime();	
                     vm.contactList = results;
                
                },
                function(data, status) {
                    ToastService.show("right","bottom","fadeInUp",$translate.instant('NoContactsInThisGroup'),"error");
                    // ToastService.show("right","bottom","fadeInUp",data.message,"error");
                });
            }
			
        }

        vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshContacts();
		}
        
        function confirmationDelete(contactID){
			DeleteContactResource.deleteContact({contactID:contactID}).$promise.then(function(results) {
                ToastService.show("right","bottom","fadeInUp",$translate.instant('DeleteSuccess'),"success");
                vm.currentPage = 1;
				refreshContacts();
            },
            
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

        vm.UpdateContact = function (contact) {
            var contactIDD = contact.contactID;
            GroupResource.getAllGroups().$promise.then(function(results) {
                    $uibModal.open({
                        templateUrl: './app/GlobalAdmin/contact/templates/editContact.html',
                        controller: 'editContactController',
                        controllerAs: 'editContactCtrl',
                        resolve:{
                            groupPrepService: function(){return results;},
                            Contact: function(){return contact},
                            callBackFunction:function(){return refreshContacts;}
                        }
                    });
            },
            function(data, status) {
                ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
           
        }

        vm.ShowGroupsForCertainContact = function (contactID) {
            GroupFilterByContactResource.getGroupsForCertainContact({contactID:contactID}).$promise.then(function(results) {
				
                $uibModal.open({
                    templateUrl: './app/GlobalAdmin/contact/templates/contactGroups.html',
                    controller: 'contactGroupsContactController',
                    controllerAs: 'contactGroupsContactCtrl',
                    resolve:{
                        ContactID: function(){return contactID},
                        contactGroupsPrepService:function(){ return results}
                    }
                });
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

        
        vm.AddContact = function () {
            GroupResource.getAllGroups().$promise.then(function(results) {
                $uibModal.open({
                    templateUrl: './app/GlobalAdmin/contact/templates/addContact.html',
                    controller: 'addContactController',
                    controllerAs: 'addContactCtrl',
                    resolve:{
                        groupPrepService: function(){return results;},
                        callBackFunction: function(){return refreshContacts;}
                    }
    
                });
            },
            function(data, status) {
                ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
            
        }

        vm.DeleteContact = function(contactID, contactName){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
                    itemId: function() { return contactID },
                    itemName: function() { return contactName },
                    message: function() { return null }, 
					callBackFunction:function() { return confirmationDelete; }
				}
				
			});
		}
    }
    

}());