angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Invitee/template/invitee.html',
    '<style id="dynamicStyleHistory">\n' +
    '</style>\n' +
    '\n' +
    '<div  class="invitationHistoryClass" ng-bind-html="inviteeCtrl.html">\n' +
    '</div>\n' +
    '\n' +
    '<div>\n' +
    '    <div ng-if="inviteeCtrl.inviteesOfInvitationList.results.length == 0">\n' +
    '        <span>{{\'NoInvitationAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if=" inviteeCtrl.inviteesOfInvitationList.results.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'InviteeNameLbl\' | translate}}</th>\n' +
    '                        <th>{{\'InviteeEmailLbl\' | translate}}</th>\n' +
    '                        <th>{{\'InviteeMobileNumberLbl\' | translate}}</th>\n' +
    '                        <th>{{\'InviteeStatus\' | translate}}</th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="invitee in inviteeCtrl.inviteesOfInvitationList.results">\n' +
    '                        <td data-title="Name" width="20%">{{invitee.contact.contactName}}</td>\n' +
    '                        <td data-title="Name" width="20%">{{invitee.contact.contactEmail}}</td>\n' +
    '                        <td data-title="Name" width="20%">{{invitee.contact.contactMobileNum}}</td>\n' +
    '                        <td data-title="Name" width="20%">{{invitee.inviteeStatus}}</td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    <div style="text-align:center;" paging page="1" page-size="10" total="inviteeCtrl.inviteesOfInvitationList.totalCount" paging-action="inviteeCtrl.changePage(page)"\n' +
    '        flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/contact/templates/addContact.html',
    '<script type="text/javascript">\n' +
    '	$(document).ready(function() {\n' +
    '        \n' +
    '		// $(".select-simple").select2({\n' +
    '		// 	theme: "bootstrap",\n' +
    '		// 	minimumResultsForSearch: Infinity,\n' +
    '		// });\n' +
    '		// $(".select-with-search").select2({\n' +
    '		// 	theme: "bootstrap"\n' +
    '		// });\n' +
    '		// $(".select-tags").select2({\n' +
    '		// 	tags: false,\n' +
    '		// 	theme: "bootstrap",\n' +
    '		// });\n' +
    '		$(".select-add-tags").select2({\n' +
    '			tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '                 insertTag: function (data, tag) {\n' +
    '                // Insert the tag at the end of the results\n' +
    '                data.push(tag);\n' +
    '               // console.log(data);\n' +
    '              }\n' +
    '		});\n' +
    '	});\n' +
    '</script>\n' +
    '\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <button class="close" type="button" ng-click="addContactCtrl.close()">×</button>\n' +
    '        <h2 class="pmd-card-title-text">{{\'AddContactLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '            {{\'ContactInfo\' | translate}}   \n' +
    '        <form class="form-horizontal" name="newContactForm">\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                <label for="first-name">{{\'ContactName\' | translate}}</label>\n' +
    '                <input required type="text" class="mat-input form-control" name="contactName" ng-pattern="/^(\\D)+$/" ng-model="ContactName" ng-minlength="3" ng-maxlength="50">\n' +
    '                <div ng-messages="newContactForm.contactName.$error" class="error">\n' +
    '                        <div ng-show="newContactForm.contactName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                        <div ng-if="newContactForm.contactName.$error.required && !newContactForm.contactName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newContactForm.contactName.$error.minlength || newContactForm.contactName.$error.maxlength) && !newContactForm.contactName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                <label>{{\'EmailLbl\' | translate}}</label>\n' +
    '                <input required type="text" class="mat-input form-control" name="contactEmail" ng-model="ContactEmail" ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                <span class="error" ng-show="newContactForm.contactEmail.$error.pattern">{{\'WrongMail\' | translate}}   </span>\n' +
    '                <div ng-messages="newContactForm.email.$error" class="error">\n' +
    '                    <div ng-if="newContactForm.contactEmail.$error.required && !newContactForm.contactEmail.$pristine">{{\'EmailRequiredError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                <label for="first-name">{{\'MobileNumberLbl\' | translate}}</label>\n' +
    '                <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only ng-model="ContactMobileNum" ng-minlength="10" ng-maxlength="50">\n' +
    '                <!-- <span class="error" ng-show="newclientForm.phone1.$error.pattern">{{\'NotPhoneNumber\' | translate}}   </span> -->\n' +
    '                <div ng-messages="newContactForm.mobileNumber.$error" class="error">\n' +
    '                    <div ng-if="newContactForm.mobileNumber.$error.required && !newContactForm.mobileNumber.$pristine">{{\'MobileNumberReqError\' | translate}}</div>\n' +
    '                    <div ng-if="(newContactForm.mobileNumber.$error.minlength || newContactForm.mobileNumber.$error.maxlength)">{{\'MonileNumberLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            \n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'SelectGroups\' | translate}}</label>\n' +
    '                    <select style="width:100% !important" class="form-control select-add-tags pmd-select2-tags" multiple\n' +
    '                    ng-model="addContactCtrl.selectedGroups"\n' +
    '                    ng-options="group as group.groupName for group in addContactCtrl.groupListSelection">\n' +
    '                           \n' +
    '                    </select>\n' +
    '             </div>\n' +
    '\n' +
    '            <label for="first-name">{{\'AddGroupCheck\' | translate}}</label> <input type="checkbox" ng-model="checked" aria-label="Toggle ngShow"><br />\n' +
    '            <div class="check-element animate-show-hide" ng-show="checked" ng-if="checked">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="first-name">{{\'GroupNameLbl\' | translate}}</label>\n' +
    '                        <input required type="text" class="mat-input form-control" name="groupName" ng-pattern="/^(\\D)+$/" ng-model="addContactCtrl.ContactGroupName" ng-minlength="3" ng-maxlength="50">\n' +
    '                        <div ng-messages="newContactForm.groupName.$error" class="error">\n' +
    '                                <div ng-show="newContactForm.groupName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                                <div ng-if="newContactForm.groupName.$error.required && !newContactForm.groupName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                <div ng-if="(newContactForm.groupName.$error.minlength || newContactForm.groupName.$error.maxlength) && !newContactForm.groupName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                        </div>\n' +
    '                </div>\n' +
    '                <!-- <button ng-disabled="newContactForm.groupName.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="AddNewGroup()">{{\'SaveGroupBtn\' | translate}}</button> -->\n' +
    '            </div>\n' +
    '             \n' +
    '          \n' +
    '          <!-- *********** -->\n' +
    '          \n' +
    '                 \n' +
    '        </form>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newContactForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="AddNewContact()">{{\'SaveAndExitBtn\' | translate}}</button>\n' +
    '            <button ng-disabled="newContactForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="AddNewContactMore()">{{\'AddMoreBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/contact/templates/contact.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <!-- <button ng-click="$state.go(\'addGroup\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddGroupBtn\' | translate}}</button> -->\n' +
    '        <button ng-click="contactCtrl.AddContact()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="row">\n' +
    '        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'FilterByGroup\' | translate}}  *</label>\n' +
    '                    <br/>\n' +
    '                    <select class="select-simple form-control pmd-select2"\n' +
    '                        ng-change="showSelectID()"   ng-model="contactCtrl.selectedGroup" ng-options="group as group.groupName for group in contactCtrl.groupList track by group.groupID" required>\n' +
    '\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <!-- <div ng-if="contactCtrl.contactList.results.length == 0">\n' +
    '        <span>{{\'NoContactAvailable\' | translate}}</span>\n' +
    '    </div> -->\n' +
    '\n' +
    '    <form class="form-horizontal" name="fileForm">\n' +
    '        <div class="row">\n' +
    '            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'UploadExcel\' | translate}}</label>\n' +
    '                    <input required id ="selectedFile" name="selectedFile" type="file" class="form-control" onchange="angular.element(this).scope().loadFile(this.files)" />\n' +
    '                    <br/>\n' +
    '\n' +
    '                    <div ng-init="myVar = \'http://invitationsbackend.azurewebsites.net/ExcelSample/Contacts.xlsx\'">\n' +
    '                        <p><a ng-href="{{myVar}}">{{\'DownloadSample\' | translate}}</a></p>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- <br/> -->\n' +
    '\n' +
    '                    <!-- <input ng-disabled="contactCtrl.fileUpload == null" type="button" value="{{\'Upload\' | translate}}"  class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                            ng-click="handleFile()" /> -->\n' +
    '                    \n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </form>\n' +
    '\n' +
    '    <input ng-disabled="fileForm.$invalid || selectedFile == null" type="button" value="{{\'Upload\' | translate}}"  class="btn pmd-ripple-effect btn-primary pmd-z-depth" ng-click="handleFile()" />\n' +
    '    <p ng-bind="msg" class="error"></p>\n' +
    '    <br>\n' +
    '\n' +
    '    <div ng-if="contactCtrl.contactList.results.length == 0">\n' +
    '        <span>{{\'NoContactAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if=" contactCtrl.contactList.results.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'ContactName\' | translate}}</th>\n' +
    '                        <th>{{\'ContactEmail\' | translate}}</th>\n' +
    '                        <th>{{\'ContactMobileNum\' | translate}}</th>\n' +
    '                        <th>{{\'ContactGroups\' | translate}}</th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="contact in contactCtrl.contactList.results">\n' +
    '                        <td  data-title="Name" width="20%">{{contact.contactName}}</td>\n' +
    '                        <td  data-title="Name" width="20%">{{contact.contactEmail}}</td>\n' +
    '                        <td  data-title="Name" width="20%">{{contact.contactMobileNum}}</td>\n' +
    '                        <td  data-title="Name" width="20%" >\n' +
    '\n' +
    '                            <span ng-repeat="group in contact.contactGroups">\n' +
    '                                    {{group.groupName}}\n' +
    '                                    <br>\n' +
    '                            </span>\n' +
    '\n' +
    '                            <!-- <button ng-click="contactCtrl.ShowGroupsForCertainContact(contact.contactID)"><strong>{{\'ContactGroups\' | translate}}</strong>\n' +
    '                            </button> -->\n' +
    '                        </td>\n' +
    '                        <td ng-class="{\'red-text\': user.isActive == false }" width="15%">\n' +
    '                            <i class="cursorPointer" ng-click="contactCtrl.UpdateContact(contact)">{{\'Edit\' | translate}} </i>\n' +
    '                            <i class="cursorPointer" ng-click="contactCtrl.DeleteContact(contact.contactID, contact.contactName)">{{\'deleteBtn\' | translate}} </i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    <div style="text-align:center;" paging page="1" page-size="10" total="contactCtrl.contactList.totalCount" paging-action="contactCtrl.changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/contact/templates/contactGroups.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="contactGroupsContactCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'ContactGroups\' | translate}}</h2>\n' +
    '        </div>\n' +
    '    \n' +
    '        <div class="modal-body">\n' +
    '                <!-- {{\'ContactInfo\' | translate}}    -->\n' +
    '            <form class="form-horizontal" name="newContactForm" autocomplete="off">\n' +
    '    \n' +
    '                <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if=" contactGroupsContactCtrl.groupsContactList.length >0">\n' +
    '\n' +
    '                    <div class="table-responsive">\n' +
    '                        <table class="table pmd-table table-hover">\n' +
    '                            <thead>\n' +
    '                                <tr>\n' +
    '                                    <th>{{\'groupName\' | translate}}</th>\n' +
    '                                </tr>\n' +
    '                            </thead>\n' +
    '                            <tbody>\n' +
    '                                <tr ng-repeat="group in contactGroupsContactCtrl.groupsContactList">\n' +
    '                                    <td  data-title="Name" width="20%">{{group.groupName}}</td>\n' +
    '                                </tr>\n' +
    '                            </tbody>\n' +
    '                        </table>\n' +
    '                    </div>\n' +
    '            \n' +
    '                </div>\n' +
    '    \n' +
    '    \n' +
    '            </form>\n' +
    '    \n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/contact/templates/editContact.html',
    '<script type="text/javascript">\n' +
    '	$(document).ready(function() {\n' +
    '        \n' +
    '		// $(".select-simple").select2({\n' +
    '		// 	theme: "bootstrap",\n' +
    '		// 	minimumResultsForSearch: Infinity,\n' +
    '		// });\n' +
    '		// $(".select-with-search").select2({\n' +
    '		// 	theme: "bootstrap"\n' +
    '		// });\n' +
    '		// $(".select-tags").select2({\n' +
    '		// 	tags: false,\n' +
    '		// 	theme: "bootstrap",\n' +
    '		// });\n' +
    '		$(".select-add-tags").select2({\n' +
    '			tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '                 insertTag: function (data, tag) {\n' +
    '                // Insert the tag at the end of the results\n' +
    '                data.push(tag);\n' +
    '               // console.log(data);\n' +
    '              }\n' +
    '		});\n' +
    '	});\n' +
    '</script>\n' +
    '\n' +
    '\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <button class="close" type="button" ng-click="editContactCtrl.close()">×</button>\n' +
    '        <h2 class="pmd-card-title-text">{{\'UpdateContactLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '            {{\'ContactInfo\' | translate}}   \n' +
    '        <form class="form-horizontal" name="newContactForm" autocomplete="off">\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'ContactName\' | translate}}</label>\n' +
    '                <input required type="text" class="mat-input form-control" name="contactName" ng-pattern="/^(\\D)+$/" ng-model="editContactCtrl.contactObj.contactName" ng-minlength="3" ng-maxlength="50">\n' +
    '                <div ng-messages="newContactForm.contactName.$error" class="error">\n' +
    '                        <div ng-show="newContactForm.contactName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                        <div ng-if="newContactForm.contactName.$error.required && !newContactForm.contactName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newContactForm.contactName.$error.minlength || newContactForm.contactName.$error.maxlength) && !newContactForm.contactName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label>{{\'EmailLbl\' | translate}}</label>\n' +
    '                <input required type="text" class="mat-input form-control" name="contactEmail" ng-model="editContactCtrl.contactObj.contactEmail" ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                <span class="error" ng-show="newContactForm.contactEmail.$error.pattern">{{\'WrongMail\' | translate}}   </span>\n' +
    '                <div ng-messages="newContactForm.email.$error" class="error">\n' +
    '                    <div ng-if="newContactForm.contactEmail.$error.required && !newContactForm.contactEmail.$pristine">{{\'EmailRequiredError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'MobileNumberLbl\' | translate}}</label>\n' +
    '                <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only ng-model="editContactCtrl.contactObj.contactMobileNum" ng-minlength="10" ng-maxlength="50">\n' +
    '                <!-- <span class="error" ng-show="newclientForm.phone1.$error.pattern">{{\'NotPhoneNumber\' | translate}}   </span> -->\n' +
    '                <div ng-messages="newContactForm.mobileNumber.$error" class="error">\n' +
    '                    <div ng-if="newContactForm.mobileNumber.$error.required && !newContactForm.mobileNumber.$pristine">{{\'MobileNumberReqError\' | translate}}</div>\n' +
    '                    <div ng-if="(newContactForm.mobileNumber.$error.minlength || newContactForm.mobileNumber.$error.maxlength)">{{\'MonileNumberLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'SelectGroups\' | translate}}</label>\n' +
    '                    <select style="width:100% !important" class="form-control select-add-tags pmd-select2-tags" multiple\n' +
    '                    ng-model="editContactCtrl.selectedGroups" \n' +
    '                    ng-options="group as group.groupName for group in editContactCtrl.groupListSelection track by group.groupID">\n' +
    '                           \n' +
    '                    </select>\n' +
    '             </div>\n' +
    '\n' +
    '        </form>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newContactForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="UpdateContact()">{{\'Edit\' | translate}}</button>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/contact/templates/failedContactList.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <button class="close" type="button" ng-click="failedContactCtrl.close()">×</button>\n' +
    '        <h2 class="pmd-card-title-text">{{\'FailedContactLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '            <!-- {{\'ContactInfo\' | translate}}    -->\n' +
    '            <span class="error">{{\'NameValidationDetails\' | translate}}   </span> <br>\n' +
    '            <span class="error">{{\'EmailValidationDetails\' | translate}}   </span><br>\n' +
    '            <span class="error">{{\'NumbertValidationDetails\' | translate}}   </span>\n' +
    '\n' +
    '            <div ng-if="failedContactCtrl.failedList.length == 0">\n' +
    '                <span>{{\'NoFailedAvailable\' | translate}}</span>\n' +
    '            </div>\n' +
    '        \n' +
    '            <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if=" failedContactCtrl.failedList.length >0">\n' +
    '\n' +
    '                <div class="table-responsive">\n' +
    '                    <table class="table pmd-table table-hover">\n' +
    '                        <thead>\n' +
    '                            <tr>\n' +
    '                                <th>{{\'ContactName\' | translate}}</th>\n' +
    '                                <th>{{\'ContactEmail\' | translate}}</th>\n' +
    '                                <th>{{\'ContactMobileNum\' | translate}}</th>\n' +
    '                            </tr>\n' +
    '                        </thead>\n' +
    '                        <tbody>\n' +
    '                            <tr ng-repeat="contact in failedContactCtrl.failedList">\n' +
    '                                <td  data-title="Name" width="20%">{{contact.contactName}}</td>\n' +
    '                                <td  data-title="Name" width="20%">{{contact.contactEmail}}</td>\n' +
    '                                <td  data-title="Name" width="20%">{{contact.contactMobileNum}}</td>\n' +
    '                            </tr>\n' +
    '                        </tbody>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '        \n' +
    '            </div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/group/templates/addGroup.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <button class="close" type="button" ng-click="addGroupCtrl.close()">×</button>\n' +
    '        <h2 class="pmd-card-title-text">{{\'AddGroupLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '            {{\'GroupInfo\' | translate}}   \n' +
    '        <form class="form-horizontal" name="newGroupForm">\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                <label for="first-name">{{\'GroupNameLbl\' | translate}}</label>\n' +
    '                <input required type="text" class="mat-input form-control" name="groupName" ng-pattern="/^(\\D)+$/" ng-model="GroupName" ng-minlength="3" ng-maxlength="50">\n' +
    '                <div ng-messages="newGroupForm.groupName.$error" class="error">\n' +
    '                        <div ng-show="newGroupForm.groupName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                        <div ng-if="newGroupForm.groupName.$error.required && !newGroupForm.groupName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newGroupForm.groupName.$error.minlength || newGroupForm.groupName.$error.maxlength) && !newGroupForm.groupName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newGroupForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="AddNewGroup()">{{\'AddBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/group/templates/editGroup.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <button class="close" type="button" ng-click="editGroupCtrl.close()">×</button>\n' +
    '        <h2 class="pmd-card-title-text">{{\'UpdateGroupLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body" > \n' +
    '        {{\'GroupInfo\' | translate}}      \n' +
    '\n' +
    '        <form class="form-horizontal" name="newGroupForm" autocomplete="off">\n' +
    '                \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'GroupNameLbl\' | translate}}</label>\n' +
    '                        <input required type="text" class="mat-input form-control" name="groupName" ng-pattern="/^(\\D)+$/" ng-model="editGroupCtrl.groupObj.groupName"  ng-minlength="3" ng-maxlength="50">\n' +
    '                        <div ng-messages="newGroupForm.groupName.$error" class="error">\n' +
    '                            <div ng-show="newGroupForm.groupName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                            <div ng-if="newGroupForm.groupName.$error.required && !newGroupForm.groupName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                            <div ng-if="(newGroupForm.groupName.$error.minlength || newGroupForm.groupName.$error.maxlength) && !newGroupForm.groupName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '        </form> \n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newGroupForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="UpdateGroup()">{{\'Edit\' | translate}}</button>\n' +
    '        </div>\n' +
    '    \n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/group/templates/group.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <!-- <button ng-click="$state.go(\'addGroup\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddGroupBtn\' | translate}}</button> -->\n' +
    '        <button ng-click="groupCtrl.AddGroup()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '    <div ng-if="groupCtrl.groupList.results.length == 0">\n' +
    '        <span>{{\'NogroupAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if=" groupCtrl.groupList.results.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'groupName\' | translate}}</th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="group in groupCtrl.groupList.results">\n' +
    '                        <td  data-title="Name" width="20%">{{group.groupName}}</td>\n' +
    '                        <td ng-class="{\'red-text\': user.isActive == false }" width="15%">\n' +
    '                            <i class="cursorPointer" ng-click="groupCtrl.UpdateGroup(group)">{{\'Edit\' | translate}} </i>\n' +
    '                            <i class="cursorPointer" ng-click="groupCtrl.DeleteGroup(group.groupID, group.groupName)">{{\'deleteBtn\' | translate}} </i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    <div style="text-align:center;" paging page="1" page-size="10" total="groupCtrl.groupList.totalCount" paging-action="groupCtrl.changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/invitation/templates/icsDownload.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-body">{{\'dwConfirmationLbl\' | translate}}? </div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '        <!-- <div ng-init="myVar = confirmDWFileCtrl.filePath">\n' +
    '            <p><a ng-href="{{myVar}}">{{\'DownloadSample\' | translate}}</a></p>\n' +
    '        </div> -->\n' +
    '		<button class="btn pmd-ripple-effect btn-primary pmd-btn-flat" type="button" ng-click="confirmDWFileCtrl.Confirm()">{{\'AddBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default pmd-btn-flat" type="button" ng-click="confirmDWFileCtrl.close()">{{\'cancelBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/invitation/templates/invitation.html',
    '<script type="text/javascript">\n' +
    '	$(document).ready(function() {\n' +
    '        \n' +
    '		// $(".select-simple").select2({\n' +
    '		// 	theme: "bootstrap",\n' +
    '		// 	minimumResultsForSearch: Infinity,\n' +
    '		// });\n' +
    '		// $(".select-with-search").select2({\n' +
    '		// 	theme: "bootstrap"\n' +
    '		// });\n' +
    '		$(".select-tags").select2({\n' +
    '			tags: false,\n' +
    '			theme: "bootstrap",\n' +
    '		});\n' +
    '		// $(".select-add-tags").select2({\n' +
    '		// 	tags: true,\n' +
    '        //     theme: "bootstrap",\n' +
    '        //     insertTag: function (data, tag) {\n' +
    '        //         // Insert the tag at the end of the results\n' +
    '        //         data.push(tag);\n' +
    '        //         // console.log(data);\n' +
    '        //     }\n' +
    '        //});\n' +
    '        \n' +
    '        $(function () {\n' +
    '                $(\'#invitationDateTime\').datetimepicker(\n' +
    '                    {\n' +
    '                        minDate: new Date()\n' +
    '                    }\n' +
    '                );\n' +
    '            });\n' +
    '	});\n' +
    '</script>\n' +
    '\n' +
    '<style id="dynamicStyle">\n' +
    '    /* .form-control{\n' +
    '        background-image: url("http://localhost:33343/api/Templates/8/Image");\n' +
    '        background-repeat: no-repeat;\n' +
    '        \n' +
    '    } */\n' +
    '    \n' +
    '    /* .ta-scroll-window>.ta-bind{\n' +
    '        min-height: 1000px !important;\n' +
    '        min-width: 100px !important;\n' +
    '    } */\n' +
    '</style>\n' +
    '\n' +
    '<!-- <script>\n' +
    '    var dynamic = $(\'#dynamicStyle\');\n' +
    '    //update the contents of a style element over and over\n' +
    '    setInterval(function(){\n' +
    '        dynamic.html(\'.form-control{ background-image: url( \' + randomColor() + \');}\');\n' +
    '    }, 750);\n' +
    '    \n' +
    '    function randomColor(){\n' +
    '        return \'http://localhost:33343/api/Templates/10/Image\';\n' +
    '    }\n' +
    '</script> -->\n' +
    '\n' +
    '<div>   \n' +
    '\n' +
    '\n' +
    '\n' +
    '    <form class="form-horizontal" name="newInvitationForm">\n' +
    '    \n' +
    '        <div style="padding-left:1%" class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '                \n' +
    '            <label for="first-name">{{\'SelectTemplateLbl\' | translate}} *</label>\n' +
    '            <div class="row">\n' +
    '                <div ng-repeat="template in invitationCtrl.Templates">\n' +
    '                    <div class="col-md-2">\n' +
    '                        <label style="padding-right: 20px" >\n' +
    '                            <div class="column">\n' +
    '                                <div class="row-md-2">\n' +
    '                                    <div class="row">\n' +
    '                                        <input ng-change=\'newSelection(invitationCtrl.selectedTemplateId)\' type="radio" ng-model="invitationCtrl.selectedTemplateId" value="{{template.templateID}}" name="template" id="radio-{{template.templateID}}"/>\n' +
    '                                        <img ng-src="{{template.templateURL}}" style="height: 200px;width: 150px;"/>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </label>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div ng-messages="newInvitationForm.template.$error" class="error">\n' +
    '                <div ng-if="invitationCtrl.selectedTemplateId <=0  && !newInvitationForm.template.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '            </div>\n' +
    '\n' +
    '            <br>\n' +
    '            <div style="margin-bottom:10px">\n' +
    '                <button  ng-click="invitationCtrl.AddTemplate()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddTemplateBtn\' | translate}}</button>\n' +
    '            </div> \n' +
    '        </div>\n' +
    '\n' +
    '        <!-- <img id="imageDimensions" style="display:none;" ng-src="{{invitationCtrl.SelectedTemplateURL}}"/> -->\n' +
    '\n' +
    '        <label for="first-name">{{\'InvitationDescriptionLbl\' | translate}}</label>\n' +
    '        <!-- ng-style="{\'background-image\':\'url({{invitationCtrl.SelectedTemplateURL}})\'}" -->\n' +
    '        <text-angular ng-model="invitationCtrl.htmlVariable" ></text-angular> \n' +
    '        \n' +
    '        <br>\n' +
    '\n' +
    '        <!-- Select Invitees -->\n' +
    '\n' +
    '        <div class="row">\n' +
    '            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\n' +
    '                <label for="first-name">{{\'SelectInviteesLbl\' | translate}} *</label>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="row">\n' +
    '            <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6">\n' +
    '                <select ng-change="invitationCtrl.ChangeSelectedInvitees(invitationCtrl.selectedInvitees)" name="selectInvitees" required style="width:100% !important" class="form-control select-tags pmd-select2-tags" multiple\n' +
    '                ng-model="invitationCtrl.selectedInvitees"\n' +
    '                ng-options="invitee as invitee.displayName group by invitee.tag for invitee in invitationCtrl.InviteesList">\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="col-lg-6 col-md-6 col-sm-4 col-xs-6">\n' +
    '                <label for="first-name">{{invitationCtrl.viewedConsumedValue}} / {{invitationCtrl.TotalInvitees}} ({{\'ConsumedInviteesLbl\' | translate}} / {{\'TotalInviteesLbl\' | translate}})</label>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        \n' +
    '        <div class="row">\n' +
    '            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\n' +
    '                <div ng-messages="newInvitationForm.selectInvitees.$error" class="error">\n' +
    '                    <div ng-if="newInvitationForm.selectInvitees.$error.required  && !newInvitationForm.selectInvitees.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                </div>\n' +
    '                <div ng-messages="newInvitationForm.selectInvitees.$error" class="error">\n' +
    '                    <div ng-if="invitationCtrl.viewedConsumedValue > invitationCtrl.TotalInvitees">{{\'exceedAllowedInvitees\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- End of Select Invitees -->\n' +
    '    \n' +
    '        <div class="row">\n' +
    '            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name">{{\'InvitationNameLbl\' | translate}} *</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="invitationName" ng-model="invitationCtrl.InvitationName" ng-minlength="3" ng-maxlength="50">\n' +
    '                    <div ng-messages="newInvitationForm.invitationName.$error" class="error">\n' +
    '                            <div ng-if="newInvitationForm.invitationName.$error.required && !newInvitationForm.invitationName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                            <div ng-if="(newInvitationForm.invitationName.$error.minlength || newInvitationForm.invitationName.$error.maxlength) && !newInvitationForm.invitationName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="row">\n' +
    '            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\n' +
    '                    <div class="form-group pmd-textfield">\n' +
    '                        <label for="regular1" class="control-label">{{\'invitationDateTimeLbl\' | translate}}</label>\n' +
    '                        <input name="datetimeTxt" type="text" data-ng-model="invitationCtrl.invitationDateTime" id="invitationDateTime" class="form-control" required />\n' +
    '                        <div ng-messages="newInvitationForm.datetimeTxt.$error" class="error">\n' +
    '                            <div ng-if="newInvitationForm.datetimeTxt.$error.required  && !newInvitationForm.datetimeTxt.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </form>\n' +
    '    <!-- <iframe src="http://localhost:9091/#!/viewTemplate" style="border:none;" height="200" width="300"></iframe> -->\n' +
    '\n' +
    '    <div class="pmd-modal-action text-left">\n' +
    '        <button ng-disabled="newInvitationForm.$invalid || invitationCtrl.selectedTemplateId <=0 || invitationCtrl.viewedConsumedValue > invitationCtrl.TotalInvitees" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="AddNewInvitation()">{{\'SendBtn\' | translate}}</button>\n' +
    '        <button ng-disabled="invitationCtrl.selectedTemplateId <=0" ng-click="invitationCtrl.viewInvitation()" class="btn pmd-ripple-effect btn-primary" type="button">{{\'ViewInvitationBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/invitation/templates/invitationHistory.html',
    '<div>\n' +
    '    <div ng-if="invitationHistoryCtrl.invitationList.results.length == 0">\n' +
    '        <span>{{\'NoInvitationAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if=" invitationHistoryCtrl.invitationList.results.length >0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'InvitationNameLbl\' | translate}}</th>\n' +
    '                        <th>{{\'invitationDateTimeLbl\' | translate}}</th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="invitation in invitationHistoryCtrl.invitationList.results">\n' +
    '                        <!-- <td data-title="Name" width="20%"><a ng-href="{{invitationHistoryCtrl.inviteesURL}}{{invitation.invitationID}}" >{{invitation.invitationName}}</a></td> -->\n' +
    '                        <td data-title="Name" width="20%">{{invitation.invitationName}}</td>\n' +
    '                        <td data-title="Name" width="20%">{{invitation.invitationDateTime | date:\'MMMM dd, yyyy\'}}</td>\n' +
    '                        <td ng-class="{\'red-text\': user.isActive == false }" width="15%">\n' +
    '                            <button ng-click="invitationHistoryCtrl.InvitationDetails(invitation.invitationID)" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'viewInvitation\' | translate}}</button>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;" paging page="1" page-size="10" total="invitationHistoryCtrl.invitationList.totalCount" paging-action="invitationHistoryCtrl.changePage(page)"\n' +
    '        flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/invitation/templates/test.html',
    '<section class="blue">\n' +
    '    <div class="container">\n' +
    '\n' +
    '        <div class="content">\n' +
    '            <h2 class="content-title">Single Item</h2>\n' +
    '\n' +
    '            <script type="text/ng-template" id="tpl.html">\n' +
    '                <h3>{{ i.label }}hamdad</h3>\n' +
    '            </script>\n' +
    '\n' +
    '            <script type="text/ng-template" id="tpl2.html">\n' +
    '                <h3>{{ i }}</h3>\n' +
    '            </script>\n' +
    '\n' +
    '            <slick class="slider" settings="slickConfig" ng-if="slickConfig1Loaded" dots="true">\n' +
    '                <div ng-repeat="i in number1 track by $index">\n' +
    '                    <div class="" ng-include="\'tpl2.html\'"></div>\n' +
    '                </div>\n' +
    '            </slick>\n' +
    '\n' +
    '            <div>\n' +
    '                <button class="btn btn-info" ng-click="slickConfig.method.slickFilter(\':even\')">Filter</button>\n' +
    '                <button class="btn btn-info" ng-click="slickConfig.method.slickUnfilter()">unFilter</button>\n' +
    '                <button class="btn btn-info" ng-click="slickConfig.method.slickGoTo(2)">GoTo(2)</button>\n' +
    '                <button class="btn btn-info" ng-click="slickConfig.method.slickPrev()">Prev()</button>\n' +
    '                <button class="btn btn-info" ng-click="slickConfig.method.slickNext()">Next()</button>\n' +
    '                <button class="btn btn-info" ng-click="updateNumber1()">Update/Add()</button>\n' +
    '                <button class="btn btn-info" ng-click=\'slickConfig.method.slickRemove(3)\'>Remove(3)</button>\n' +
    '                <button class="btn btn-info" ng-click=\'slickConfig.method.slickPlay()\'>Play()</button>\n' +
    '                <button class="btn btn-info" ng-click=\'slickConfig.method.slickPause()\'>Pause()</button>\n' +
    '            </div>\n' +
    '\n' +
    '            <h2 class="content-title">Multiple Items</h2>\n' +
    '            <slick class="slider" settings="slickConfig2" ng-if="slickConfig2Loaded">\n' +
    '                <div ng-repeat="i in number2  track by $index">\n' +
    '                    <div class="" ng-include="\'tpl.html\'"></div>\n' +
    '                </div>\n' +
    '            </slick>\n' +
    '\n' +
    '            <h2 class="content-title">Responsive Display</h2>\n' +
    '            <slick class="slider" settings="slickConfig3" ng-if="slickConfig3Loaded">\n' +
    '                <div ng-repeat="i in number2">\n' +
    '                    <div class="" ng-include="\'tpl.html\'"></div>\n' +
    '                </div>\n' +
    '            </slick>\n' +
    '\n' +
    '\n' +
    '            <h2 class="content-title">Variable Width</h2>\n' +
    '\n' +
    '            <slick class="slider" settings="slickConfig4" ng-if="slickConfig4Loaded">\n' +
    '                <div ng-repeat="i in number4">\n' +
    '                    <div style="width:{{ i.label }}px; height:100px" ng-include="\'tpl.html\'"></div>\n' +
    '                </div>\n' +
    '            </slick>\n' +
    '\n' +
    '            <div>\n' +
    '                <button class="btn btn-info" ng-click="slickConfig4.method.slickGoTo(2)">GoTo(2)</button>\n' +
    '                <button class="btn btn-info" ng-click="slickConfig4.method.slickPrev()">Prev()</button>\n' +
    '                <button class="btn btn-info" ng-click="slickConfig4.method.slickNext()">Next()</button>\n' +
    '                <button class="btn btn-info" ng-click="updateNumber4()">Update/Add()</button>\n' +
    '                <button class="btn btn-info" ng-click=\'slickConfig4.method.slickRemove(3)\'>Remove(3)</button>\n' +
    '                <button class="btn btn-info" ng-click=\'slickConfig4.method.slickPlay()\'>Play()</button>\n' +
    '                <button class="btn btn-info" ng-click=\'slickConfig4.method.slickPause()\'>Pause()</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</section>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/invitation/templates/viewInvitation.html',
    '<style id="dynamicStyleView">\n' +
    '</style>\n' +
    '\n' +
    '<div class="row">\n' +
    '        <div class="col-md-3"></div>\n' +
    '    <div class="col-md-2">\n' +
    '            <button ng-show="false" class="btn pmd-ripple-effect btn-primary" type="button">{{\'ConfirmBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '    <div class="col-md-1">\n' +
    '        <button ng-show="false" class="btn pmd-ripple-effect btn btn-danger" type="button">{{\'RejectBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div  class="viewInvClass" ng-bind-html="htmlTag">\n' +
    '</div>\n' +
    '<!-- <div  class="modal-body" ng-bind-html="htmlTag" style=" background-image: URL({{imageUrl}}); height: 200%;background-repeat: no-repeat;">\n' +
    '</div> -->\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/invitation/templates/viewInvitationForInvitee.html',
    '<style id="dynamicStyleViewInv">\n' +
    '</style>\n' +
    '<style>\n' +
    '    .success{\n' +
    '        color: green;\n' +
    '    }\n' +
    '</style>\n' +
    '\n' +
    '<div class="row">\n' +
    '    <!-- <div class="col-md-1"></div> -->\n' +
    '    <div class="col-md-2">\n' +
    '        <button ng-show="viewInvitationForInviteeCtrl.ShowHideCond" class="btn pmd-ripple-effect btn-primary" ng-click="viewInvitationForInviteeCtrl.confirmInvitation()" type="button">{{\'ConfirmBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '    <div class="col-md-1">\n' +
    '        <button ng-show="viewInvitationForInviteeCtrl.ShowHideCond" class="btn pmd-ripple-effect btn btn-danger" ng-click="viewInvitationForInviteeCtrl.rejectInvitation()" type="button">{{\'RejectBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="row">\n' +
    '    <!-- <div class="col-md-1"></div> -->\n' +
    '    <div class="col-md-8">\n' +
    '        <div class="success" ng-if="viewInvitationForInviteeCtrl.InviteeInfo.inviteeStatus == viewInvitationForInviteeCtrl.confirmStat">\n' +
    '            <span>{{\'ConfirmationMsg\' | translate}}</span>\n' +
    '        </div>    \n' +
    '        <div class="error" ng-if="viewInvitationForInviteeCtrl.InviteeInfo.inviteeStatus == viewInvitationForInviteeCtrl.rejectStat">\n' +
    '            <span>{{\'RejectionMsg\' | translate}}</span>\n' +
    '        </div>    \n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '<br>\n' +
    '\n' +
    '<div  class="viewInvInvClass" ng-bind-html="htmlTag">\n' +
    '</div>\n' +
    '<!-- <div  class="modal-body" ng-bind-html="htmlTag" style=" background-image: URL({{imageUrl}}); height: 200%;background-repeat: no-repeat;">\n' +
    '</div> -->\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/template/templates/addTemplate.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <button class="close" type="button" ng-click="addTemplateCtrl.close()">×</button>\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewTemplateLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newTemplateForm">\n' +
    '       \n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >       \n' +
    '                    <input id="templateImage" name="templateImage" style="display: none;" onchange="angular.element(this).scope().AddTemplateImage(this.files)" type="file" required>\n' +
    '                    <button ng-click="addTemplateCtrl.LoadUploadImage()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '                    <img ng-src="{{addTemplateCtrl.templateImage}}" style="max-height: 200px;max-width: 200px;">\n' +
    '                    <!-- <span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedTemplateImage\' | translate}}</span> -->\n' +
    '                      <div ng-messages="newTemplateForm.templateImage.$error" >\n' +
    '                        <div ng-if="newTemplateForm.templateImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '                    </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button ng-disabled="newTemplateForm.$invalid  || addTemplateCtrl.templateImage== null" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="addTemplateCtrl.AddTemplate()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="addTemplateCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '    \n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/template/templates/template.html',
    '<div >\n' +
    '       \n' +
    '    <div style="margin-bottom:10px">\n' +
    '            <button  ng-click="templateCtrl.AddTemplate()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddBtn\' | translate}}</button>\n' +
    '    </div> \n' +
    '    \n' +
    '    <div ng-if="templateCtrl.Templates.results.length == 0">\n' +
    '            <span>{{\'NoTemplateAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="templateCtrl.Templates.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr> \n' +
    '                        <th >{{\'Templatelbl\' | translate}}</th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="template in templateCtrl.Templates.results"> \n' +
    '                        <td data-title="Image" ><img ng-src="{{template.templateURL}}" ng-alt="{{template.templateName}}" style="max-height: 200px;max-width: 200px;"/></td>\n' +
    '                        <td ng-class="{\'red-text\': user.isActive == false }" width="15%">\n' +
    '                            <i class="cursorPointer" ng-click="templateCtrl.DeleteTemplate(template.templateID)">{{\'deleteBtn\' | translate}} </i>\n' +
    '                        </td>\n' +
    '                        \n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '        <!-- <div style="text-align:center;" paging page="1" page-size="10" total="templateCtrl.Templates.totalCount" paging-action="templateCtrl.changePage( page)"\n' +
    '        flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '            </div> -->\n' +
    '    </div> \n' +
    '    \n' +
    '    <div style="text-align:center;" paging page="1" page-size="10" total="templateCtrl.Templates.totalCount" paging-action="templateCtrl.changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '    \n' +
    '</div>					\n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/core/Delete/templates/ConfirmDeleteDialog.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-body">{{\'deleteConfirmationLbl\' | translate}}<strong> {{deleteDlCtrl.itemName}}</strong> {{deleteDlCtrl.message}}? </div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button class="btn pmd-ripple-effect btn-primary pmd-btn-flat" type="button" ng-click="deleteDlCtrl.Confirm()">{{\'deleteBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default pmd-btn-flat" type="button" ng-click="deleteDlCtrl.close()">{{\'cancelBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/core/login/templates/login.html',
    '<div class="logincard" ng-if="!isLoggedIn()">\n' +
    '  	<div class="pmd-card card-default pmd-z-depth">\n' +
    '		<div class="login-card">\n' +
    '			<form ng-submit="submit(username,password)" name="loginForm">	\n' +
    '				<div class="pmd-card-body">\n' +
    '					<div class="alert alert-success" role="alert"> Oh snap! Change a few things up and try submitting again. </div>\n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="inputError1" class="control-label pmd-input-group-label">Email</label>\n' +
    '                        <div class="input-group">\n' +
    '                            <div class="input-group-addon"><i class="material-icons md-dark pmd-sm">perm_identity</i></div>\n' +
    '                            <input type="text" class="form-control" id="exampleInputAmount" required name="username" ng-model="username" ng-change="reset()">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    \n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="inputError1" class="control-label pmd-input-group-label">Password</label>\n' +
    '                        <div class="input-group">\n' +
    '                            <div class="input-group-addon"><i class="material-icons md-dark pmd-sm">lock_outline</i></div>\n' +
    '                            <input required type="password" name="password" ng-model="password" ng-change="reset()" minlength="6"  class="form-control" id="exampleInputAmount">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div ng-if="invalidLoginInfo" class="loginFailed">\n' +
    '                    <span>Incorrect email or password.</span>\n' +
    '                </div>\n' +
    '                <div ng-if="inActiveUser" class="loginFailed">\n' +
    '                    <span>Your account is deleted.</span>\n' +
    '                </div>\n' +
    '				<div class="pmd-card-footer card-footer-no-border card-footer-p16 text-center">\n' +
    '					<button  type="submit" class="btn pmd-ripple-effect btn-primary btn-block">Login</button>\n' +
    '				</div>\n' +
    '			</form>\n' +
    '		</div>\n' +
    '		\n' +
    '		\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
