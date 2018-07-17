(function() {
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
  
