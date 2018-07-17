using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.BLL.DTOs;
using Invitations.Entities.Model;

namespace Invitations.BLL.Services.Interfaces
{
    public interface IInvitationFacade
    {
        List<InvitationDTO> GetInvitationsForLoggedUser(long userID);
        long AddInvitation(InvitationDTO invitationDto, long userID, string fileName);
        InvitationDTO GetCertainInvitationForLoggedUser(long userID, long invitationID);
        PagedResultsDTO GetAllPagingInvitationsForLoggedUser(long userID, int page, int pageSize);
        InvitationDTO GetInviteeInvitation(long invitationID, long inviteeID);
    }
}