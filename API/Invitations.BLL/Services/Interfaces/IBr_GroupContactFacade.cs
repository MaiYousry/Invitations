using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.Services.Interfaces
{
    public interface IBr_GroupContactFacade
    {
        List<ContactDTO> GetAllContactsForCertainGroup(long userID, long groupID);
        List<GroupDTO> GetAllGroupsForCertainContact(long userID, long contactID);
        PagedResultsDTO GetAllContactsForCertainGroup(long userID, long groupID, int page, int pageSize);
    }
}