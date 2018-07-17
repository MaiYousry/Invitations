using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.DTOs
{
    public class PagedResultsDTO
    {
        public int TotalCount { get; set; }
        public object Data { get; set; }
        //public bool IsParentTranslated { get; set; }
    }
}
