using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.API.Models
{
    public class Br_GroupContactDBModel
    {
        public long Br_GroupContactID { get; set; }
        public long GroupID { get; set; }
        public long ContactID { get; set; }
        public bool ContactInThisGroupIsDeleted { get; set; }
    }
}