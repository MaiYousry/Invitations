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
		//vm.Now = $scope.getCurrentTime();
        //$('.pmd-sidebar-nav>li>a').removeClass("active")		
        
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
