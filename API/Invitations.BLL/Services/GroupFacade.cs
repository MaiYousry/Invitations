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
    public class GroupFacade : BaseFacade, IGroupFacade
    {
        private IGroupService _groupService;
        public GroupFacade(IGroupService groupService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _groupService = groupService;
        }

        public List<GroupDTO> GetAllGroupsForLoggedUser(long userID)
        {
            var groups = _groupService.GetAllGroups(userID);
            return Mapper.Map<List<GroupDTO>>(groups);
        }

        public PagedResultsDTO GetAllPagingGroupsForLoggedUser(long userID, int page, int pageSize)
        {
            var groups = _groupService.GetAllGroups(userID, page, pageSize);
            return groups;
        }

        public void AddGroup(GroupDTO groupDto, long userID)
        {
            var group = new Group();
            var nameValid = _groupService.nameValidation(groupDto.GroupName);
            if (nameValid != null && userID == nameValid.UserID) throw new NotFoundException(ErrorCodes.RepeatedGroupName);
            group.GroupName = groupDto.GroupName;
            group.UserID = userID;
            _groupService.Insert(group);

            SaveChanges();
        }

        public void UpdateGroup(GroupDTO groupDto)
        {
            var group = _groupService.Find(groupDto.GroupID);
            if (group == null) throw new NotFoundException(ErrorCodes.GroupNotFound);
            var nameValid = _groupService.nameValidation(groupDto.GroupName);
            if (nameValid != null && nameValid.GroupID != groupDto.GroupID) throw new NotFoundException(ErrorCodes.RepeatedGroupName);
            group.GroupName = groupDto.GroupName;
            //group.UserID = groupDto.UserID;
            _groupService.Update(group);
            SaveChanges();
        }

        public void DeleteGroup(long groupID)
        {
            var group = _groupService.Find(groupID);
            if (group == null) throw new NotFoundException(ErrorCodes.GroupNotFound);
            
            group.GroupIsDeleted = true;
            _groupService.Update(group);
            SaveChanges();
        }
    }
}