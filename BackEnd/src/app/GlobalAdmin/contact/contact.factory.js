(function() {
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
  
