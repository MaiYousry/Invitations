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
    public interface IInviteeService: IService<Invitee>
    {
        List<Invitee> GetInviteesByInvitation(long userID, long invitationID);
        PagedResultsDTO GetInviteesByInvitation(long userID, long invitationID, int page, int pageSize);
        Invitee GetInviteeByID(long inviteeID, long invitationID);
    }
}
