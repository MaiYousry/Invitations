using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.BLL.DTOs
{
    public class InviteeDTO
    {
        public long InviteeID { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactMobileNum { get; set; }
        public string InvitationName { get; set; }
        public string InviteeStatus { get; set; }
        public ContactDTO Contact { get; set; }

    }
}