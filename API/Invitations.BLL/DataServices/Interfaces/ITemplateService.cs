using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.Entities.Model;
using Service.Pattern;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.DataServices.Interfaces
{
    public interface ITemplateService : IService<Template>
    {
        List<Template> GetAllTemplate(long userID);
        PagedResultsDTO GetAllTemplatesForCertainUser(long userID, int page, int pageSize);
    }
}
