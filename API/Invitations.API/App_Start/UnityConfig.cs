using System.Web.Http;
using Invitations.BLL;
using Unity;
using Unity.WebApi;
using Unity.Lifetime;
using Invitations.BLL.Services.Interfaces;
using Invitations.BLL.Services;

namespace Invitations.API
{
    public static class UnityConfig
    {
        public static void RegisterTypes(HttpConfiguration config)
        {
            // NOTE: To load from web.config uncomment the line below. Make sure to add a Microsoft.Practices.Unity.Configuration to the using statements.
            // container.LoadConfiguration();
            var container = new UnityContainer();

            // TODO: Register your types here

            ApplyMapping(container, false);


            //GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver =
                config.DependencyResolver = new UnityDependencyResolver(container);


        }

        public static void ApplyMapping(IUnityContainer container, bool applyDependencyResolver)
        {
            container.RegisterType<IInvitationFacade, InvitationFacade>(new PerResolveLifetimeManager())
                     .RegisterType<IUserFacade, UserFacade>(new PerResolveLifetimeManager())
                     .RegisterType<IGroupFacade, GroupFacade>(new PerResolveLifetimeManager())
                     .RegisterType<ITemplateFacade, TemplateFacade>(new PerResolveLifetimeManager())
                     .RegisterType<IInviteeFacade, InviteeFacade>(new PerResolveLifetimeManager())
                     .RegisterType<IBr_GroupContactFacade, Br_GroupContactFacade>(new PerResolveLifetimeManager())
                     .RegisterType<IPackageFacade, PackageFacade>(new PerResolveLifetimeManager())
                     .RegisterType<IContactFacade, ContactFacade>(new PerResolveLifetimeManager())
                     .RegisterType<IRefreshTokenFacade, RefreshTokenFacade>(new PerResolveLifetimeManager());


            InvitationsBLLConfig.RegisterTypes(container);
            if (applyDependencyResolver)
                GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);


        }
    }
}