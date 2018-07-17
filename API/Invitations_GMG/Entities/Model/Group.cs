using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Invitations.Entities.Model
{
    public class Group:Entity
    {
        public Group()
        {
            Br_GroupsContact = new List<Br_GroupContact>();
        }

        [Key]
        public long GroupID { get; set; }
        public string GroupName { get; set; }
        public virtual ICollection<Br_GroupContact> Br_GroupsContact { get; set; }
        [ForeignKey("User")]
        public long UserID { get; set; }
        public virtual User User { get; set; }
        public bool GroupIsDeleted { get; set; }
    }
}