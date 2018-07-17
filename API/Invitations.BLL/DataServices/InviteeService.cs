using AutoMapper;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.BLL.DataServices
{
    class InviteeService : Service<Invitee>, IInviteeService
    {
        public InviteeService(IRepositoryAsync<Invitee> repository) : base(repository)
        {

        }
        public List<Invitee> GetAllInviteesInfo(long userID)
        {
            var invitees = _repository.Query(x => x.UserID == userID).Select().ToList();

            return invitees;
        }

        public Invitee GetInviteeByID(long inviteeID, long invitationID)
        {
            var invitee = _repository.Query(x => x.InviteeID == inviteeID && x.InvitationID == invitationID).Select().FirstOrDefault();

            return invitee;
        }

        public List<Invitee> GetInviteesByInvitation(long userID, long invitationID)
        {
            var invitees = _repository.Query(x => x.UserID == userID && x.InvitationID == invitationID).Select().ToList();

            return invitees;
        }

        public PagedResultsDTO GetInviteesByInvitation(long userID, long invitationID, int page, int pageSize)
        {
            PagedResultsDTO results = new PagedResultsDTO();
            results.TotalCount = _repository.Queryable().Count(x => x.UserID == userID && x.InvitationID == invitationID);
            results.Data = Mapper.Map<List<Invitee>, List<InviteeDTO>>(_repository.Query(x => x.UserID == userID && x.InvitationID == invitationID).Select().OrderBy(x => x.InvitationID).Skip((page - 1) * pageSize)
                .Take(pageSize).ToList());
            return results;
        }


    }
}
