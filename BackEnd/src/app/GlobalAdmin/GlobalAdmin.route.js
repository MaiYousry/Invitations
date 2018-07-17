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
                        groupPrepService: groupPrepService//,
                       // addContactPrepService: addContactPrepService
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

        // inviteesOfInvitationPrepService.$inject = ['InviteeResourceByInvitationID']
        
        // function inviteesOfInvitationPrepService(InviteeResourceByInvitationID) {
        //     return InviteeResourceByInvitationID.getInviteesOfInvitation().$promise;
        // }

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
