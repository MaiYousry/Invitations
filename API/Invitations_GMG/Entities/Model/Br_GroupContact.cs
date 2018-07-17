using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Invitations.Entities.Model
{
    public class Br_GroupContact:Entity
    {
        [Key]
        public long Br_GroupContactID { get; set; }
        [ForeignKey("Group")]
        public long GroupID { get; set; }
        [ForeignKey("Contact")]
        public long ContactID { get; set; }
        public virtual Group Group { get; set; }
        public virtual Contact Contact { get; set; }
        public long UserID { get; set; }
        public bool ContactInThisGroupIsDeleted { get; set; }
    }
}