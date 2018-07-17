using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.Entities.Model;
using Invitations.BLL.DataServices;
using Invitations.BLL.DataServices.Interfaces;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace Invitations.BLL.DataServices
{
    public class Br_InvitationInvitieeService : Service<Br_InvitationInvitiee>, IBr_InvitationInvitieeService
    {
        public Br_InvitationInvitieeService(IRepositoryAsync<Br_InvitationInvitiee> repository) : base(repository)
        {

        }
    
    }
}
