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
        //vm.invitationDateTime = new Date();
        vm.selectedTemplate = [];
        vm.selectedInvitees = [];
        vm.InviteesList = [];
        vm.SelectedTemplateURL = "";
        vm.consumedInvitees = 0;
        vm.TotalInvitees = 0;
        vm.viewedConsumedValue = 0;

        var d = new Date();
        //var e = formatDate(d);
        vm.invitationDateTime = formatDate(d);

        function formatDate(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
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
				//console.log(vm.Templates);
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }

        // $scope.$watch(vm.selectedInvitees.length, function() {
        //     alert('hey, myVar has changed!');
        // });

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
            //vm.Now = $scope.getCurrentTime();	
            vm.InviteesList = results;

            $(".js-example-data-array-selected").select2({
                data: vm.InviteesList
              })
        },
        function(data, status) {
            ToastService.show("right","bottom","fadeInUp",data.message,"error");
        });

        vm.htmlVariable = 'Type here the invitation description!';


		// vm.invitationDateTime = "01/30/2018 2:58 PM"
        $scope.AddNewInvitation = function () {
            var newInvitation = new AddInvitationResource();

            newInvitation.invitationName = vm.InvitationName;
            //newInvitation.invitationDateTime = vm.invitationDateTime;
            newInvitation.invitationDescription = vm.htmlVariable;
            var flagDate = new Date($('#invitationDateTime').data('date'));
            if(flagDate == 'Invalid Date'){
                vm.invitationDateTime =  new Date(vm.invitationDateTime);
            }
            else{
                vm.invitationDateTime = new Date($('#invitationDateTime').data('date'));
            }
            //alert(vm.invitationDateTime);
            var date = new Date(vm.invitationDateTime);
            //alert(date);
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
                //function (data, status) {
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

        // Background image in TextEditor
        $scope.newSelection = function(TempIDOnSelect) {
           // console.log(value);

            vm.Templates.forEach(function(element) {
                if(element.templateID == TempIDOnSelect){
                    vm.selectedTemplate= angular.copy(element);
                    //vm.SelectedTemplateURL = localStorage.setItem('imageUrl', vm.selectedTemplate.templateURL);
                    vm.SelectedTemplateURL = vm.selectedTemplate.templateURL;

                    var dynamic = $('#dynamicStyle');

                    // var imageDim = $('#imageDimensions');
                    // var height = imageDim.height();
                    // var width = imageDim.width();
                    //console.log(vm.selectedTemplate);
                    vm.height = 0;
                    vm.width = 0;
                    $('<img style="display:none;" src="' +  vm.SelectedTemplateURL + '"/>').appendTo('body').load(function() {
                        var img = $(this);
                        vm.height = img.height();
                        vm.width = img.width();
                        img.remove();
                       // console.log(vm.height);
                      //  console.log( vm.width);
                        dynamic.html('.form-control{ background-image: url( ' + vm.SelectedTemplateURL + '); background-repeat: no-repeat;} .ta-scroll-window.form-control{ min-height: ' + vm.height + 'px !important; width: '+  vm.width +'px !important;} .ta-scroll-window>.ta-bind{ min-height: ' + vm.height + 'px !important; }');
                                                                                                                                                  
                    });

                    // console.log(height);
                    // console.log(width);
                    
                    
                  
              }
            }, this);
       }

       
        //End

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
           // alert(landingUrl);
           $window.open(landingUrl, '_blank');
            //    $scope.redirectToGoogle = function(){
                
            //     };
           // $window.location.href = landingUrl;

            // $uibModal.open({
            //     templateUrl: './app/GlobalAdmin/invitation/templates/viewTemplate.html',
            //     controller: 'viewInvitationController',
            //     controllerAs: 'viewInvitationCtrl'
            // });
        }

        function refreshTemplates(){
			var k = TemplateResource.getAllTemplates().$promise.then(function(results) {
				vm.Templates = results
				//console.log(vm.Templates);
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
