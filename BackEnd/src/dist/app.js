(function() {
    'use strict';

    angular
        .module('home')
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
              .state('groups', {
					url: '/groups',
                    templateUrl: './app/GlobalAdmin/group/templates/group.html',
                    controller: 'groupController',
                    'controllerAs': 'groupCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        }
                    },
                    resolve: {
                        groupPrepService: groupPrepService,
                        groupPagingPrepService: groupPagingPrepService
                    }

                                 })

                .state('contacts', {
					url: '/contacts',
                    templateUrl: './app/GlobalAdmin/contact/templates/contact.html',
                    controller: 'contactController',
                    'controllerAs': 'contactCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        }
                    },
                    resolve: {
                        contactPagingPrepService: contactPagingPrepService,
                        groupPrepService: groupPrepService
                    }

                                 })

                .state('templates', {
					url: '/templates',
                    templateUrl: './app/GlobalAdmin/template/templates/template.html',
                    controller: 'templateController',
                    'controllerAs': 'templateCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        }
                    },
                    resolve: {
                        templatePrepService: templatePrepService,
                        templatePagingPrepService: templatePagingPrepService
                    }

                                 })

                .state('invitations', {
					url: '/invitations',
                    templateUrl: './app/GlobalAdmin/invitation/templates/invitation.html',
                    controller: 'invitationController',
                    'controllerAs': 'invitationCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        }
                    },
                    resolve: {
                        templatePrepService: templatePrepService
                    }

                                 })

                .state('test', {
					url: '/test',
                    templateUrl: './app/GlobalAdmin/invitation/templates/test.html'

                                 })

                .state('viewInvitation', {
					url: '/viewInvitation',
                    templateUrl: './app/GlobalAdmin/invitation/templates/viewInvitation.html',
                    controller: 'viewInvitationController',
                    controllerAs: 'viewInvitationCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        }
                    }
                })

                .state('viewInvitationForInvitee', {
					url: '/viewInvitationForInvitee/:invitationID/:inviteeID',
                    templateUrl: './app/GlobalAdmin/invitation/templates/viewInvitationForInvitee.html',
                    controller: 'viewInvitationForInviteeController',
                    controllerAs: 'viewInvitationForInviteeCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        }
                    },
                    resolve: {
                        certainInviteePrepService: certainInviteePrepService
                    }
                })

                .state('invitationHistory', {
					url: '/invitationHistory',
                    templateUrl: './app/GlobalAdmin/invitation/templates/invitationHistory.html',
                    controller: 'invitationHistoryController',
                    controllerAs: 'invitationHistoryCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        }
                    },
                    resolve: {
                        invitationPrepService: invitationPrepService,
                        invitationPagingPrepService: invitationPagingPrepService
                    }
                })

                .state('inviteesOfInvitation', {
					url: '/inviteesOfInvitation/:invitationID',
                    templateUrl: './app/GlobalAdmin/Invitee/template/invitee.html',
                    controller: 'inviteeController',
                    controllerAs: 'inviteeCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        }
                    },
                    resolve: {
                        inviteesPagingPrepService: inviteesPagingPrepService
                    }
                })

                        });



        invitationPrepService.$inject = ['InvitationResource']

                function invitationPrepService(InvitationResource) {
            return InvitationResource.getAllInvitation().$promise;
        }

        certainInviteePrepService.$inject = ['GetInviteeResource', '$stateParams']

                function certainInviteePrepService(GetInviteeResource, $stateParams) {
            return GetInviteeResource.getInvitee({ inviteeID: $stateParams.inviteeID}).$promise;
        }

        invitationPagingPrepService.$inject = ['InvitationPagingResource']

                function invitationPagingPrepService(InvitationPagingResource) {
            return InvitationPagingResource.getAllPagingInvitation().$promise;
        }

        templatePrepService.$inject = ['TemplateResource']

                function templatePrepService(TemplateResource) {
            return TemplateResource.getAllTemplates().$promise;
        }

        templatePagingPrepService.$inject = ['TemplatePagingResource']

                function templatePagingPrepService(TemplatePagingResource) {
            return TemplatePagingResource.getAllPagingTemplates().$promise;
        }

        groupPrepService.$inject = ['GroupResource']

                function groupPrepService(GroupResource) {
            return GroupResource.getAllGroups().$promise;
        }

        groupPagingPrepService.$inject = ['GroupPagingResource']

                function groupPagingPrepService(GroupPagingResource) {
            return GroupPagingResource.getAllPagingGroups().$promise;
        }

        contactPrepService.$inject = ['ContactResource']

                function contactPrepService(ContactResource) {
            return ContactResource.getAllContacts().$promise;
        }

        contactPagingPrepService.$inject = ['ContactPagingResource']

                function contactPagingPrepService(ContactPagingResource) {
            return ContactPagingResource.getAllPagingContacts().$promise;
        }

        inviteesPagingPrepService.$inject = ['InviteeResourceByInvitationID', '$stateParams']

                function inviteesPagingPrepService(InviteeResourceByInvitationID, $stateParams) {
            return InviteeResourceByInvitationID.getInviteesOfInvitation({ invitationID: $stateParams.invitationID}).$promise;
        }

}());
(function() {
    'use strict';

      angular
      .module('home')
      .config(config)
      .run(runBlock);

      config.$inject = ['ngProgressLiteProvider'];
    runBlock.$inject = ['$rootScope', 'ngProgressLite' ];

      function config(ngProgressLiteProvider) {
      ngProgressLiteProvider.settings.speed = 1000;

      }

      function runBlock($rootScope, ngProgressLite ) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          startProgress();
      });
      var routingDoneEvents = ['$stateChangeSuccess', '$stateChangeError', '$stateNotFound'];

        angular.forEach(routingDoneEvents, function(event) {
        $rootScope.$on(event, function(event, toState, toParams, fromState, fromParams) {
          endProgress();
        });
      });

        function startProgress() {
        ngProgressLite.start();
      }

        function endProgress() {
        ngProgressLite.done();
      }

      }
  })();
  (function () {
    'use strict';

    angular
        .module('home')
        .controller('inviteeController', ['$rootScope', '$scope', '$stateParams', '$filter', '$translate', '$uibModal', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS','InviteeResourceByInvitationID', 'ToastService', 'InvitationResourceByID', 'inviteesPagingPrepService', inviteeController]);


    function inviteeController($rootScope, $scope, $stateParams, $filter, $translate, $uibModal, $state, $localStorage, authorizationService, appCONSTANTS,InviteeResourceByInvitationID, ToastService, InvitationResourceByID, inviteesPagingPrepService) {
        var vm = this;
        $scope.sidebar.show = true;
        $scope.header.show = true;
        vm.invitationID = $stateParams.invitationID;
        vm.html = "";
        vm.templateUrl="";

            vm.inviteesOfInvitationList = inviteesPagingPrepService;

        function refreshInvitees(){
			var k = InviteeResourceByInvitationID.getInviteesOfInvitation({invitationID:vm.invitationID, page:vm.currentPage}).$promise.then(function(results) {
                vm.inviteesOfInvitationList = results;
            },
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

        		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshInvitees();
		}


        InvitationResourceByID.getCertainInvitation({invitationID:vm.invitationID}).$promise.then(function(results) {
            vm.html = results.invitationDescription;
            vm.templateUrl = results.templateURL;

            var dynamic = $('#dynamicStyleHistory');

            vm.height = 0;
            vm.width = 0;
            $('<img style="display:none;" src="' +  vm.templateUrl + '"/>').appendTo('body').load(function() {
                var img = $(this);
                vm.height = img.height();
                vm.width = img.width();
                img.remove();
                dynamic.html('.invitationHistoryClass{ background-image: url( ' + vm.templateUrl + '); background-repeat: no-repeat; min-height: ' + vm.height + 'px !important; width: '+  vm.width +'px !important;}');

                                                                                                                                                    });
        },
        function(data, status) {
            ToastService.show("right","bottom","fadeInUp",data.message,"error");
        });

    }

}());(function() {
    angular
      .module('home')
      .factory('AddInviteeResource', ['$resource', 'appCONSTANTS', AddInviteeResource])
      .factory('InviteeResource', ['$resource', 'appCONSTANTS', InviteeResource])
      .factory('InviteeResourceByInvitationID', ['$resource', 'appCONSTANTS', InviteeResourceByInvitationID])
      .factory('UpdateInviteeResource', ['$resource', 'appCONSTANTS', UpdateInviteeResource])
      .factory('DeleteInviteeResource', ['$resource', 'appCONSTANTS', DeleteInviteeResource]);

      function AddInviteeResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitees/', {}, { 
        addInvitee: { method: 'POST',useToken: true}
      })
    }

        function InviteeResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitees', {}, {
        getAllInvitee: { method: 'GET', useToken: true, isArray:true } 
      })
    }

    function InviteeResourceByInvitationID($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'InviteesByID/:invitationID', {}, {
        getInviteesOfInvitation: { method: 'GET', useToken: true} 
      })
    }

    function UpdateInviteeResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitees', {}, {
        updateInvitee: { method: 'PUT', useToken: true} 
      })
    }

    function DeleteInviteeResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitees/:groupID', {}, {
        deleteInvitee: { method: 'Delete', useToken: true} 
      })
    }

        }());

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


                  $(".js-example-data-array-selected").select2({
            data: vm.groupListSelection
          })






        function refreshGroupsList(){
            var k = GroupResource.getAllGroups().$promise.then(function(results) {
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
            newContact.$create().then(
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddSuccess'), "success");
                    callBackFunction();
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

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }





        }

}());(function () {
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
        vm.selectedGroup = vm.groupList[0];



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



        }


        $scope.showSelectID = function() {

            if(vm.selectedGroup.groupID == -1){
                vm.contactList = contactPagingPrepService;
            }

                        else{
                var contactsForCertainGroup = ContactFilterByGroupResource.getContactsForCertainGroup({groupID:vm.selectedGroup.groupID}).$promise.then(function(results) {
                     vm.contactList = results;

                                },
                function(data, status) {
                    ToastService.show("right","bottom","fadeInUp",$translate.instant('NoContactsInThisGroup'),"error");
                });
            }

                    }

                 function refreshContacts(){

            if(vm.selectedGroup.groupID == -1){
                var k = ContactPagingResource.getAllPagingContacts({page:vm.currentPage}).$promise.then(function(results) {
                    vm.contactList = results;
                },
                function(data, status) {
                    ToastService.show("right","bottom","fadeInUp",data.message,"error");
                });
            }

            else{
                var contactsForCertainGroup = ContactFilterByGroupResource.getContactsForCertainGroup({groupID:vm.selectedGroup.groupID, page:vm.currentPage}).$promise.then(function(results) {
                     vm.contactList = results;

                                },
                function(data, status) {
                    ToastService.show("right","bottom","fadeInUp",$translate.instant('NoContactsInThisGroup'),"error");
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


    }());(function() {
    angular
      .module('home')
      .factory('ContactResource', ['$resource', 'appCONSTANTS', ContactResource])
      .factory('ContactPagingResource', ['$resource', 'appCONSTANTS', ContactPagingResource])
      .factory('UpdateContactResource', ['$resource', 'appCONSTANTS', UpdateContactResource])
      .factory('DeleteContactResource', ['$resource', 'appCONSTANTS', DeleteContactResource])
      .factory('ContactFilterByGroupResource', ['$resource', 'appCONSTANTS', ContactFilterByGroupResource])
      .factory('GroupFilterByContactResource', ['$resource', 'appCONSTANTS', GroupFilterByContactResource])
      .factory('AddContactListResource', ['$resource', 'appCONSTANTS', AddContactListResource])
      .factory('AddContactResource', ['$resource', 'appCONSTANTS', AddContactResource]);

      function AddContactResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Contacts/', {}, { 
        create: { method: 'POST',useToken: true}
      })
    }

        function AddContactListResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'ContactsList/', {}, { 
        createContactList: { method: 'POST',useToken: true,isArray:true}
      })
    }

        function ContactResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Contacts', {}, {
        getAllContacts: { method: 'GET', useToken: true, isArray:true } 
      })
    }

    function ContactPagingResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'ContactsPaging', {}, {
        getAllPagingContacts: { method: 'GET', useToken: true} 
      })
    }

    function ContactFilterByGroupResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Br_GroupContact/:groupID', {}, {
        getContactsForCertainGroup: { method: 'GET', useToken: true} 
      })
    }

    function GroupFilterByContactResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Br_ContactGroup/:contactID', {}, {
        getGroupsForCertainContact: { method: 'GET', useToken: true, isArray:true } 
      })
    }

    function UpdateContactResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Contacts', {}, {
        updateContact: { method: 'PUT', useToken: true} 
      })
    }

    function DeleteContactResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Contacts/:contactID', {}, {
        deleteContact: { method: 'Delete', useToken: true} 
      })
    }

        }());

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
                vm.groupsContactList = results;
            },
            function(data, status) {
                ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

     }

})();


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
                    callBackFunction();

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

     }

})();


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

}());(function () {
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
                    $uibModalInstance.dismiss('cancel');

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        }

}());(function () {
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

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

     }

})();


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


        function refreshGroups(){
			var k = GroupPagingResource.getAllPagingGroups({page:vm.currentPage}).$promise.then(function(results) {
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







		     }

}());(function() {
    angular
      .module('home')
      .factory('GroupResource', ['$resource', 'appCONSTANTS', GroupResource])
      .factory('UpdateGroupResource', ['$resource', 'appCONSTANTS', UpdateGroupResource])
      .factory('DeleteGroupResource', ['$resource', 'appCONSTANTS', DeleteGroupResource])
      .factory('GroupPagingResource', ['$resource', 'appCONSTANTS', GroupPagingResource])
      .factory('AddGroupResource', ['$resource', 'appCONSTANTS', AddGroupResource]);

      function AddGroupResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Groups/', {}, { 
        create: { method: 'POST',useToken: true}
      })
    }

        function GroupResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Groups', {}, {
        getAllGroups: { method: 'GET', useToken: true, isArray:true } 
      })
    }

    function GroupPagingResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'GroupsPaging', {}, {
        getAllPagingGroups: { method: 'GET', useToken: true } 
      })
    }

    function UpdateGroupResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Groups', {}, {
        updateGroup: { method: 'PUT', useToken: true} 
      })
    }

    function DeleteGroupResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Groups/:groupID', {}, {
        deleteGroup: { method: 'Delete', useToken: true} 
      })
    }

        }());

  (function () {
    'use strict';	
    angular
        .module('home')
        .controller('confirmDWFileController', ['$uibModalInstance', '$location', '$window', 'filePath',  confirmDWFileController])

	                                    		function confirmDWFileController($uibModalInstance, $location, $window, filePath){
		var vm = this;
		vm.filePath = filePath;

			vm.close = function(){
			$uibModalInstance.dismiss();
		}

				vm.Confirm = function(){
            $window.location.href = filePath;
			$uibModalInstance.dismiss();
		}
	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('invitationController', ['$scope', '$window', '$stateParams','$translate', 'templatePrepService', 'appCONSTANTS','$uibModal','ToastService', 'AddInvitationResource', 'SelectIndAndGroupResource', 'TemplateResource', 'GetTotalAndConsumedInviteesResource',  invitationController])

    function invitationController($scope, $window, $stateParams ,$translate , templatePrepService, appCONSTANTS,$uibModal, ToastService, AddInvitationResource, SelectIndAndGroupResource, TemplateResource, GetTotalAndConsumedInviteesResource){

        $scope.sidebar.show = true;
        $scope.header.show = true;

        var vm = this;
        vm.Templates = templatePrepService;
        vm.selectedTemplateId = 0;
        vm.selectedTemplate = [];
        vm.selectedInvitees = [];
        vm.InviteesList = [];
        vm.SelectedTemplateURL = "";
        vm.consumedInvitees = 0;
        vm.TotalInvitees = 0;
        vm.viewedConsumedValue = 0;

        var d = new Date();
        vm.invitationDateTime = formatDate(d);

        function formatDate(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; 
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
          }

        getTotalAndConsumedInvitees();
        vm.test = vm.selectedInvitees.length;

        function getTotalAndConsumedInvitees(){
			var k = GetTotalAndConsumedInviteesResource.getPackage().$promise.then(function(results) {
                vm.TotalInvitees = results.limit;
                vm.consumedInvitees = results.userConsumer;
                vm.viewedConsumedValue = vm.consumedInvitees;
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }


        vm.counterContacts = 0;
        vm.TotalConsumedChange = 0;
        vm.NewConsumed = 0;
        vm.ChangeSelectedInvitees = function (changedList) {

            if(changedList == null){
                vm.viewedConsumedValue = vm.consumedInvitees;
            }

            else{
                changedList.forEach(element => {
                    vm.counterContacts += element.totalContacts;
                });
                vm.NewConsumed = vm.counterContacts;
                vm.TotalConsumedChange = vm.counterContacts + vm.consumedInvitees;
                vm.viewedConsumedValue = vm.TotalConsumedChange;
                vm.counterContacts = 0;
            }
        }

        var m = SelectIndAndGroupResource.getIndvAndGroup().$promise.then(function(results) {
            vm.InviteesList = results;

            $(".js-example-data-array-selected").select2({
                data: vm.InviteesList
              })
        },
        function(data, status) {
            ToastService.show("right","bottom","fadeInUp",data.message,"error");
        });

        vm.htmlVariable = 'Type here the invitation description!';


        $scope.AddNewInvitation = function () {
            var newInvitation = new AddInvitationResource();

            newInvitation.invitationName = vm.InvitationName;
            newInvitation.invitationDescription = vm.htmlVariable;
            var flagDate = new Date($('#invitationDateTime').data('date'));
            if(flagDate == 'Invalid Date'){
                vm.invitationDateTime =  new Date(vm.invitationDateTime);
            }
            else{
                vm.invitationDateTime = new Date($('#invitationDateTime').data('date'));
            }
            var date = new Date(vm.invitationDateTime);
            newInvitation.invitationDateTime = date;
            newInvitation.inviteesData =  vm.selectedInvitees;
            newInvitation.consumedPackage =  vm.NewConsumed;

            vm.Templates.forEach(function(element) {
                if(element.templateID == vm.selectedTemplateId){
                    vm.selectedTemplate= angular.copy(element);
                    newInvitation.templateID =   vm.selectedTemplate.templateID;
                }
            }, this);

                        newInvitation.$addInvitation().then(function(results){
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddSuccess'), "success");
                    var host = $window.location.host;
                    var landingUrl = "http://" + host + "/#!/inviteesOfInvitation/" + results.invitationID;

                            $window.location.href = landingUrl;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        $scope.newSelection = function(TempIDOnSelect) {

            vm.Templates.forEach(function(element) {
                if(element.templateID == TempIDOnSelect){
                    vm.selectedTemplate= angular.copy(element);
                    vm.SelectedTemplateURL = vm.selectedTemplate.templateURL;

                    var dynamic = $('#dynamicStyle');

                    vm.height = 0;
                    vm.width = 0;
                    $('<img style="display:none;" src="' +  vm.SelectedTemplateURL + '"/>').appendTo('body').load(function() {
                        var img = $(this);
                        vm.height = img.height();
                        vm.width = img.width();
                        img.remove();
                        dynamic.html('.form-control{ background-image: url( ' + vm.SelectedTemplateURL + '); background-repeat: no-repeat;} .ta-scroll-window.form-control{ min-height: ' + vm.height + 'px !important; width: '+  vm.width +'px !important;} .ta-scroll-window>.ta-bind{ min-height: ' + vm.height + 'px !important; }');

                                                                                                                                                                      });




                                                                        }
            }, this);
       }



        vm.viewInvitation = function () {
            localStorage.setItem('htmlTag', vm.htmlVariable);
            vm.Templates.forEach(function(element) {
                if(element.templateID == vm.selectedTemplateId){
                   vm.selectedTemplate= angular.copy(element);
                   localStorage.setItem('imageUrl', vm.selectedTemplate.templateURL);
              }
            }, this);

            var host = $window.location.host;
            var landingUrl = "http://" + host + "/#!/viewInvitation";
           $window.open(landingUrl, '_blank');


        }

        function refreshTemplates(){
			var k = TemplateResource.getAllTemplates().$promise.then(function(results) {
				vm.Templates = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

        vm.AddTemplate = function () {
            $uibModal.open({
                templateUrl: './app/GlobalAdmin/template/templates/addTemplate.html',
                controller: 'addTemplateController',
                controllerAs: 'addTemplateCtrl',
                resolve:{
                    callBackFunction:function(){return refreshTemplates;}
                }

            });
		}

	}
}
());
(function() {
    angular
      .module('home')
      .factory('AddInvitationResource', ['$resource', 'appCONSTANTS', AddInvitationResource])
      .factory('InvitationResource', ['$resource', 'appCONSTANTS', InvitationResource])
      .factory('InvitationPagingResource', ['$resource', 'appCONSTANTS', InvitationPagingResource])
      .factory('InvitationResourceForInvitee', ['$resource', 'appCONSTANTS', InvitationResourceForInvitee])
      .factory('InvitationResourceByID', ['$resource', 'appCONSTANTS', InvitationResourceByID])
      .factory('SelectIndAndGroupResource', ['$resource', 'appCONSTANTS', SelectIndAndGroupResource])
      .factory('UpdateInvitationResource', ['$resource', 'appCONSTANTS', UpdateInvitationResource])
      .factory('UpdateInviteeStatusResource', ['$resource', 'appCONSTANTS', UpdateInviteeStatusResource])
      .factory('GetInviteeResource', ['$resource', 'appCONSTANTS', GetInviteeResource])
      .factory('GetTotalAndConsumedInviteesResource', ['$resource', 'appCONSTANTS', GetTotalAndConsumedInviteesResource])      
      .factory('DeleteInvitationResource', ['$resource', 'appCONSTANTS', DeleteInvitationResource]);

      function AddInvitationResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitations/', {}, { 
        addInvitation: { method: 'POST',useToken: true}
      })
    }

        function InvitationResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitations', {}, {
        getAllInvitation: { method: 'GET', useToken: true, isArray:true } 
      })
    }

    function InvitationPagingResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'InvitationsPaging', {}, {
        getAllPagingInvitation: { method: 'GET', useToken: true } 
      })
    }

    function SelectIndAndGroupResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitees', {}, {
        getIndvAndGroup: { method: 'GET', useToken: true, isArray:true } 
      })
    }

    function InvitationResourceByID($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitations/:invitationID', {}, {
        getCertainInvitation: { method: 'GET', useToken: true} 
      })
    }

    function InvitationResourceForInvitee($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitations/:invitationID/:inviteeID', {}, {
        getinviteeInvitation: { method: 'GET'} 
      })
    }

    function UpdateInvitationResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitations', {}, {
        updateInvitation: { method: 'PUT', useToken: true} 
      })
    }

    function UpdateInviteeStatusResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitees/:invitationID/:inviteeID/:isConfirmed', {}, {
        updateInviteeStatus: { method: 'PUT'} 
      })
    }

    function GetInviteeResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitees/:inviteeID', {}, {
        getInvitee: { method: 'GET'} 
      })
    }

    function DeleteInvitationResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Invitations/:groupID', {}, {
        deleteInvitation: { method: 'Delete', useToken: true} 
      })
    }

    function GetTotalAndConsumedInviteesResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Packages', {}, {
        getPackage: { method: 'GET', useToken: true} 
      })
    }

        }());

  (function () {
    'use strict';

    angular
        .module('home')
        .controller('invitationHistoryController', ['$rootScope', '$window', 'InvitationPagingResource', '$scope', '$filter', '$translate', '$uibModal', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS','invitationPagingPrepService', 'ToastService', invitationHistoryController]);


    function invitationHistoryController($rootScope, $window, InvitationPagingResource, $scope, $filter, $translate, $uibModal, $state, $localStorage, authorizationService, appCONSTANTS,invitationPagingPrepService, ToastService) {
        var vm = this;
        $scope.sidebar.show = true;
        $scope.header.show = true;

            vm.invitationList = invitationPagingPrepService;

        vm.InvitationDetails = function (invitationID) {
            var host = $window.location.host;
            var landingUrl = "http://" + host + "/#!/inviteesOfInvitation/" + invitationID;

            $window.location.href = landingUrl;
        }

        function refreshInvitations(){
			var k = InvitationPagingResource.getAllPagingInvitation({page:vm.currentPage}).$promise.then(function(results) {
				vm.invitationList = results;
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

        		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshInvitations();
		}


    }

}());(function () {
    'use strict';

	    angular
        .module('home')
        .controller('viewInvitationController', ['$scope','$stateParams','$translate','appCONSTANTS','ToastService','$sce', 'InvitationResourceByID',  viewInvitationController])

    function viewInvitationController($scope,$stateParams ,$translate ,appCONSTANTS, ToastService,$sce, InvitationResourceByID){

        var vm = this;
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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('viewInvitationForInviteeController', ['$scope', '$uibModal', '$stateParams','$translate', 'certainInviteePrepService', 'appCONSTANTS','ToastService','$sce', 'InvitationResourceForInvitee', 'UpdateInviteeStatusResource',  viewInvitationForInviteeController])

    function viewInvitationForInviteeController($scope, $uibModal, $stateParams ,$translate, certainInviteePrepService, appCONSTANTS, ToastService,$sce, InvitationResourceForInvitee, UpdateInviteeStatusResource){

        var vm = this;
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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('addTemplateController', ['$scope','$state','$uibModalInstance','$http','$translate','appCONSTANTS' , 'AddTemplateResource','ToastService','callBackFunction','$rootScope',  addTemplateController])

	function addTemplateController($scope, $state , $uibModalInstance,$http, $translate,appCONSTANTS , AddTemplateResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
        vm.templateName = "";

        		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.AddTemplate = function(){
            var newTemplate = new Object();
            newTemplate.templateName = vm.templateName; 

			var model = new FormData();
			model.append('data', JSON.stringify(newTemplate));
			model.append('file', templateImage);
			$http({
				method: 'POST',
				url: appCONSTANTS.API_URL + 'Templates',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('AddSuccess'),"success"); 
					 $uibModalInstance.dismiss('cancel');
					 callBackFunction();
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				}
            );
        }

                vm.LoadUploadImage = function() {
			$("#templateImage").click();
        }

        		var templateImage; 
		$scope.AddTemplateImage = function(element) {
            vm.templateName = element[0].name;
			var imageFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
					$scope.newTemplateForm.$dirty=true;
					$scope.$apply(function() {

												templateImage= imageFile;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.templateImage= reader.result;

														$scope.$apply();
						};
						if (imageFile) {
							reader.readAsDataURL(imageFile);
						}
					})
				} else {
					$("#logoImage").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imageTypeError'),"error");
				}

			} else {
				if (imageFile) {
					$("#logoImage").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imgaeSizeError'),"error");
				}

			}


		}
	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('templateController', ['$scope','$stateParams','$translate', 'appCONSTANTS','$uibModal','TemplatePagingResource', 'templatePagingPrepService','ToastService' , 'DeleteTemplateResource',  templateController])

    function templateController($scope,$stateParams ,$translate , appCONSTANTS,$uibModal,TemplatePagingResource, templatePagingPrepService, ToastService, DeleteTemplateResource){

        var vm = this;

        $scope.sidebar.show = true;
        $scope.header.show = true;

		vm.Templates = templatePagingPrepService;
		console.log(vm.Templates);

        		function refreshTemplates(){
			var k = TemplatePagingResource.getAllPagingTemplates({page:vm.currentPage}).$promise.then(function(results) {
				vm.Templates = results
				console.log(vm.Templates);
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshTemplates();
        }

        vm.AddTemplate = function () {
            $uibModal.open({
                templateUrl: './app/GlobalAdmin/template/templates/addTemplate.html',
                controller: 'addTemplateController',
                controllerAs: 'addTemplateCtrl',
                resolve:{
                    callBackFunction:function(){return refreshTemplates;}
                }

            });
		}

				vm.DeleteTemplate = function(templateID){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
                    itemId: function() { return templateID },
                    itemName: function() { return null },
                    message: function() { return null },
					callBackFunction:function() { return confirmationDelete; }
				}

							});
		}

		function confirmationDelete(templateID){
			DeleteTemplateResource.deleteTemplate({templateID:templateID}).$promise.then(function(results) {
                ToastService.show("right","bottom","fadeInUp",$translate.instant('DeleteSuccess'),"success");
                vm.currentPage = 1;
				refreshTemplates();
            },

                        function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }



        					}

	}
());
(function() {
    angular
      .module('home')
      .factory('TemplateResource', ['$resource', 'appCONSTANTS', TemplateResource])
      .factory('TemplatePagingResource', ['$resource', 'appCONSTANTS', TemplatePagingResource])
      .factory('DeleteTemplateResource', ['$resource', 'appCONSTANTS', DeleteTemplateResource])
      .factory('AddTemplateResource', ['$resource', 'appCONSTANTS', AddTemplateResource]);

      function AddTemplateResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Templates/', {}, { 
        addTemplate: { method: 'POST',useToken: true}
      })
    }

        function TemplateResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Templates', {}, {
        getAllTemplates: { method: 'GET', useToken: true, isArray:true } 
      })
    }

    function TemplatePagingResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'TemplatesPaging', {}, {
        getAllPagingTemplates: { method: 'GET', useToken: true } 
      })
    }


    function DeleteTemplateResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Templates/:templateID', {}, {
        deleteTemplate: { method: 'Delete', useToken: true} 
      })
    }

        }());