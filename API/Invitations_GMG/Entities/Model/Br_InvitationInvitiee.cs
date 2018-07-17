using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Invitations.Entities.Model
{
    public class Br_InvitationInvitiee: Entity
    {
        [Key]
        public long Br_InvitationInvitieeID { get; set; }
        [ForeignKey("Invitation")]
        public long InvitationID { get; set; }
        [ForeignKey("Invitee")]
        public long InviteeID { get; set; }
        public virtual Invitation Invitation { get; set; }
        public long UserID { get; set; }
        public virtual Invitee Invitee { get; set; }
    }
}