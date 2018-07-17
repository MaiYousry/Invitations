using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.Entities.Model;

namespace Invitations.BLL.DTOs
{
    public class Br_GroupContactDBDTO
    {
        public long Br_GroupContactID { get; set; }
        //public long ContactID { get; set; }
        public List<Group> ContactGroups { get; set; }
        public bool ContactInThisGroupIsDeleted { get; set; }
    }
}
