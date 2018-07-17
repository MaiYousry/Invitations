using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.Entities.Model
{
    public class Package : Entity
    {
        [Key]
        public long PackageID { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int Limit { get; set; }
        public Guid PackageGuid { get; set; }
        public int UserConsumer { get; set; }
        [ForeignKey("User")]
        public long UserID { get; set; }
        public virtual User User { get; set; }
    }
}
