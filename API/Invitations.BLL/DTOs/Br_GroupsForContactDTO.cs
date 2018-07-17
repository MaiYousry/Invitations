using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.DTOs
{
    class Br_GroupsForContactDTO
    {
        public long Br_GroupContactID { get; set; }
        public long GroupID { get; set; }
        public long ContactID { get; set; }
        public string GroupName { get; set; }
    }
}
