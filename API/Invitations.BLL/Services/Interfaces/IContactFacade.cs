using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.Services.Interfaces
{
    public interface IContactFacade
    {
        List<ContactDTO> GetAllContactsForLoggedUser(long userID);
        void AddContact(ContactDTO contactDto, long userID);
        void UpdateContact(long userID, ContactDTO contactDto);
        void DeleteContact(long contactID);
        List<ContactDTO> AddContactList(List<ContactDTO> contactDto, long userID);
        PagedResultsDTO GetAllPagingContactsForLoggedUser(long userID, int page, int pageSize);
    }
}