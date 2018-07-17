using AutoMapper;
using Invitations.API.Infrastructure;
using Invitations.API.Models;
using Invitations.API.Providers;
using Invitations.BLL.DTOs;
using Invitations.BLL.Services.Interfaces;
using Invitations.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Invitations.API.Controllers
{
    public class UsersController : BaseApiController
    {
        private IUserFacade _userFacade;
        private IPackageFacade _packageFacade;

        public UsersController(IUserFacade userFacade, IPackageFacade packageFacade)
        {
            _userFacade = userFacade;
            _packageFacade = packageFacade;
        }


        //[AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Users/Register", Name = "AddUsers")]
        [HttpPost]
        public IHttpActionResult AddUsers([FromBody] UserPackageModel userPackageModel)
        {
            _userFacade.AddUserAndPackage(Mapper.Map<UserPackageDTO>(userPackageModel));
            return Ok();
        }

        //[AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Users", Name = "UpdateUser")]
        [HttpPut]
        public IHttpActionResult UpdateUser([FromBody] UserModel userModel)
        {
            _userFacade.UpdateUser(Mapper.Map<UserDTO>(userModel));
            return Ok();
        }

        //[AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Users/Package", Name = "UpdatePackage")]
        [HttpPut]
        public IHttpActionResult UpdatePackage([FromBody] PackageModel packageModel)
        {
            _packageFacade.UpdatePackage(Mapper.Map<PackageDTO>(packageModel));
            return Ok();
        }
    }
}
