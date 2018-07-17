using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.DTOs
{
    public class PackageDTO
    {
        public long PackageID { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int Limit { get; set; }
        public Guid PackageGuid { get; set; }
        public int UserConsumer { get; set; }
        public long UserID { get; set; }
    }
}
