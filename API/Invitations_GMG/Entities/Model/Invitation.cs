using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Invitations.Entities.Model
{
    public class Invitation: Entity
    {
        public Invitation()
        {
            //Br_InvitationsInvitiee = new List<Br_InvitationInvitiee>();
            Invitees = new List<Invitee>();
        }


        [Key]
        public long InvitationID { get; set; }

        [ForeignKey("Template")]
        public long TemplateID { get; set; }
        public string InvitationName { get; set; }
        public DateTime InvitationDateTime { get; set; }
        public string InvitationAddress { get; set; }
        public string icsFile { get; set; }
        public string InvitationDescription { get; set; }
        //public virtual ICollection<Br_InvitationInvitiee> Br_InvitationsInvitiee { get; set; }
        public virtual ICollection<Invitee> Invitees { get; set; }
        public virtual Template Template { get; set; }
        [ForeignKey("User")]
        public long UserID { get; set; }
        public virtual User User { get; set; }
        

    }
}