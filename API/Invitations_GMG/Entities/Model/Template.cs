
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Invitations.Entities.Model
{
    public class Template: Entity
    {
        public Template()
        {
            Invitations = new List<Invitation>();
        }

        [Key]
        public long TemplateID { get; set; }
        public string TemplateName { get; set; }
        public virtual ICollection<Invitation> Invitations { get; set; }
        [ForeignKey("User")]
        public long UserID { get; set; }
        public bool TemplateIsDeleted { get; set; }
        public virtual User User { get; set; }
    }
}