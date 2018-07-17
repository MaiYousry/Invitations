using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.BLL.Services.Interfaces;
using Invitations.Common.CustomException;
using Invitations.Entities.Model;
using Repository.Pattern.UnitOfWork;

namespace Invitations.BLL.Services
{
    public class Br_GroupContactFacade : BaseFacade, IBr_GroupContactFacade
    {
        private IBr_GroupContactService _brGroupContactService;

        public Br_GroupContactFacade(IBr_GroupContactService brGroupContactService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _brGroupContactService = brGroupContactService;
        }

        public List<ContactDTO> GetAllContactsForCertainGroup(long userID, long groupID)
        {
            var contactsForGroup = _brGroupContactService.GetContactsByGroup(userID, groupID);
            return Mapper.Map<List<ContactDTO>>(contactsForGroup);
        }

        public PagedResultsDTO GetAllContactsForCertainGroup(long userID, long groupID, int page, int pageSize)
        {
            var contactsForGroup = _brGroupContactService.GetPagingContactsByGroup(userID, groupID, page, pageSize);
            return contactsForGroup;
        }
        
        public List<GroupDTO> GetAllGroupsForCertainContact(long userID, long contactID)
        {
            var contactsForGroup = _brGroupContactService.GetGroupsByContact(userID, contactID);
            return Mapper.Map<List<GroupDTO>>(contactsForGroup);
        }

      
    }
}