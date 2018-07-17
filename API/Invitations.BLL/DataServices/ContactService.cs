using AutoMapper;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.BLL.DataServices
{
    public class ContactService: Service<Contact>, IContactService
    {
        public ContactService(IRepositoryAsync<Contact> repository) : base(repository)
        {

        }

        public PagedResultsDTO GetAllContactsForCertainUser(long userID, int page, int pageSize)
        {
            PagedResultsDTO results = new PagedResultsDTO();
            results.TotalCount = _repository.Queryable().Count(x => !x.ContactIsDeleted && x.UserID == userID);
            results.Data = Mapper.Map<List<Contact>, List<ContactDTO>>(_repository.Query(x => !x.ContactIsDeleted && x.UserID == userID).Select().OrderBy(x => x.ContactID).Skip((page - 1) * pageSize)
                .Take(pageSize).ToList());
            return results;
        }

        public List<Contact> GetAllContactsForCertainUser(long userID)
        {
            var contacts = _repository.Query(x => x.UserID == userID && x.ContactIsDeleted != true).Select().ToList();
            
            return contacts;
        }

        public Contact GetContactByID (long contactID)
        {
            var contact = _repository.Query(x => x.ContactID == contactID).Select().FirstOrDefault();

            return contact;
        }

        public List<Contact> emailValidation(string contactEmail)
        {
            var contacts = _repository.Query(x => x.ContactEmail == contactEmail && x.ContactIsDeleted != true).Select().ToList();
            return contacts;
        }
    }
}