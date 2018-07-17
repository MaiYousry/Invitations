using Invitations.BLL.Services.Interfaces;
using Invitations.Entities.Model;
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
using Invitations.Common;
using System.Web;
using System.IO;
using Newtonsoft.Json;

namespace Invitations.API.Controllers
{
    public class InvitationsController : BaseApiController
    {
        private IInvitationFacade _invitationFacade;

        public InvitationsController(IInvitationFacade invitationFacade)
        {
            _invitationFacade = invitationFacade;
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Invitations", Name = "GetAllInvitaions")]
        [HttpGet]
        [ResponseType(typeof(List<InvitationModel>))]
        public IHttpActionResult GetAllInvitaions()
        {                                                                                                    //UserId
            var invitations = Mapper.Map<List<InvitationModel>>(_invitationFacade.GetInvitationsForLoggedUser(UserId));

            return Ok(invitations);
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/InvitationsPaging", Name = "GetAllPagingInvitations")]
        [HttpGet]
        [ResponseType(typeof(IEnumerable<InvitationModel>))]
        public IHttpActionResult GetAllPagingInvitations(int page = Page, int pagesize = PageSize)
        {
            var invitations = _invitationFacade.GetAllPagingInvitationsForLoggedUser(UserId, page, pagesize);
            var data = Mapper.Map<List<InvitationModel>>(invitations.Data);

            return PagedResponse("GetAllPagingInvitations", page, pagesize, invitations.TotalCount, data, true);
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Invitations/{invitationID:long}", Name = "GetCertainInvitation")]
        [HttpGet]
        [ResponseType(typeof(InvitationModel))]
        public IHttpActionResult GetCertainInvitation(long invitationID)
        {                                                                                                    //UserId
            var invitation = Mapper.Map<InvitationModel>(_invitationFacade.GetCertainInvitationForLoggedUser(UserId, invitationID));

            var senInv = new SentInvitationModel();

            senInv.TemplateURL = Url.Link("GetTemplateImage", new { invitation.TemplateID });
            senInv.InvitationDescription = invitation.InvitationDescription;

            return Ok(senInv);
        }

        // [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Invitations/{invitationID:long}/{inviteeID:long}", Name = "GetInviteeInvitation")]
        [HttpGet]
        [ResponseType(typeof(InvitationModel))]
        public IHttpActionResult GetInviteeInvitation(long invitationID, long inviteeID)
        {
            var invitation = Mapper.Map<InvitationModel>(_invitationFacade.GetInviteeInvitation(invitationID, inviteeID));

            var senInv = new SentInvitationModel();

            senInv.TemplateURL = Url.Link("GetTemplateImage", new { invitation.TemplateID });
            senInv.InvitationDescription = invitation.InvitationDescription;
            //senInv.icsFileURL = "http://localhost:33343/InvitationsICS/" + invitation.icsFile;
            senInv.icsFileURL = "http://invitationsbackend.azurewebsites.net/InvitationsICS/" + invitation.icsFile;

            //"http://localhost:33343/InvitationsICS/" + invitation.icsFile;


            return Ok(senInv);
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Invitations", Name = "AddInvitation")]
        [HttpPost]
        public IHttpActionResult AddInvitation([FromBody] InvitationModel invitationModel)
        {
            //******* Create .ics file to add an event *********
            string schLocation = "Invitation Location";
            string schSubject = "Invitation";
            string schDescription = "Invitation description";
            System.DateTime schBeginDate = invitationModel.InvitationDateTime;
            //System.DateTime schEndDate = Convert.ToDateTime("18/2/2018 11:00:00 PM");

            //PUTTING THE MEETING DETAILS INTO AN ARRAY OF STRING

            String[] contents = { "BEGIN:VCALENDAR",
                                  "PRODID:-//Flo Inc.//FloSoft//EN",
                                  "BEGIN:VEVENT",
                                  "DTSTART:" + schBeginDate.ToUniversalTime().ToString("yyyyMMdd\\THHmmss\\Z"),
                                  "DTEND:" + schBeginDate.ToUniversalTime().ToString("yyyyMMdd\\THHmmss\\Z"),
                                  "LOCATION:" + schLocation,
                                  "DESCRIPTION;ENCODING=QUOTED-PRINTABLE:" + schDescription,
                                  "SUMMARY:" + schSubject, "PRIORITY:3",
                                  "END:VEVENT",
                                  "END:VCALENDAR" };

            /*THE METHOD 'WriteAllLines' CREATES A FILE IN THE SPECIFIED PATH WITH 
           THE SPECIFIED NAME,WRITES THE ARRAY OF CONTENTS INTO THE FILE AND CLOSES THE
            FILE.SUPPOSE THE FILE ALREADY EXISTS IN THE SPECIFIED LOCATION,THE CONTENTS 
           IN THE FILE ARE OVERWRITTEN*/

            // System.IO.File.WriteAllLines(Server.MapPath("Sample.ics"), contents);
            string datetimeNow = DateTime.Now.ToString("yyyyMMddHHmmss");
            string fileName = "Invitation" + datetimeNow + ".ics";
            System.IO.File.WriteAllLines(HttpContext.Current.Server.MapPath("~/InvitationsICS/" + fileName), contents);
            
            //*********************************************

            var invitationID = _invitationFacade.AddInvitation(Mapper.Map<InvitationDTO>(invitationModel), UserId, fileName);
            

            return Ok(new InvitationModel { InvitationID=invitationID});
        }
    }
}
