using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.DTOs
{
    class SentInvitationDTO
    {
        public long TemplateID { get; set; }
        public string InvitationDescription { get; set; }
        public string TemplateURL { get; set; }
    }
}
