using AutoMapper;
using Invitations.API.Infrastructure;
using Invitations.API.Models;
using Invitations.API.Providers;
using Invitations.BLL.Services.Interfaces;
using Invitations.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Invitations.API.Controllers
{
    public class PackagesController : BaseApiController
    {
        private IPackageFacade _packageFacade;

        public PackagesController(IPackageFacade packageFacade)
        {
            _packageFacade = packageFacade;
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Packages", Name = "GetPackage")]
        [HttpGet]
        [ResponseType(typeof(PackageModel))]
        public IHttpActionResult GetPackage()
        {                                                                                                    
            var packages = Mapper.Map<PackageModel>(_packageFacade.GetAllPackagesForLoggedUser(UserId));

            return Ok(packages);
        }
    }
}
