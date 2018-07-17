using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Invitations.BLL.DTOs
{
    public class TemplateDTO
    {
        public long TemplateID { get; set; }
        public string TemplateName { get; set; }
        public string TemplateURL { get; set; }
        //public virtual List<InvitationDTO> Invitations { get; set; }
        public long UserID { get; set; }
        public MemoryStream Image { get; set; }
        public bool TemplateIsDeleted { get; set; }
    }
}