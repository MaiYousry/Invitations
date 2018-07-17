using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.DTOs
{
    public class SelectInviteesDTO
    {
        public long ContactID { get; set; }
        public string ContactName { get; set; }
        public string DisplayName { get; set; }
        public string ContactEmail { get; set; }
        public long GroupID { get; set; }
        public int TotalContacts { get; set; }
        public string GroupName { get; set; }
        public string Tag { get; set; }
    }
}
