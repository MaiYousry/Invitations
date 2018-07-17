(function() {
    angular
      .module('home')
      .factory('TemplateResource', ['$resource', 'appCONSTANTS', TemplateResource])
      .factory('TemplatePagingResource', ['$resource', 'appCONSTANTS', TemplatePagingResource])
      //.factory('UpdateGroupResource', ['$resource', 'appCONSTANTS', UpdateGroupResource])
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

    // function UpdateGroupResource($resource, appCONSTANTS) {
    //   return $resource(appCONSTANTS.API_URL + 'Groups', {}, {
    //     updateGroup: { method: 'PUT', useToken: true} 
    //   })
    // }

    function DeleteTemplateResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Templates/:templateID', {}, {
        deleteTemplate: { method: 'Delete', useToken: true} 
      })
    }
      
  }());