using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper.Configuration;
using Invitations.API.Models;
using Invitations.BLL;
using Invitations.BLL.DTOs;

namespace Invitations.API.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {

            var mapperConfiguration = new MapperConfigurationExpression();

           // mapperConfiguration.CreateMap<SelectInviteesDTO, SelectInviteesModel>();


            InvitationsBLLConfig.RegisterMappings(mapperConfiguration);

            //Mapper.Initialize(m =>
            //{
            //    m.CreateMap<RestaurantTypeModel, RestaurantTypeDto>();
            //    m.CreateProfile("ff",expression => {});
            //    //m.AddProfile(ECatalogBLLConfig);
            //});

        }

    }
}