using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.Entities.Model;
using Service.Pattern;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.DataServices.Interfaces
{
    public interface IContactService : IService<Contact>
    {
        List<Contact> GetAllContactsForCertainUser(long userID);
        List<Contact> emailValidation(string contactEmail);
        PagedResultsDTO GetAllContactsForCertainUser(long userID, int page, int pageSize);
        Contact GetContactByID(long contactID);
    }
}