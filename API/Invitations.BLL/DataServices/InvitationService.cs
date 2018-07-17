using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;

namespace Invitations.BLL.DataServices
{
    public class InvitationService : Service<Invitation>, IInvitationService
    {
        public InvitationService(IRepositoryAsync<Invitation> repository) : base(repository)
        {

        }

        public PagedResultsDTO GetAllInvitations(long userID, int page, int pageSize)
        {
            PagedResultsDTO results = new PagedResultsDTO();
            results.TotalCount = _repository.Queryable().Count(x=> x.UserID == userID);
            results.Data = Mapper.Map<List<Invitation>, List<InvitationDTO>>(_repository.Query(x => x.UserID == userID).Select().OrderBy(x => x.InvitationID).Skip((page - 1) * pageSize)
                .Take(pageSize).ToList());
            return results;
        }

        public List<Invitation> GetAllInvitations(long userID)
        {
            var invitations = _repository.Query(x => x.UserID == userID).Select().ToList();

            return invitations;
        }

        public Invitation GetCertainInvitation(long userID)
        {
            var invitation = _repository.Query(x => x.UserID == userID).Select().FirstOrDefault();

            return invitation;
        }

    }
}
