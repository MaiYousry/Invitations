using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.API.Models
{
    public class Br_GroupContactModel
    {
        public long Br_GroupContactID { get; set; }
        public long GroupID { get; set; }
        public long ContactID { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactMobileNum { get; set; }
    }
}