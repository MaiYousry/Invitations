using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.BLL.DTOs
{
    public class Br_GroupContactDTO
    {
        public long Br_GroupContactID { get; set; }
        public long GroupID { get; set; }
        public long ContactID { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactMobileNum { get; set; }
    }
}