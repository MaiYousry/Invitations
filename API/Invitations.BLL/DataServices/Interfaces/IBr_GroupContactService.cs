using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.Entities.Model;
using Service.Pattern;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.DataServices.Interfaces
{
    public interface IBr_GroupContactService : IService<Br_GroupContact>
    {
        List<Contact> GetContactsByGroup(long userID, long groupID);
        List<Group> GetGroupsByContact(long userID, long contactID);
        Br_GroupContact FindbyGroupIDAndContactID(long userID, long contactID, long groupID);
        List<Contact> GetContactsByGroupForEmpty(long userID, long groupID);
        PagedResultsDTO GetPagingContactsByGroup(long userID, long groupID, int page, int pageSize);
        int GetTotalContactsInGroup(long userID, long groupID);
    }
}
