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
    public class ContactsController : BaseApiController
    {
        private IContactFacade _contactFacade;

        public ContactsController(IContactFacade contactFacade)
        {
            _contactFacade = contactFacade;
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Contacts", Name = "GetAllContacts")]
        [HttpGet]
        [ResponseType(typeof(List<ContactModel>))]
        public IHttpActionResult GetAllContacts()
        {                                                                                                    //UserId
            var contacts = Mapper.Map<List<ContactModel>>(_contactFacade.GetAllContactsForLoggedUser(UserId));

            return Ok(contacts);
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/ContactsPaging", Name = "GetAllPagingContacts")]
        [HttpGet]
        [ResponseType(typeof(IEnumerable<ContactModel>))]
        public IHttpActionResult GetAllPagingContacts(int page = Page, int pagesize = PageSize)
        {    
            var contacts = _contactFacade.GetAllPagingContactsForLoggedUser(UserId, page, pagesize);
            var data = Mapper.Map<List<ContactModel>>(contacts.Data);

            return PagedResponse("GetAllPagingContacts", page, pagesize, contacts.TotalCount, data, true);
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Contacts", Name = "AddContact")]
        [HttpPost]
        public IHttpActionResult AddContact([FromBody] ContactModel contactModel)
        {
            _contactFacade.AddContact(Mapper.Map<ContactDTO>(contactModel), UserId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/ContactsList", Name = "AddContactList")]
        [HttpPost]
        public IHttpActionResult AddContactList([FromBody] List<ContactModel> contactModelList)
        {
            var listOfContacts = new List<ContactDTO>();

            foreach (var item in contactModelList)
            {
                var contact = new ContactDTO();
                contact = Mapper.Map<ContactDTO>(item);
                listOfContacts.Add(contact);
            }

            var failedContacts = _contactFacade.AddContactList(listOfContacts, UserId);
            return Ok(failedContacts);
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Contacts", Name = "UpdateContact")]
        [HttpPut]
        public IHttpActionResult UpdateContact([FromBody] ContactModel contactModel)
        {
            _contactFacade.UpdateContact(UserId, Mapper.Map<ContactDTO>(contactModel));
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Contacts/{contactID:long}", Name = "DeleteContact")]
        [HttpDelete]
        public IHttpActionResult DeleteContact(long contactID)
        {
            _contactFacade.DeleteContact(contactID);
            return Ok();
        }
    }
}
