using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Invitations.Entities.Model
{
    public class Invitee:Entity
    {
        public Invitee()
        {
           // Br_InvitationInvitiees = new List<Br_InvitationInvitiee>();
        }

        [Key]
        public long InviteeID { get; set; }

        [ForeignKey("Contact")]
        public long ContactID { get; set; }

        [ForeignKey("Invitation")]
        public long InvitationID { get; set; }
        public virtual Invitation Invitation { get; set; }
        public string InviteeStatus { get; set; }
        //public virtual ICollection<Br_InvitationInvitiee> Br_InvitationInvitiees { get; set; }
        public virtual Contact Contact { get; set; }
        [ForeignKey("User")]
        public long UserID { get; set; }
        public virtual User User { get; set; }
    }
}