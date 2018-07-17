using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.DTOs
{
    public class IntegrationDTO
    {
        public int userConsumer { get; set; }
        public Guid userAccountId { get; set; }
        public Guid backageGuid { get; set; }
    }
}
