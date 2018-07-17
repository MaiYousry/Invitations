using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;
using Invitations.BLL.DTOs;
using AutoMapper;

namespace Invitations.BLL.DataServices
{
    public class GroupService : Service<Group>, IGroupService
    {
        public GroupService(IRepositoryAsync<Group> repository) : base(repository)
        {

        }

        public PagedResultsDTO GetAllGroups(long userID, int page, int pageSize)
        {
            PagedResultsDTO results = new PagedResultsDTO();
            results.TotalCount = _repository.Queryable().Count(x => !x.GroupIsDeleted && x.UserID == userID);
            results.Data = Mapper.Map<List<Group>, List<GroupDTO>>(_repository.Query(x => !x.GroupIsDeleted && x.UserID == userID).Select().OrderBy(x => x.GroupID).Skip((page - 1) * pageSize)
                .Take(pageSize).ToList());
            //var groups = _repository.Query(x => x.UserID == userID && x.GroupIsDeleted != true).Select().ToList();
            return results;
        }

        public List<Group> GetAllGroups(long userID)
        {
            var groups = _repository.Query(x => x.UserID == userID && x.GroupIsDeleted != true).Select().ToList();
            return groups;
        }

        //public List<Group> GetAllNonEmptyGroups(long userID)
        //{
        //    var groups = _repository.Query(x => x.UserID == userID && x.GroupIsDeleted != true).Select().ToList();
        //    return groups;
        //}

        public Group nameValidation(string groupName)
        {
            var groups = _repository.Query(x => x.GroupName == groupName && x.GroupIsDeleted != true).Select().FirstOrDefault();
            return groups;
        }

        public Group nameValidationGroup(string groupName, long userID)
        {
            var groups = _repository.Query(x => x.GroupName == groupName && x.GroupIsDeleted != true && x.UserID == userID).Select().FirstOrDefault();
            return groups;
        }

    }
}
