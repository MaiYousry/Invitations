using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Invitations.Entities.Model
{
    public class Contact: Entity
    {
        public Contact()
        {
            Invitees = new List<Invitee>();
            Br_GroupContacts = new List<Br_GroupContact>();
        }

        [Key]
        public long ContactID { get; set; }
        public string ContactName { get; set; }

        [DataType(DataType.EmailAddress)]
        public string ContactEmail { get; set; }
        public string ContactMobileNum { get; set; }

        //[ForeignKey("Group")]
        //public long GroupID { get; set; }
        public virtual ICollection<Invitee> Invitees { get; set; }
        public virtual ICollection<Br_GroupContact> Br_GroupContacts { get; set; }

        [ForeignKey("User")]
        public long UserID { get; set; }
        public virtual User User { get; set; }
        public bool ContactIsDeleted { get; set; }
    }
}