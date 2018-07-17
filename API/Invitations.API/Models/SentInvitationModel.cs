using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.API.Models
{
    public class SentInvitationModel
    {
        public long TemplateID { get; set; }
        public string InvitationDescription { get; set; }
        public string TemplateURL { get; set; }
        public string icsFileURL { get; set; }
    }
}