using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.API.Models
{
    public class InvitationModel
    {
        public long InvitationID { get; set; }
        public long TemplateID { get; set; }
        public string InvitationName { get; set; }
        public string InvitationDescription { get; set; }
        public int ConsumedPackage { get; set; }
        public DateTime InvitationDateTime { get; set; }
        public string InvitationAddress { get; set; }
        public string icsFile { get; set; }
        public List<SelectInviteesModel> inviteesData { get; set; }
    }
}