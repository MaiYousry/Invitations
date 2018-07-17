using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.Services.Interfaces
{
    public interface ITemplateFacade
    {
        List<TemplateDTO> getAllTemplatesForCertainUser(long userID);
        void AddTemplate(TemplateDTO templateDto, string path);
        void DeleteTemplate(long templateID);
        PagedResultsDTO GetAllPagingTemplatesForLoggedUser(long userID, int page, int pageSize);
    }
}