using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.API.Models
{
    public class Br_GroupsForContactModel
    {
        public long Br_GroupContactID { get; set; }
        public long GroupID { get; set; }
        public long ContactID { get; set; }
        public string GroupName { get; set; }
    }
}