using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.Entities.Model;
using Repository.Pattern.Repositories;
using Invitations.BLL.DTOs;
using AutoMapper;

namespace Invitations.BLL.DataServices
{
    public class Br_GroupContactService : Service<Br_GroupContact>, IBr_GroupContactService
    {
        public Br_GroupContactService(IRepositoryAsync<Br_GroupContact> repository) : base(repository)
        {

        }

        public List<Contact> GetContactsByGroup(long userID, long groupID)
        {
            var contactsOfgroup = _repository.Query(x => x.UserID == userID && x.GroupID == groupID && x.Contact.ContactIsDeleted != true).Select(x=> x.Contact).ToList();

            return contactsOfgroup;
        }

        public PagedResultsDTO GetPagingContactsByGroup(long userID, long groupID, int page, int pageSize)
        {
            PagedResultsDTO results = new PagedResultsDTO();
            results.TotalCount = _repository.Queryable().Count(x => !x.ContactInThisGroupIsDeleted && x.UserID == userID);
            results.Data = Mapper.Map<List<Contact>, List<ContactDTO>>(_repository.Query(x => x.GroupID == groupID && !x.Contact.ContactIsDeleted && !x.ContactInThisGroupIsDeleted && x.UserID == userID).Select(x => x.Contact).OrderBy(x => x.ContactID).Skip((page - 1) * pageSize)
                .Take(pageSize).ToList());
            return results;
        }

        public List<Contact> GetContactsByGroupForEmpty(long userID, long groupID)
        {
            var contactsOfgroup = _repository.Query(x => x.UserID == userID && x.GroupID == groupID && x.Contact.ContactIsDeleted != true && x.ContactInThisGroupIsDeleted !=true).Select(x => x.Contact).ToList();

            return contactsOfgroup;
        }

        public List<Group> GetGroupsByContact(long userID, long contactID)
        {
            var groupsOfContacts = _repository.Query(x => x.UserID == userID && x.ContactID == contactID && x.Group.GroupIsDeleted != true && x.ContactInThisGroupIsDeleted!=true).Select(x => x.Group).ToList();

            return groupsOfContacts;
        }

        public int GetTotalContactsInGroup(long userID, long groupID)
        {
            var totalContacts = _repository.Query(x => x.UserID == userID && x.GroupID == groupID && x.Contact.ContactIsDeleted != true).Select(x => x.Contact).Count();

            return totalContacts;
        }

        public Br_GroupContact FindbyGroupIDAndContactID(long userID, long contactID, long groupID)
        {
            var contactGroup = _repository
                .Query(x => x.UserID == userID && x.ContactID == contactID && x.GroupID == groupID &&
                            x.Group.GroupIsDeleted != true && x.ContactInThisGroupIsDeleted == false).Select().FirstOrDefault();

            return contactGroup;
        }
        //public List<long> GetAllJoinedGroup(long contactID)FindbyGroupIDAndContactID
        //{
        //    var 
        //}


    }
}
