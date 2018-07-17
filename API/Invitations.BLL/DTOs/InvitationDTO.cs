using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.BLL.DTOs
{
    public class InvitationDTO
    {
        public long InvitationID { get; set; }
        public long TemplateID { get; set; }
        public string InvitationName { get; set; }
        public string InvitationDescription { get; set; }
        public int ConsumedPackage { get; set; }
        public DateTime InvitationDateTime { get; set; }
        public string InvitationAddress { get; set; }
        public string icsFile { get; set; }
        public List<SelectInviteesDTO> inviteesData { get; set; }
    }
}