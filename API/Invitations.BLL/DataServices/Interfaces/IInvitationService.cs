using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.BLL.DTOs;
using Invitations.Entities.Model;
using Service.Pattern;

namespace Invitations.BLL.DataServices.Interfaces
{
    public interface IInvitationService : IService<Invitation>
    {
        List<Invitation> GetAllInvitations(long userID);
        PagedResultsDTO GetAllInvitations(long userID, int page, int pageSize);
    }
}
