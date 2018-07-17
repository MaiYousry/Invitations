(function() {
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
  
