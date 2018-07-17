using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.BLL.Services.Interfaces;
using Invitations.Entities.Model;
using Repository.Pattern.UnitOfWork;
using Invitations.Common.CustomException;

namespace Invitations.BLL.Services
{
    public class InviteeFacade : BaseFacade, IInviteeFacade
    {
        private IInviteeService _inviteeService;
        private IContactService _contactService;
        private IGroupService _groupService;
        private IBr_GroupContactService _brGroupContactService;

        public InviteeFacade(IInviteeService inviteeService, IBr_GroupContactService brGroupContactService, IContactService contactService, IGroupService groupService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _inviteeService = inviteeService;
            _contactService = contactService;
            _groupService = groupService;
            _brGroupContactService = brGroupContactService;
        }

        public List<SelectInviteesDTO> GetInviteesIndAndGroForLoggedUser(long userID)
        {
            var contacts = _contactService.GetAllContactsForCertainUser(userID);

            var groupsAllowNon = _groupService.GetAllGroups(userID);

            var groups = new List<Group>();

            foreach (var item in groupsAllowNon)
            {
                var contactsInGroup = _brGroupContactService.GetContactsByGroupForEmpty(userID, item.GroupID);

                if (contactsInGroup.Count != 0)
                {
                    groups.Add(item);
                }
            }

            var indAndGro = new List<SelectInviteesDTO>();

            var contactsList = Mapper.Map<List<SelectInviteesDTO>>(contacts);

            foreach (var item in contactsList)
            {
                item.TotalContacts = 1;
            }

            indAndGro.AddRange(contactsList);

            var groupsList = Mapper.Map<List<SelectInviteesDTO>>(groups);

            foreach (var item in groupsList)
            {
                item.TotalContacts = _brGroupContactService.GetTotalContactsInGroup(userID,item.GroupID);
            }

            indAndGro.AddRange(groupsList);

            return indAndGro;
        }


        public List<InviteeDTO> GetInviteesOfInvitationForLoggedUser(long userID, long invitationID)
        {
            var invitees = _inviteeService.GetInviteesByInvitation(userID, invitationID);

            //  var contactsList = Mapper.Map<List<InviteeDTO>>(invitees);

            return Mapper.Map<List<InviteeDTO>>(invitees);
        }


        public InviteeDTO GetInvitee(long inviteeID)
        {
            var invitee = _inviteeService.Find(inviteeID);

            return Mapper.Map<InviteeDTO>(invitee);
        }

        public PagedResultsDTO GetAllPagingInviteesForLoggedUser(long userID, long invitationID, int page, int pageSize)
        {
            var invitees = _inviteeService.GetInviteesByInvitation(userID, invitationID, page, pageSize);

            return invitees;
        }

        public void UpdateInvitee(long invitationID, long inviteeID, bool isConfirmed)
        {
            var invitee = _inviteeService.Find(inviteeID);
            if (invitee == null) throw new NotFoundException(ErrorCodes.InviteeNotFound);

            if (invitee.InvitationID != invitationID) throw new NotFoundException(ErrorCodes.InvitationNotFound);

            if (isConfirmed) invitee.InviteeStatus = "Confirmed";
            else invitee.InviteeStatus = "Rejected";

            _inviteeService.Update(invitee);
            SaveChanges();
        }
    }
}