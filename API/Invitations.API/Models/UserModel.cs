using Invitations.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Invitations.API.Models
{
    public class UserModel
    {
        public long UserID { get; set; }
        public long ProductId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool UserIsDeleted { get; set; }
        public bool IsActive { get; set; }
        public Guid UserAccountId { get; set; }
        public string Name { get; set; }
        public Enums.RoleType UserRoleType { get; set; }
    }
}