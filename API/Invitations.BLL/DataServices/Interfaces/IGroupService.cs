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
    public interface IGroupService : IService<Group>
    {
        PagedResultsDTO GetAllGroups(long userID, int page, int pageSize);
        Group nameValidation(string groupName);
        List<Group> GetAllGroups(long userID);
        Group nameValidationGroup(string groupName, long userID);
    }
}
