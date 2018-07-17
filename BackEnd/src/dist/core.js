(function() {
    'use strict';

    angular
    .module('core', [
    		'ngResource',
        'ui.router',
        //'ngMaterial',
        'ngStorage',
      'permission',
      'bw.paging',
      //'angular-progress-arc',
      'ui.event',
      'ngProgressLite',
    'ui.bootstrap',
    'pascalprecht.translate',
    'textAngular',
    'slickCarousel'
    ]);
}());
;(function() {
  'use strict';

  angular
  .module('home', [
  'core'
  ]);
 
}());
;(function() {
  'use strict';

  angular
      .module('core')
      // registering 'lodash' as a constant to be able to inject it later
      .constant('_', window._)
      .run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      })
/*      .config(function($mdThemingProvider, $mdIconProvider) {
        // angular material design configs
        $mdIconProvider
            .defaultIconSet('./assets/svg/avatars.svg', 128);

        // use default purble color for now - uncomment to change colors
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('orange');
      })*/;

      
}());
;(function() {
	angular
		.module('core')
		.constant('appCONSTANTS', { 
 		 'API_URL': 'http://invitationsbackend.azurewebsites.net/api/',
		  	// 'API_URL': 'http://localhost:33343/api/',
			'defaultLanguage':'en'
		})
		.constant('messageTypeEnum', {
			success: 0,
			warning: 1,
			error: 2
		}).constant('userRolesEnum', {
			GlobalAdmin:"GlobalAdmin"
    });
}());;(function() {
    'use strict';

    angular
        .module('core')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            // main views
            $stateProvider
              .state('root', {
                    url: '/',
               
                    controller: 'loginController',
                   
                    data: {
                       permissions: {
                          
                        }
                    },
                 
                })
                .state('login', {
                    url: '/login',
                    templateUrl: './app/core/login/templates/login.html',
                    'controller': 'loginController'
                })
                .state('403', {
                    url: '/403',
                    templateUrl: './app/shell/403.html'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: './app/shell/404.html'
                })
                .state('401', {
                    url: '/401',
                    templateUrl: './app/shell/401.html'
                })
        });
    
}());
;
angular.module('core')

  .directive('equalto', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        otherModelValue: '=equalto'
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.equalto = function(modelValue) {
          return modelValue == scope.otherModelValue.$modelValue;
        };
        scope.$watch('otherModelValue.$modelValue', function() {
          ngModel.$validate();
        },true);

      }
    };
  }

)
.directive('numbersOnly', function () {
  return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
              if (text) {
                  var transformedInput = text.replace(/[^0-9]/g, '');

                  if (transformedInput !== text) {
                      ngModelCtrl.$setViewValue(transformedInput);
                      ngModelCtrl.$render();
                  }
                  return transformedInput;
              }
              return undefined;
          }            
          ngModelCtrl.$parsers.push(fromUser);
      }
  };
})
.directive('loadingPane', function ($timeout, $window) {
  return {
      restrict: 'A',
      link: function (scope, element, attr) {
          var directiveId = 'loadingPane';

          var targetElement;
          var paneElement;
          var throttledPosition;

          function init(element) {
              targetElement = element;

              paneElement = angular.element('<div>');
              paneElement.addClass('loading-pane');

              if (attr['id']) {
                  paneElement.attr('data-target-id', attr['id']);
              }

              var spinnerImage = angular.element('<div>');
              spinnerImage.addClass('spinner-image');
              spinnerImage.appendTo(paneElement);

              angular.element('body').append(paneElement);

              setZIndex();

              //reposition window after a while, just in case if:
              // - watched scope property will be set to true from the beginning
              // - and initial position of the target element will be shifted during page rendering
              $timeout(position, 100);
              $timeout(position, 200);
              $timeout(position, 300);

              throttledPosition = _.throttle(position, 50);
              angular.element($window).scroll(throttledPosition);
              angular.element($window).resize(throttledPosition);
          }

          function updateVisibility(isVisible) {
              if (isVisible) {
                  show();
              } else {
                  hide();
              }
          }

          function setZIndex() {                
              var paneZIndex = 500;

              paneElement.css('zIndex', paneZIndex).find('.spinner-image').css('zIndex', paneZIndex + 1);
          }

          function position() {
              paneElement.css({
                  'left': targetElement.offset().left,
                  'top': targetElement.offset().top - $(window).scrollTop(),
                  'width': targetElement.outerWidth(),
                  'height': targetElement.outerHeight()
              });
          }

          function show() {
              paneElement.show();
              position();
          }

          function hide() {
              paneElement.hide();
          }

          init(element);

          scope.$watch(attr[directiveId], function (newVal) {
              updateVisibility(newVal);
          });

          scope.$on('$destroy', function cleanup() {
              paneElement.remove();
              $(window).off('scroll', throttledPosition);
              $(window).off('resize', throttledPosition);
          });
      }
  };
});
;
;(function() {
    'use strict';
  
    angular
    .module('core').config(["$translateProvider","appCONSTANTS",function($translateProvider,appCONSTANTS){
          
          var en_translations = { 
              "FirstNameLbl" : "FirstName",
              "LastNameLbl" : "lastName",
              
              "Phone2Lbl" : "Phone2",
              "FirstNameLengthError" : "FirstName is required",
              "LastNameLengthError" : "LastName is required",
              
             
              
              
              "NotPhoneNumber" : "please enter numbers only",
              "PasswordLengthError" : "Password is required",
              "UserPasswordLbl":"password",
              "ConfirmPasswordLbl":"Confirm password",
              "saveChangesBtn":"save changes",
              "DiscardBtn":"Discard",
              "ClientAddSuccess":"Client Add Success",
              "BackageAddSuccess":"Backage Add Success",
              "BackageEditSuccess":"Backage Edit Success",
              "ClientEditSuccess":"Client Edit Success",
              "LimitUserValidation":"Must be at least 1 user",
              "AddUserBtn":"Add new user", 
              "BasicInfoLbl":"Basic Info",
              "NextLbl":"Next", 
              "userName":"UserName",
              "StatusLbl":"Status",
              "ProductTitleLbl":"Product Title",
              "ProductDescLbl":"Product Desc",
              "ProductCountLbl":"Backage Count",
              "Edit":"Edit",
              "userlimitLbl":"user Limit",
              "concumerLbl":"Consumer User",
              "startDateLbl":"Start Date",
              "enddateLbl":"End Date ", 
              "AddProductBtn":"Add Product",
              "Products":"Products",
              
              "user":"Users",
              "logoutBtn":"logout",
              
              "passworddontmatch":"Passwords don't match",
              
            // *******
            "dwConfirmationLbl":"Would you like add event to your calendar",
            "ConfirmBtn":"Confirm",
            "RejectBtn":"Reject",
            "InvitationNameLbl":"Invitation Name",
            "NoTemplateAvailable":"No Template Available",
            "FilterByGroup":"Filter By Group",
            "MonileNumberLengthError" : "digits must be from 10 :50",
              "MobileNumberReqError" : "Phone is required",
              "MobileNumberLbl" : "Mobile Number",
              "EmailRequiredError" : "Email is required",
              "TextOnly":"Text Only",
              "WrongMail":"please enter right email format",
              "group":"Groups",
              "contact":"Contacts",
              "history":"History",
              "newInvitation":"Send Invitation",
              "groupName":"Group Name",
              "NogroupAvailable":"No group Available",
              "AddBtn":"Add", 
              "AddSuccess":"Added Successfully",
              "GroupNameLbl":"Group Name",
              "GroupNameLengthError":"Group Name is Required",
              "EditSuccess":"Edited Successfully",
              "UpdateGroupLbl":"Update Group",
              "GroupInfo":"Group Information",
              "requiredErr":"Required Field",
              "NameLengthError" : "character must be from 3 :50",
              "AddGroupLbl":"Add Group",
              "deleteConfirmationLbl":"Delete Confirmation",
              "deleteBtn":"Delete",
              "cancelBtn":"Cancel",
              "DeleteSuccess":"Deleted Succefully",

              "NoContactAvailable":"No Contact Available",
              "ContactName":"Contact Name",
              "ContactEmail":"Email",
              "ContactMobileNum":"Mobile Number",
              "AddContactLbl":"Add Contact",
              "ContactInfo":"Contact Information",
              "EmailLbl" : "Email",
              "UpdateContactLbl":"Update Contact",
              "ContactGroups":"Groups",
              "AddMoreBtn":"Add More",
              "SaveAndExitBtn":"Save & Exit",
              "SelectGroups":"Select Groups",
              "SaveGroupBtn":"Save Group",
              "AddGroupCheck":"Add New Group",
              "NoContactsInThisGroup":"No Contacts In This Group",
              "NoJoinedGroups":"No Joined Groups",
              "UploadExcel":"Upload Excel",
              "Upload":"Upload",
              "DownloadSample":"Download Sample",
              "Templates":"Templates",
              "Templatelbl":"Template Name",
              "NewTemplateLbl":"Add Template",
              "RecommendedTemplateImage":"Recommended dimension 1920 x 1200",
              "InvitationDescr":"Invitation Description",
              "ViewInvitationBtn":"View Invitation",
              "invitationDateTimeLbl":"Invitation Date",
              "SelectTemplateLbl":"Select Template",
              "InvitationDescriptionLbl":"Invitation Description",
              "SelectInviteesLbl":"Select Invitees",
              "NoInvitationAvailable":"No Invitation Available",
              "InviteeNameLbl":"Invitee Name",
              "InviteeEmailLbl":"Invitee Email",
              "InviteeMobileNumberLbl":"Invitee Mobile",
              "viewInvitation":"Details",
              "InviteeStatus":"Status",
              "AddTemplateBtn":"Add Template",
              "UploadImageBtn":"Upload image",
              "NoFailedAvailable":"No Failed Contact List",
              "FailedContactLbl":"Failed Contact List",
              "NameValidationDetails":"* Contact name: from 3 : 50 characters.",
              "EmailValidationDetails":"* Email: should be in email format.",
              "NumbertValidationDetails":"*Number: from 3:50 numbers.",
              "ConfirmSuccess":"Confirmed",
              "RejectSuccess":"Rejected",
              "ConfirmationMsg":"You have been confirmed this invitation",
              "RejectionMsg":"You have been rejected this invitation",
              "ConsumedInviteesLbl":"Consumed Invitees",
              "TotalInviteesLbl":"Total Invitees",
              "exceedAllowedInvitees":"Exceeded number of invitees",
              "SendBtn":"Send",
          }
          
          var ar_translations = {
            "FirstNameLbl" : "الاسم الاول",
            "LastNameLbl" : "الاسم الثاني",
            
            "Phone1Lbl" : "الرقم الاول",
            "Phone2Lbl" : "الرقم الثاني",
            "FirstNameLengthError" : "اسم المستخدم الاول مطلوب",
              "LastNameLengthError" : "اسم المستخدم الثاني مطلوب",
              "NotPhoneNumber" : "برجاء إدخال أرقام فقط",
              "PasswordLengthError" : "كلمه المرور مطلوبه", 
              "UserPasswordLbl":"كلمة مرور  ",
              "ConfirmPasswordLbl":"تأكيد كلمه المرور",
              "saveChangesBtn":"حفظ",
              "DiscardBtn":"تجاهل",
              "ClientAddSuccess":"تم اضافه المستحدم بنجاح   ", 
              "BackageAddSuccess":"تم اضافه الباقه بنجاح   ", 
              "BackageEditSuccess":"تم تعديل الباقه بنجاح   ", 
              "ClientEditSuccess":"تم تعديل بيانات المستحدم بنجاح   ", 
              "LimitUserValidation":"لابد من اختيارعلي الاقل مستخدم واحد",               
              "AddUserBtn":"اضافه عميل جديد",
              "BasicInfoLbl":"البيانات الاساسيه",
              "NextLbl":"التالي",
              "userName":"اسم المستخدم",
              "StatusLbl":"الحاله",
              "ProductTitleLbl":"اسم المنتج",
              "ProductDescLbl":"شرح المنتج",
              "ProductCountLbl":"عدد الباقات ",
              "Edit":"تعديل",
              "userlimitLbl":"عدد المستخدمين",
              "concumerLbl":"عدد المستهلكين",
              "startDateLbl":"تاريخ البدايه",
              "enddateLbl":"تاريخ الانتهاء", 
              "AddProductBtn":"اضافه منتج",
              "Products":"المنتجات",
              "user":"المستخدمين",
              "logoutBtn":"خروج",
               // *******
               "exceedAllowedInvitees":"تخظي عدد المدعويين",
               "ConsumedInviteesLbl":"مجموع المدعويين",
               "TotalInviteesLbl":"المدعويين المستهلكين",
               "dwConfirmationLbl":"هل تريد اضافة الحدث للتقويم",
               "UploadImageBtn":"اختر صوره",
               "AddTemplateBtn":"اضافة قالب",
               "InviteeStatus":"حاله",
               "InviteeEmailLbl":"البريد الالكتروني",
               "InviteeMobileNumberLbl":"رقم الموبايل",
               "InviteeNameLbl":"اسم المدعو",
               "NoInvitationAvailable":"لا يوجد دعوات",
               "SelectInviteesLbl":"اختر المدعويين",
               "InvitationDescriptionLbl":"تفاصيل الدعوة",
               "SelectTemplateLbl":"اختر القالب",
               "ConfirmBtn":"موافقة",
               "RejectBtn":"رفض",
               "invitationDateTimeLbl":"موعد الدعوة",
               "ViewInvitationBtn":"عرض الدعوة",
               "InvitationDescr":"تفاصيل الدعوة",
               "InvitationNameLbl":"اسم الدعوة",
               "RecommendedTemplateImage":"1920 x 1200 البعد الموصى به",
               "NewTemplateLbl":"اضافة نموذج",
               "Templatelbl":"اسم النموذج",
               "Templates":"قوالب",
              "DownloadSample":"تحميل نوذج",
              "Upload":"تحميل",
              "UploadExcel":"تحميل اكسيل",
              "NoJoinedGroups":"غير مشترك بمجموعة",
              "NoContactsInThisGroup":"لا يوجد أسماء في هذا المجموعه",
              "AddGroupCheck":"اضافة مجموعه جديده",
              "SaveGroupBtn":"اضافة مجموعه",
               "NoTemplateAvailable":"لا يوجد نموذج متاح",
               "SelectGroups":"اضافه في مجموعات",
               "AddMoreBtn":"اضافه جديده",
               "SaveAndExitBtn":"اضافه و خروج",
               "ContactGroups":"المجموعات",
               "FilterByGroup":"تصفيه بالمجموعه",
               "MonileNumberLengthError" : "يجب أن تكون الأرقام من 10: 50",
              "MobileNumberReqError" : "الرقم الشخصي مطلوب",
              "MobileNumberLbl" : "الرقم الشخصي",
              "TextOnly":"حروف فقط",
              "WrongMail":"يرجى إدخال تنسيق البريد الإلكتروني الصحيح ",
              "passworddontmatch":"كلمه المرور غير متطابقه",
              "group":"المجموعات",
              "contact":"الأسماء",
              "history":"الأرشيف",
              "newInvitation":"ارسال دعوة",
              "groupName":"اسم المجموعه",
              "NogroupAvailable":"لا يوجد مجموعات",
              "AddBtn":"اضافه",
              "SendBtn":"ارسال",
              "AddSuccess":"تم الاضافه بنجاح   ",
              "GroupNameLbl":"اسم المجموعه",
              "GroupNameLengthError":"اسم المجموعه مطلوب",
              "EditSuccess":"تم التعديل بنجاح   ", 
              "UpdateGroupLbl":"تعديل المجموعة",
              "GroupInfo":"معلومات المجموعه",
              "requiredErr":"حقل مطلوب",
              "NameLengthError" : "يجب أن تكون الحروف من 3 : 50",
              "AddGroupLbl":"اضافة جروب",
              "deleteConfirmationLbl":"تأكيد الحذف",
              "deleteBtn":"حذف",
              "cancelBtn":"الغاء",
              "DeleteSuccess":"تم الحذف بنجاح",
              "NoContactAvailable":"لا يوجد أسماء",
              "ContactName":"اسم الشخص",
              "ContactEmail":"البريد الاليكتروني",
              "ContactMobileNum":"رقم الموبايل",
              "AddContactLbl":"اضافة سخص",
              "ContactInfo":"بيانات الشخص",
              "EmailLbl" : "البريد الالكتروني",
              "EmailRequiredError" : "البريد الالكتروني مطلوب",
              "UpdateContactLbl":"تعديل الشخص",
              "viewInvitation":"عرض الدعوة",
              "NoFailedAvailable":"لا يوجد جهات اتصال لم يتم ارفاقها",
              "FailedContactLbl":"جهات اتصال لم يتم ارفاقها",
              "NameValidationDetails":"اسم الشخص من 3 : 50 حرف*",
              "EmailValidationDetails":" البريد الاكتروني يجب ادخاله بالتنسيف الصحيح*",
              "NumbertValidationDetails":"رقم الشخص من 3 : 50 حرف*",
              "ConfirmSuccess":"تم الموافقه",
              "RejectSuccess":"تم الرفض",
              "ConfirmationMsg":"تمت الموافقه علي الدعوة",
              "RejectionMsg":"تم رفض هذه الدعوة",
          }
          
          $translateProvider.translations('en',en_translations);
          
          $translateProvider.translations('ar',ar_translations);
          
          $translateProvider.preferredLanguage(appCONSTANTS.defaultLanguage);
          
          }]);
  
  }());
  ;(function() {
    angular
        .module('home')
        .factory('ToastService', ToastService);

    function ToastService() {
        return {
            show: function($positionX,$positionY,$dataEffect,$dataMessage,$dataType,$actionText,$action,$duration){
			
					
				if($(window).width() < 768){
					$positionX = "center";
				}else {
					$positionX = $positionX;
				}		

				if(!$(".pmd-alert-container."+ $positionX +"."+ $positionY).length){
					$('body').append("<div class='pmd-alert-container "+$positionX+" "+$positionY+"'></div>");
				}
					
				var $currentPath = $(".pmd-alert-container."+ $positionX +"."+ $positionY);
				function notificationValue(){
					if($action == "true"){
						if($actionText == null){
							$notification =  "<div class='pmd-alert' data-action='true'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>×</a></div>";
						}else{
							$notification =  "<div class='pmd-alert' data-action='true'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>"+$actionText+"</a></div>";	
						}
						return $notification;
					}else {
						if($actionText == null){
							$notification = "<div class='pmd-alert' data-action='false'>"+$dataMessage+"</div>";
						}else{
							$notification =  "<div class='pmd-alert' data-action='false'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>"+$actionText+"</a></div>";	
						}
						return $notification;
					}
				}
				var $notification = notificationValue();
				var boxLength = $(".pmd-alert-container."+ $positionX +"."+ $positionY + " .pmd-alert").length;
				
				if($(this).attr("data-duration") !== undefined){
					$duration = $(this).attr("data-duration");
				}else {
					$duration = 3000;
				}
				
				if (boxLength > 0) {
					if ($positionY == 'top') {
						$currentPath.append($notification);
					}
					else {
						$currentPath.prepend($notification);
					}
					$currentPath.width($(".pmd-alert").outerWidth());
					if($action == "true"){
						$currentPath.children("[data-action='true']").addClass("visible" +" "+ $dataEffect);	
					}else{
						$currentPath.children("[data-action='false']").addClass("visible" +" "+ $dataEffect).delay($duration).slideUp(
							function(){
								$(this).removeClass("visible" +" "+ $dataEffect).remove();
							});	
					}
					$currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
				}else {
					$currentPath.append($notification);
					$currentPath.width($(".pmd-alert").outerWidth());
					if($action == "true"){
						$currentPath.children("[data-action='true']").addClass("visible" +" "+ $dataEffect);	
					}else{
						$currentPath.children("[data-action='false']").addClass("visible" +" "+ $dataEffect).delay($duration).slideUp(
							function(){
								$(this).removeClass("visible" +" "+ $dataEffect).remove();
							});	
					}
					$currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
				}
				var $middle = $(".pmd-alert").outerWidth() / 2;  
				$(".pmd-alert-container.center").css("marginLeft","-" + $middle+"px");
		}
		
        }

    }


}());
;(function () {
    'use strict';	
    angular
        .module('home')
        .controller('confirmDeleteDialogController', ['$uibModalInstance', 'itemName','itemId','message', 'callBackFunction',  confirmDeleteDialogController])
	                                    	
	function confirmDeleteDialogController($uibModalInstance, itemName,itemId,message, callBackFunction){
		var vm = this;
		vm.itemName = itemName;
		vm.message = message;
		vm.itemId = itemId;
	
		vm.close = function(){
			$uibModalInstance.dismiss();
		}
		
		vm.Confirm = function(){
			callBackFunction(itemId);
			$uibModalInstance.dismiss();
		}
	}	
}());
;(function() {
    'use strict';

    angular
        .module('home')
        .controller('loginController', ['$rootScope', '$scope','$state','$localStorage','authorizationService','appCONSTANTS',loginController]);
   
    function loginController($rootScope, $scope,$state, $localStorage,authorizationService,appCONSTANTS) {
    
		if ($localStorage.authInfo) {  
			if ($localStorage.authInfo.Role  == "GlobalAdmin") {
				$state.go('groups');

			}  
		}
		else
		{
			 $state.go('login');
		}
	}

}());(function() {
    'use strict';

    angular
        .module('home')
        .controller('homeCtrl', ['$rootScope','$translate', '$scope', 'appCONSTANTS',  '$state',  '_', 'authenticationService', 'authorizationService', '$localStorage', homeCtrl])
       
    function homeCtrl($rootScope, $translate, $scope, appCONSTANTS, $state, _,authenticationService, authorizationService,$localStorage) {
        $scope.$on('LOAD',function(){$scope.loading=true});
        $scope.$on('UNLOAD',function(){$scope.loading=false});
        var vm=this;
        //show sidebar
        $rootScope.sidebar = {
            show  : true
          };
        $scope.sidebar = $rootScope.sidebar;
        //show header
        $rootScope.header = {
            show  : true
          };
        $scope.header = $rootScope.header;
        //End

        $scope.emailEmpty = false;
        $scope.passwordEmpty = false;
		$scope.languages = [{
            id:"en",
            label:"english"
        },
        {
            id:"ar",
            label:"arabic"
        }];
		if($localStorage.language == null){
            $scope.selectedLanguage = $scope.languages[0].id;
            $localStorage.language = $scope.selectedLanguage;
        }
        else
            $scope.selectedLanguage = $localStorage.language;
            
        $translate.use($scope.selectedLanguage); 
		$scope.init =
            function() {
				$scope.user = authorizationService.getUser();
            }
        $scope.init();
		
        $scope.submit = function(username, password) {
           
            authorizationService.isPasswordchanged=false;
            $('#passwordChanged').hide();
          //  $('#userInActivated').hide();
            if (!username)
                $scope.emailEmpty = true;
            if (!password)
                $scope.passwordEmpty = true;;
            if (username && password) {
                $scope.afterSubmit = false;
                $scope.emailEmpty = $scope.passwordEmpty = false;
                authenticationService.authenticate(username, password).then(loginSuccess,loginFailed)
                    //.error(loginFailed);;
            } else {
                $scope.afterSubmit = false;
            }
        };
		
        $scope.reloadPage = true;
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            if(fromState.name != "" && $scope.reloadPage){
                    e.preventDefault();
                    $scope.reloadPage = false;
                    $state.go(toState.name,toParams, { reload: true });
                }     
        });

		$scope.$watch(function () { return $localStorage.authInfo; },function(newVal,oldVal){
		   if(oldVal!=undefined && newVal === undefined && $localStorage.authInfo == undefined){
			 console.log('logout'); 
			   $state.go('login');
		  }
		  if(oldVal===undefined && newVal !== undefined&&$localStorage.authInfo != undefined){
			 console.log('login'); 
					$scope.user = authorizationService.getUser();
					loginSuccess()
			// authorizationService.isLoggedIn() && !location.href.contains('connect')
		  }
		})
        function loginSuccess(response) {
            $scope.afterSubmit = false;
            $scope.invalidLoginInfo = false;
            $scope.inActiveUser = false;
            $scope.user = authorizationService.getUser();
            if ($scope.user.role == "GlobalAdmin") {
                $state.go('groups');

            }  
            else  {
                authorizationService.logout();
                $state.go('login');
            } 

        }

        function loginFailed(response) {
            $scope.afterSubmit = true;
            
             $scope.invalidLoginInfo = true;
            if (response) {
                if (response.data.error == "invalid grant") {
                    $scope.invalidLoginInfo = true;
                    $scope.inActiveUser = false;
                }
                if (response.data.error == "inactive user") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = true;
                }
            }
            if (response == null) {
                $scope.invalidLoginInfo = false;
                $scope.inActiveUser = true;
            }
        }

        $scope.logout = function() {
            authorizationService.logout();
            $state.go('login');
        }
        $scope.reset = function() {
            $scope.invalidLoginInfo = false;
            $scope.inActiveUser = false;
        }
        $scope.isLoggedIn = function() {
            return authorizationService.isLoggedIn();
        }
		$scope.changeLanguage = function(language){
			$scope.selectedLanguage = language;
			$localStorage.language = $scope.selectedLanguage;
            $state.reload();
            $translate.use(language); 
		}
		$scope.getCurrentTime = function(){
			return (new Date()).getTime()
		}
		
		
    }

    
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .constant('AUTH_EVENTS', {
      loginFailed : 'login-failed',
      loginSuccess : 'login-success',
      logoutSuccess : 'logout-success',
      refreshedToken : 'refresh-token-success',
      invalidToken : 'invalid-token',
      failedToAuthorize: 'not-authorized',
      invalidRefreshToken: 'refresh-token-failure',
      passwordChanged: 'password-changed'

    });
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .factory('authEventsHandlerService', authEventsHandlerService);

    authEventsHandlerService.$inject = ['$rootScope', 'AUTH_EVENTS', '$state'];

  function authEventsHandlerService($rootScope, AUTH_EVENTS, $state) {
    var factory = {
      initialize : initialize
    }

    return factory;

    function initialize() {
      $rootScope.$on(AUTH_EVENTS.logoutSuccess,logoutHandler);
    }

    function logoutHandler(){
      $state.go('login');
    }
  }
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$injector', 'appCONSTANTS', 'authorizationService', 'AUTH_EVENTS', '$rootScope', '$q'];

  function authenticationService($injector, appCONSTANTS, authorizationService, AUTH_EVENTS, $rootScope, $q) {

    var factory = {
      authenticate: authenticate,
      getToken: getToken,
      isAuthenticated: isAuthenticated
    };

    return factory;

    function authenticate(email, password) {
      var credentials = {
        'username': email,
        'password': password
      }
      var request = requestToken(credentials, 'password');
      request.then(authenticated,authenticaionFailed);
      return request;
        
        //.error(authenticaionFailed);

    }


    function authenticated(data) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      return data;
    }

    function authenticaionFailed(data) {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      return data;
    }

    function getToken(forceRefresh) {
      if(!isAuthenticated()){
        return $q.reject({
          status : 401
        });
      }
      var authInfo = authorizationService.getAuthInfo();
      var expirydate = new Date(authInfo['.expires']); 
      if (forceRefresh || new Date() >= expirydate) {
        return refreshToken(authInfo['refresh_token']).then(refreshedToken,function(){
         authorizationService.logout();
        });
      }
      var defer = $q.defer();
      defer.resolve(authInfo);
      return defer.promise;
    }

    function isAuthenticated() {
      return !!authorizationService.getAuthInfo();
    }

    function refreshToken(refreshToken) {
      var credentials = {
        'refresh_token': refreshToken
      };
      return requestToken(credentials, 'refresh_token');
    }

    function refreshedToken(response){
      $rootScope.$broadcast(AUTH_EVENTS.refreshedToken);
      authorizationService.setAuthInfo(response);
      return response.data;
    }


    function requestToken(credentials, grantType) {
      angular.extend(credentials, {
          //'client_id': vlCONSTANTS.API_Client_Id,
        'grant_type': grantType
      });

      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      var $http = $injector.get("$http");
	  var result = $http
        .post(appCONSTANTS.API_URL + "token", $.param(credentials), config);
		result.then(function(data){
          authorizationService.setAuthInfo(data);
        });
      return result;
        
    }
  }
})();
;(function() {
  'use strict';
  (function() {
    angular
      .module('core')
      .factory('unAuthenticatedInterceptor', unAuthenticatedInterceptor);

    unAuthenticatedInterceptor.$inject = ['$q','$rootScope','AUTH_EVENTS'];

    function unAuthenticatedInterceptor($q,$rootScope,AUTH_EVENTS) {
      var factory = {
        responseError: responseErrorInterceptor
      };
      return factory;

      function responseErrorInterceptor(rejection) {
          if(rejection.status == 403) {
              $rootScope.$broadcast(AUTH_EVENTS.failedToAuthorize);
          }else if (rejection.status == 401) {
            if (rejection.data=="password changed") {
              $rootScope.$broadcast(AUTH_EVENTS.passwordChanged);
            }
            else {
              $rootScope.$broadcast(AUTH_EVENTS.invalidToken);
            }
          }
          else if (rejection.status == 406) {
              $rootScope.$broadcast(AUTH_EVENTS.invalidRefreshToken);
          }
          //  else if (rejection.status == 400) {
          //     $rootScope.$broadcast(AUTH_EVENTS.refresh-token-failure);
          // }
          
          return $q.reject(rejection);
        }
    }


  })();



  //inject interceptor to $http
  (function() {
    angular
      .module("core")
      .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
      $httpProvider.interceptors.push('unAuthenticatedInterceptor');
    }
  })();

})();
;(function() {
  'use strict';
  (function() {
    angular
      .module('core')
      .factory('useTokenInterceptor', useTokenInterceptor);

    useTokenInterceptor.$inject = ['authenticationService','$localStorage'];


    function useTokenInterceptor(authenticationService,$localStorage) {
      var tokenInterceptor = {
        request: requestInterceptor
      };
      return tokenInterceptor;

      function requestInterceptor(config) {
          if (config.useToken) {
            return authenticationService.getToken()
              .then(function(data){
                config.headers['Authorization'] = data['token_type'] + " " + data['access_token'];
				if(config.params== null || config.params.lang ==null)
					config.headers['Accept-Language'] = $localStorage.language;//"en";
				else
					config.headers['Accept-Language'] = config.params.lang;
                if (!config.headers.hasOwnProperty('Content-Type')) 
                {
                    config.headers['Content-Type'] = 'application/json';
                }
                return config;
              });

          }
          return config;
        }
    }


  })();



  //inject interceptor to $http
  (function() {
    angular
      .module("core")
      .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
      $httpProvider.interceptors.push('useTokenInterceptor');
    }
  })();

})();
;(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];

  function runBlock(PermissionStore, authorizationService, userRolesEnum) {
    PermissionStore
      .definePermission('GlobalAdmin', function () {
          return authorizationService.hasRole(String(userRolesEnum.GlobalAdmin));
      });
  }

}());
;(function() {
    'use strict';
  
    angular
      .module('core')
      .run(runBlock);
  
    runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];
  
    function runBlock(PermissionStore, authorizationService, userRolesEnum) {
      PermissionStore
        .definePermission('RestaurantAdmin', function () {
            return authorizationService.hasRole(String(userRolesEnum.RestaurantAdmin));
        });
    }
  
  }());
  ;(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore','authorizationService'];

  function runBlock (PermissionStore, authorizationService){
    PermissionStore
      .definePermission('anonymous',function(){
        return !authorizationService.isLoggedIn();
      });
  }

}());
;(function() {
  'use strict';

 
  angular
    .module('core')
    .factory('authorizationService', authorizationService);

  authorizationService.$inject = ['$rootScope', '$localStorage', 'AUTH_EVENTS'];

  function authorizationService($rootScope, $localStorage, AUTH_EVENTS) {
    var factory = {
      getAuthInfo: getAuthInfo,
      getUser: getUser,
      hasRole: hasRole,
      isLoggedIn: isLoggedIn,
      logout: logout,
      setAuthInfo: setAuthInfo,
      isDisabled: false,
      isPasswordchanged:false
    };

    return factory;

   
    function isLoggedIn() {
      return !!$localStorage.authInfo;
    }

    
    function getAuthInfo() {
      return $localStorage.authInfo;
    }

    
    function getUser() {
      var info = getAuthInfo();
      return {
        email: info? info.Username : "",
        name: info? info.Name : "",
        role: info ? info.Role : "",
        id: info ? info.UserId : ""
      };
    }

   
    function hasRole(role) {
      if (!isLoggedIn()) {
        return false;
      }
      // return JSON.parse(getAuthInfo().Roles).indexOf(role) > -1;
      return getAuthInfo().Role == role;
    }
	
    function logout() {
      $localStorage.authInfo = undefined;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function setAuthInfo(info) {
      $localStorage.authInfo = info.data;
      var currentDate = new Date();
      $localStorage.authInfo['expires_in'] = currentDate.setSeconds(currentDate.getSeconds() + $localStorage.authInfo['expires_in']);
    }
  }

}());
