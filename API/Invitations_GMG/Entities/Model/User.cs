
using Invitations.Common;
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Invitations.Entities.Model
{
    public class User:Entity
    {

        public User()
        {
            Invitations = new List<Invitation>();
            Packages = new List<Package>();
        }

        [Key]
        public long UserID { get; set; }
        public Guid UserAccountId { get; set; }
        public long ProductId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        public bool UserIsDeleted { get; set; }
        public bool IsActive { get; set; }
        public Enums.RoleType UserRoleType { get; set; }
        public virtual ICollection<Invitation> Invitations { get; set; }
        public virtual ICollection<Package> Packages { get; set; }
        public virtual ICollection<Contact> Contacts { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
        public virtual ICollection<Invitee> Invitees { get; set; }
        public virtual ICollection<Template> Templates { get; set; }
    }
}