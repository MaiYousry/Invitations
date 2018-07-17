using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.BLL.DTOs
{
    public class GroupDTO
    {
        public long GroupID { get; set; }
        public string GroupName { get; set; }
        public long UserID { get; set; }
        public bool GroupIsDeleted { get; set; }
    }
}