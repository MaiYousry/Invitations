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
            //$location.path(filePath);
            $window.location.href = filePath;
			$uibModalInstance.dismiss();
		}
	}	
}());
