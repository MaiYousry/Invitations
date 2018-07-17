
using Invitations.BLL.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Invitations.BLL.DataServices.Interfaces;
using Repository.Pattern.UnitOfWork;
using Invitations.BLL.DTOs;
using Invitations.Common.CustomException;
using Invitations.Entities.Model;

namespace Invitations.BLL.Services
{
    public class ContactFacade:BaseFacade,IContactFacade
    {
        private IContactService _contactService;
        private IBr_GroupContactService _brGroupContactService;
        private IGroupService _groupService;


        public ContactFacade(IContactService contactService, IBr_GroupContactService brGroupContactService, IGroupService groupService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _contactService = contactService;
            _brGroupContactService = brGroupContactService;
            _groupService = groupService;
        }
       
        public PagedResultsDTO GetAllPagingContactsForLoggedUser(long userID, int page, int pageSize)
        {
            var contacts = _contactService.GetAllContactsForCertainUser(userID, page, pageSize);

            return contacts;
        }

        public List<ContactDTO> GetAllContactsForLoggedUser(long userID)
        {
            var contacts = _contactService.GetAllContactsForCertainUser(userID);
            
            return Mapper.Map<List<ContactDTO>>(contacts);
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private bool IsValidName(string name)
        {
            bool isDigitPresent = name.Any(c => char.IsDigit(c));

            if (name.Count() > 2 && name.Count() < 50 && !isDigitPresent)
                return true;

            else
                return false;

        }

        private bool IsDigitsOnly(string str)
        {
            foreach (char c in str)
            {
                if (c < '0' || c > '9')
                    return false;
            }

            return true;
        }

        private bool IsValidNumber(string number)
        {
            bool isDigitsOnly = IsDigitsOnly(number);

            if (number.Count() > 9 && number.Count() < 50 && isDigitsOnly)
                return true;

            else
                return false;

        }

        public List<ContactDTO> AddContactList(List<ContactDTO> contactDto, long userID)
        {
            var contactList = new List<Contact>();

            var failedList = new List<ContactDTO>();

            foreach (var item in contactDto)
            {
                if(item.ContactEmail == null || item.ContactName == null || item.ContactMobileNum == null)
                {
                    failedList.Add(item);
                }

                else
                {
                    var emailValidation = IsValidEmail(item.ContactEmail);
                    var contactNameValidation = IsValidName(item.ContactName);
                    var numberValidation = IsValidNumber(item.ContactMobileNum);

                    if (emailValidation && contactNameValidation && numberValidation)
                    {
                        var contact = new Contact();
                        var nameValid = _contactService.emailValidation(item.ContactEmail);

                        if (nameValid == null)
                        {
                            contact.ContactEmail = item.ContactEmail;
                            contact.ContactName = item.ContactName;
                            contact.ContactMobileNum = item.ContactMobileNum;
                            contact.UserID = userID;
                            contactList.Add(contact);
                        }
                        else
                        {
                            foreach (var loop in nameValid)
                            {
                                // if exist for same user
                                if (item.UserID == userID)
                                {
                                    var existContact = new ContactDTO();
                                    existContact.ContactEmail = item.ContactEmail;
                                    existContact.ContactName = "(Already Exist) " + item.ContactName;
                                    existContact.ContactMobileNum = item.ContactMobileNum;
                                    existContact.UserID = userID;
                                    failedList.Add(existContact);
                                }
                                // if exist for another user .... so add it for this user 3adi
                                else if(item.UserID != userID)
                                {
                                    contact.ContactEmail = item.ContactEmail;
                                    contact.ContactName = item.ContactName;
                                    contact.ContactMobileNum = item.ContactMobileNum;
                                    contact.UserID = userID;
                                    contactList.Add(contact);
                                }
                            }
                            //var existContact = new ContactDTO();
                            //existContact.ContactEmail = item.ContactEmail;
                            //existContact.ContactName = "(Already Exist) " + item.ContactName;
                            //existContact.ContactMobileNum = item.ContactMobileNum;
                            //existContact.UserID = userID;
                            //failedList.Add(existContact);
                        }
                    }

                    else
                    {
                        //return;
                        failedList.Add(item);
                    }
                }
                
            }
            _contactService.InsertRange(contactList);
            SaveChanges();
            
            return failedList;
        }

        public void AddContact(ContactDTO contactDto, long userID)
        {
            var contact = new Contact();
            var nameValid = _contactService.emailValidation(contactDto.ContactEmail);

            foreach (var item in nameValid)
            {
                if (nameValid != null && item.UserID == userID) throw new NotFoundException(ErrorCodes.RepeatedContactEmail);
            }
            
            contact.ContactEmail = contactDto.ContactEmail;
            contact.ContactName = contactDto.ContactName;
            contact.ContactMobileNum = contactDto.ContactMobileNum;
            contact.UserID = userID;

            _contactService.Insert(contact);

            var group = new Group();
            var NewGroup_brGroupContact = new Br_GroupContact();
            if (contactDto.GroupName != null && contactDto.GroupName != "")
            {
                var groupNameValid = _groupService.nameValidationGroup(contactDto.GroupName, userID);
                if (groupNameValid != null) throw new NotFoundException(ErrorCodes.RepeatedGroupName);
                group.GroupName = contactDto.GroupName;
                group.UserID = userID;
                _groupService.Insert(group);
                
                NewGroup_brGroupContact.ContactID = contactDto.ContactID;
                NewGroup_brGroupContact.GroupID = group.GroupID;
                NewGroup_brGroupContact.UserID = userID;
                _brGroupContactService.Insert(NewGroup_brGroupContact);
            }
           

            var listGroups = new List<Br_GroupContact>();
            if (contactDto.ContactGroups.Count != 0)
            {
                foreach (var item in contactDto.ContactGroups)
                {
                    var brGroupContact = new Br_GroupContact();

                    brGroupContact.ContactID = contactDto.ContactID;
                    brGroupContact.GroupID = item.GroupID;
                    brGroupContact.UserID = userID;
                    listGroups.Add(brGroupContact);
                }

                _brGroupContactService.InsertRange(listGroups);
            }
            
            
            SaveChanges();
        }

        public void UpdateContact(long userID, ContactDTO contactDto)
        {
            var contact = _contactService.Find(contactDto.ContactID);
            if (contact == null) throw new NotFoundException(ErrorCodes.GroupNotFound);
            var nameValid = _contactService.emailValidation(contactDto.ContactName);
            foreach (var item in nameValid)
            {
                if (nameValid != null && item.ContactID != contactDto.ContactID && item.UserID == userID) throw new NotFoundException(ErrorCodes.RepeatedContactEmail);
            }
           // if (nameValid != null && nameValid.ContactID != contactDto.ContactID) throw new NotFoundException(ErrorCodes.RepeatedContactEmail);
            contact.ContactEmail = contactDto.ContactEmail;
            contact.ContactName = contactDto.ContactName;
            contact.ContactMobileNum = contactDto.ContactMobileNum;
            
            _contactService.Update(contact);

            UpdateBrGroupContact(userID, contactDto.ContactGroups, contactDto.ContactID);
            
            SaveChanges();
        }

        public void UpdateBrGroupContact(long userID, List<GroupDTO> contactGroups, long contactID)
        {
            //Find all already joinedGroups
            var contactsInThisGroup = _brGroupContactService.GetGroupsByContact(userID, contactID);

            var alreadyJoinedGroupsIDs = new List<long>();

            foreach (var item in contactsInThisGroup)
            {
                var itemID = item.GroupID;
                alreadyJoinedGroupsIDs.Add(itemID);
            }

            var newJoinedGroupsIDs = new List<long>();
            foreach (var item in contactGroups)
            {
                var itemID = item.GroupID;
                newJoinedGroupsIDs.Add(itemID);
            }

            var AddGroupsIDs = new List<long>();
            for (int i = 0; i < newJoinedGroupsIDs.Count; i++)
            {
                var containedThisGroup = alreadyJoinedGroupsIDs.Contains(newJoinedGroupsIDs[i]);
                if (containedThisGroup == false)
                {
                    var addID = newJoinedGroupsIDs[i];
                    AddGroupsIDs.Add(addID);
                }
            }
            
            var DeleteGroupsIDs = new List<long>();
            for (int i = 0; i < alreadyJoinedGroupsIDs.Count; i++)
            {
                var containedThisGroup = newJoinedGroupsIDs.Contains(alreadyJoinedGroupsIDs[i]);
                if (containedThisGroup == false)
                {
                    var deleteID = alreadyJoinedGroupsIDs[i];
                    DeleteGroupsIDs.Add(deleteID);
                }
            }

            //insertNewGroups fro this Contact
            var listGroups = new List<Br_GroupContact>();
            if (AddGroupsIDs.Count != 0)
            {
                foreach (var item in AddGroupsIDs)
                {
                    var brGroupContact = new Br_GroupContact();
                    brGroupContact.GroupID = item;
                    brGroupContact.ContactID = contactID;
                    brGroupContact.UserID = userID;
                    listGroups.Add(brGroupContact);
                }
                _brGroupContactService.InsertRange(listGroups);
            }

            //Delete Groups from this user


            if (DeleteGroupsIDs.Count != 0)
            {
                foreach (var item in DeleteGroupsIDs)
                {
                    var deleteUpdateGroup = _brGroupContactService.FindbyGroupIDAndContactID(userID, contactID, item);
                    deleteUpdateGroup.ContactInThisGroupIsDeleted = true;
                    _brGroupContactService.Update(deleteUpdateGroup);
                }
            }
        }

        public void DeleteContact(long contactID)
        {
            var contact = _contactService.Find(contactID);
            if (contact == null) throw new NotFoundException(ErrorCodes.ContactNotFound);

            contact.ContactIsDeleted = true;
            _contactService.Update(contact);
            SaveChanges();
        }

    }
}