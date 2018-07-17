using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.BLL.Services.Interfaces;
using Invitations.Common;
using Invitations.Entities.Model;
using Repository.Pattern.UnitOfWork;
using System.Configuration;
using Invitations.BLL.Services.ManageStorage;
using Invitations.Common.CustomException;

namespace Invitations.BLL.Services
{
    public class TemplateFacade : BaseFacade, ITemplateFacade
    {
        private readonly ITemplateService _templateService;
        private IManageStorage _manageStorage;

        public TemplateFacade(ITemplateService templateService, IManageStorage manageStorage, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _templateService = templateService;
            _manageStorage = manageStorage;
        }

        public PagedResultsDTO GetAllPagingTemplatesForLoggedUser(long userID, int page, int pageSize)
        {
            var templates = _templateService.GetAllTemplatesForCertainUser(userID, page, pageSize);

            return templates;
        }

        public List<TemplateDTO> getAllTemplatesForCertainUser(long userID)
        {
            var templates = _templateService.GetAllTemplate(userID);
            return Mapper.Map<List<TemplateDTO>>(templates);
        }

        public void AddTemplate(TemplateDTO templateDto, string path)
        {
            var template = Mapper.Map<Template>(templateDto);
            _templateService.Insert(template);
            SaveChanges();
            
            _manageStorage.UploadImage(path, templateDto.Image, template.TemplateID.ToString());
        }

        public void DeleteTemplate(long templateID)
        {
            var template = _templateService.Find(templateID);
            if (template == null) throw new NotFoundException(ErrorCodes.GroupNotFound);

            template.TemplateIsDeleted = true;
            _templateService.Update(template);
            SaveChanges();
        }


    }
}