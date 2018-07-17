using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.Services.Interfaces
{
    public interface IGroupFacade
    {
        List<GroupDTO> GetAllGroupsForLoggedUser(long userID);
        PagedResultsDTO GetAllPagingGroupsForLoggedUser(long userID, int page, int pageSize);
        void AddGroup(GroupDTO groupDto, long userID);
        void UpdateGroup(GroupDTO groupDto);
        void DeleteGroup(long groupID);
    }
}