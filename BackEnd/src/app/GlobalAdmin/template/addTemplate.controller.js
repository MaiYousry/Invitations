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
