using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.API.Models
{
    public class SelectInviteesModel
    {
        public long ContactID { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public long GroupID { get; set; }
        public int TotalContacts { get; set; }
        public string GroupName { get; set; }
        public string DisplayName { get; set; }
        public string Tag { get; set; }

    }
}