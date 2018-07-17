using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.Services.Interfaces
{
    public interface IInviteeFacade
    {
        List<SelectInviteesDTO> GetInviteesIndAndGroForLoggedUser(long userID);
        List<InviteeDTO> GetInviteesOfInvitationForLoggedUser(long userID, long invitationID);
        PagedResultsDTO GetAllPagingInviteesForLoggedUser(long userID, long invitationID, int page, int pageSize);
        void UpdateInvitee(long invitationID, long inviteeID, bool isConfirmed);
        InviteeDTO GetInvitee(long inviteeID);
    }
}