using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AutoMapper;
using Invitations.API.Infrastructure;
using Invitations.API.Models;
using Invitations.API.Providers;
using Invitations.BLL.DTOs;
using Invitations.BLL.Services.Interfaces;
using Invitations.Common;

namespace Invitations.API.Controllers
{
    public class InviteesController : BaseApiController
    {
        private IInviteeFacade _inviteeFacade;

        public InviteesController(IInviteeFacade inviteeFacade)
        {
            _inviteeFacade = inviteeFacade;
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Invitees", Name = "GetInviteesIndividualAndGroups")]
        [HttpGet]
        [ResponseType(typeof(SelectInviteesModel))]
        public IHttpActionResult GetInviteesIndividualAndGroups()
        {
            var IndvidualsAndGroups = Mapper.Map<List<SelectInviteesModel>>(_inviteeFacade.GetInviteesIndAndGroForLoggedUser(UserId));

            return Ok(IndvidualsAndGroups);
        }

        //[AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        //[Route("api/InviteesByID/{invitationID:long}", Name = "GetInviteesByInvitation")]
        //[HttpGet]
        //[ResponseType(typeof(InviteeModel))]
        //public IHttpActionResult GetInviteesByInvitation(long invitationID)
        //{
        //    var inviteesOfInvitation = Mapper.Map<List<InviteeModel>>(_inviteeFacade.GetInviteesOfInvitationForLoggedUser(UserId, invitationID));

        //    return Ok(inviteesOfInvitation);
        //}

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/InviteesByID/{invitationID:long}", Name = "GetPagingInviteesByInvitation")]
        [HttpGet]
        [ResponseType(typeof(InviteeModel))]
        public IHttpActionResult GetPagingInviteesByInvitation(long invitationID, int page = Page, int pagesize = PageSize)
        {
            var inviteesOfInvitation = _inviteeFacade.GetAllPagingInviteesForLoggedUser(UserId, invitationID, page, pagesize);
            var data = Mapper.Map<List<InviteeModel>>(inviteesOfInvitation.Data);

            return PagedResponse("GetPagingInviteesByInvitation", page, pagesize, inviteesOfInvitation.TotalCount, data, true);
        }

        // [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Invitees/{inviteeID:long}", Name = "GetCertainInvitee")]
        [HttpGet]
        [ResponseType(typeof(InviteeModel))]
        public IHttpActionResult GetCertainInvitee(long inviteeID)
        {
            var invitee = Mapper.Map<InviteeModel>(_inviteeFacade.GetInvitee(inviteeID));

            return Ok(invitee);
        }

        //[AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Invitees/{invitationID:long}/{inviteeID:long}/{isConfirmed:bool}", Name = "UpdateInvitee")]
        [HttpPut]
        public IHttpActionResult UpdateInvitee(long invitationID, long inviteeID, bool isConfirmed)
        {
            _inviteeFacade.UpdateInvitee(invitationID, inviteeID, isConfirmed);

            return Ok();
        }
    }
}
