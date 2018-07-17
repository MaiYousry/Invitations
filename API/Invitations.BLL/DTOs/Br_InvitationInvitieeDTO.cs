using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.BLL.DTOs
{
    public class Br_InvitationInvitieeDTO
    {
        public long Br_InvitationInvitieeID { get; set; }
        public long InvitationID { get; set; }
        public long InviteeID { get; set; }
    }
}