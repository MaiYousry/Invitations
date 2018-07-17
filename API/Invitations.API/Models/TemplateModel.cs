using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Invitations.API.Models
{
    public class TemplateModel
    {
        public long TemplateID { get; set; }
        public string TemplateName { get; set; }
        public string TemplateURL { get; set; }
        //public virtual List<InvitationModel> Invitations { get; set; }
        public long UserID { get; set; }
        public bool TemplateIsDeleted { get; set; }
        public MemoryStream Image { get; set; }
    }
}