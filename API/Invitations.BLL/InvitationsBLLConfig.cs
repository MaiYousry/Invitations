using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Invitations.BLL.DataServices;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.BLL.Services.ManageStorage;
using Invitations.DAL.Entities.Model;
using Invitations.Entities.Model;
using Invitations_GMG;
using Unity;
using Unity.Lifetime;

namespace Invitations.BLL
{
    public static class InvitationsBLLConfig
    {
        public static void RegisterMappings(MapperConfigurationExpression mapperConfiguration)
        {
            //mapperConfiguration.CreateMap<Br_InvitationInvitiee, InviteeDTO>()
            //    .ForMember(dto => dto.ContactName, m => m.MapFrom(src => src.Invitee.Contact.ContactName))
            //    .ForMember(dto => dto.InvitationName, m => m.MapFrom(src => src.Invitation.InvitationName))
            //    .ForMember(dto => dto.InviteeStatus, m => m.MapFrom(src => src.Invitee.InviteeStatus));


            mapperConfiguration.CreateMap<Invitation, InvitationDTO>();
            mapperConfiguration.CreateMap<Contact, ContactDTO>()
                .ForMember(dto => dto.ContactGroups, m => m.MapFrom(src => src.Br_GroupContacts.Where(x=> x.Group.GroupIsDeleted != true &&x.ContactInThisGroupIsDeleted != true).Select(x => x.Group).ToList()));
            mapperConfiguration.CreateMap<Br_GroupContact, Br_GroupContactDTO>().ReverseMap();
            mapperConfiguration.CreateMap<Invitee, SelectInviteesDTO>().ReverseMap();
            mapperConfiguration.CreateMap<Invitee, InviteeDTO>();
            mapperConfiguration.CreateMap<User, UserDTO>();
            mapperConfiguration.CreateMap<Package, PackageDTO>();
                 //.ForMember(dto => dto., m => m.Ignore());
            mapperConfiguration.CreateMap<Package, UserPackageDTO>();
            mapperConfiguration.CreateMap<User, UserPackageDTO>();
            mapperConfiguration.CreateMap<Template, TemplateDTO>().ReverseMap();
            mapperConfiguration.CreateMap<RefreshTokenDto, RefreshToken>().ReverseMap();
            mapperConfiguration.CreateMap<Group, GroupDTO>().ReverseMap();

            mapperConfiguration.CreateMap<Contact, SelectInviteesDTO>()
                .ForMember(dto => dto.GroupID, m => m.UseValue(-1))
                .ForMember(dto => dto.DisplayName, m => m.MapFrom(src => src.ContactName + " <" + src.ContactEmail + ">"))
                .ForMember(dto => dto.GroupName, m => m.UseValue("none"))
                .ForMember(dto => dto.Tag, m => m.UseValue("Contacts"));

            //mapperConfiguration.CreateMap<Invitee, ContactDTO>()
            //    .ForMember(dto => dto.ContactID, m => m.MapFrom(src => src.ContactID));
            
            mapperConfiguration.CreateMap<Group, SelectInviteesDTO>()
                .ForMember(dto => dto.ContactID, m => m.UseValue(-1))
                .ForMember(dto => dto.DisplayName, m => m.MapFrom(src => src.GroupName + " (Group)"))
                .ForMember(dto => dto.ContactName, m => m.UseValue("none"))
                .ForMember(dto => dto.Tag, m => m.UseValue("Groups"));
            //Mapper.Initialize(m =>
            //{
            //    m.CreateMap<User, UserDto>();

            //});
            Mapper.Initialize(mapperConfiguration);
        }

        public static void RegisterTypes(IUnityContainer container)
        {
            InvitationsDALConfig.RegisterTypes(container);
            container
                .RegisterType<IContactService, ContactService>(new PerResolveLifetimeManager())
                .RegisterType<IGroupService, GroupService>(new PerResolveLifetimeManager())
                 .RegisterType<IPackageService, PackageService>(new PerResolveLifetimeManager())
                .RegisterType<ITemplateService, TemplateService>(new PerResolveLifetimeManager())
                .RegisterType<IBr_GroupContactService, Br_GroupContactService>(new PerResolveLifetimeManager())
                .RegisterType<IInvitationService, InvitationService>(new PerResolveLifetimeManager())
               // .RegisterType<IBr_InvitationInvitieeService, Br_InvitationInvitieeService>(new PerResolveLifetimeManager())
                .RegisterType<IInviteeService, InviteeService>(new PerResolveLifetimeManager())
                .RegisterType<IRefreshTokenService, RefreshTokenService>(new PerResolveLifetimeManager())
                .RegisterType<IUserService, UserService>(new PerResolveLifetimeManager())
                .RegisterType<IManageStorage, ManageStorage>(new PerResolveLifetimeManager());
        }
    }
}
