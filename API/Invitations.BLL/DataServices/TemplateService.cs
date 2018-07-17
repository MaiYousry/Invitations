using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;
using Invitations.BLL.DTOs;
using AutoMapper;

namespace Invitations.BLL.DataServices
{
    public class TemplateService : Service<Template>, ITemplateService
    {
        public TemplateService(IRepositoryAsync<Template> repository) : base(repository)
        {
        }

        public List<Template> GetAllTemplate(long userID)
        {
            //***********************
            //userID 15 is the admin user
            //whenever he add a template, 
            //it will be shared all over the other accounts
            //*********************
            var templates = _repository.Query(x => x.TemplateIsDeleted != true && (x.UserID == userID || x.UserID == 15)).Select().ToList();
            return templates;
        }

        public PagedResultsDTO GetAllTemplatesForCertainUser(long userID, int page, int pageSize)
        {
            PagedResultsDTO results = new PagedResultsDTO();
            results.TotalCount = _repository.Queryable().Count(x => !x.TemplateIsDeleted && (x.UserID == userID || x.UserID == 15)); //&& x.UserID == userID
             //&& x.UserID == userID
            results.Data = Mapper.Map<List<Template>, List<TemplateDTO>>(_repository.Query(x => !x.TemplateIsDeleted && (x.UserID == userID || x.UserID == 15)).Select().OrderBy(x => x.TemplateID).Skip((page - 1) * pageSize)
                .Take(pageSize).ToList());
            return results;
        }

    }

}
