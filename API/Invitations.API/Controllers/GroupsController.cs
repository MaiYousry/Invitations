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
using Invitations.BLL.Services.Interfaces;
using Invitations.API.Providers;
using Invitations.BLL.DTOs;
using Invitations.Common;
using Invitations.Entities.Model;

namespace Invitations.API.Controllers
{
    public class GroupsController : BaseApiController
    {
        private IGroupFacade _groupFacade;

        public GroupsController(IGroupFacade groupFacade)
        {
            _groupFacade = groupFacade;
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Groups", Name = "GetAllGroups")]
        [HttpGet]
        [ResponseType(typeof(List<GroupModel>))]
        public IHttpActionResult GetAllGroups()
        {                                                                                                    //UserId
            var groups = Mapper.Map<List<GroupModel>>(_groupFacade.GetAllGroupsForLoggedUser(UserId));

            return Ok(groups);
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/GroupsPaging", Name = "GetAllPagingGroups")]
        [HttpGet]
        [ResponseType(typeof(IEnumerable<GroupModel>))]
        public IHttpActionResult GetAllPagingGroups(int page = Page, int pagesize = PageSize)
        {                                                                                                  
            var groups = _groupFacade.GetAllPagingGroupsForLoggedUser(UserId, page, pagesize);
            var data = Mapper.Map<List<GroupModel>>(groups.Data);

            return PagedResponse("GetAllPagingGroups", page, pagesize, groups.TotalCount, data, true);
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Groups", Name = "AddGroups")]
        [HttpPost]
        public IHttpActionResult AddGroups([FromBody] GroupModel groupModel)
        {
            _groupFacade.AddGroup(Mapper.Map<GroupDTO>(groupModel), UserId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Groups", Name = "UpdateGroup")]
        [HttpPut]
        public IHttpActionResult UpdateGroup([FromBody] GroupModel groupModel)
        {
            _groupFacade.UpdateGroup(Mapper.Map<GroupDTO>(groupModel));
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Groups/{groupID:long}", Name = "DeleteGroup")]
        [HttpDelete]
        public IHttpActionResult DeleteGroup(long groupID)
        {
            _groupFacade.DeleteGroup(groupID);
            return Ok();
        }
    }
}
