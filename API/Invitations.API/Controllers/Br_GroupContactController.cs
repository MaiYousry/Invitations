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
    public class Br_GroupContactController : BaseApiController
    {
        private IBr_GroupContactFacade _brGroupContactFacade;

        public Br_GroupContactController(IBr_GroupContactFacade brGroupContactFacade)
        {
            _brGroupContactFacade = brGroupContactFacade;
        }

        //[AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        //[Route("api/Br_GroupContact/{groupID:long}", Name = "GetAllContactsForCertainGroup")]
        //[HttpGet]
        //[ResponseType(typeof(List<ContactModel>))]
        //public IHttpActionResult GetAllContactsForCertainGroup(long groupID)
        //{                                                                                                    //UserId
        //    var contactsForGroup = Mapper.Map<List<ContactModel>>(_brGroupContactFacade.GetAllContactsForCertainGroup(UserId, groupID));

        //    return Ok(contactsForGroup);
        //}

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Br_GroupContact/{groupID:long}", Name = "GetPagingContactsForCertainGroup")]
        [HttpGet]
        [ResponseType(typeof(ContactModel))]
        public IHttpActionResult GetPagingContactsForCertainGroup(long groupID, int page = Page, int pagesize = PageSize)
        {
            var GroupContacts = _brGroupContactFacade.GetAllContactsForCertainGroup(UserId, groupID, page, pagesize);
            var data = Mapper.Map<List<ContactModel>>(GroupContacts.Data);

            return PagedResponse("GetPagingContactsForCertainGroup", page, pagesize, GroupContacts.TotalCount, data, true);
        }


        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Br_ContactGroup/{contactID:long}", Name = "GetAllGroupsForCertainContact")]
        [HttpGet]
        [ResponseType(typeof(List<GroupModel>))]
        public IHttpActionResult GetAllGroupsForCertainContact(long contactID)
        {
            var contactsForGroup = Mapper.Map<List<GroupModel>>(_brGroupContactFacade.GetAllGroupsForCertainContact(UserId, contactID));

            return Ok(contactsForGroup);
        }

        //[AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        //[Route("api/Br_GroupContact", Name = "UpdateBr_GroupContact")]
        //[HttpPut]
        //public IHttpActionResult UpdateBr_GroupContact([FromBody] Br_GroupContactDBModel brGroupContactDbModel)
        //{
        //    _brGroupContactFacade.UpdateContact(Mapper.Map<Br_GroupContactDBDTO>(brGroupContactDbModel));
        //    return Ok();
        //}
    }
}
