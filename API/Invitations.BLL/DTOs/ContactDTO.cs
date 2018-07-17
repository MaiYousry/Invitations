using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.Entities.Model;

namespace Invitations.BLL.DTOs
{
    public class ContactDTO
    {
        public long ContactID { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactMobileNum { get; set; }
        public long UserID { get; set; }
        public bool ContactIsDeleted { get; set; }
        public List<GroupDTO> ContactGroups { get; set; }
        public string GroupName { get; set; }
    }
}