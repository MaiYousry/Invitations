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
  
