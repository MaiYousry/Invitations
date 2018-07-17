using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.DAL.Entities.Model;
using Invitations.Entities;
using Invitations.Entities.Model;
using Repository.Pattern.DataContext;
using Repository.Pattern.Ef6;
using Repository.Pattern.Ef6.Factories;
using Repository.Pattern.Repositories;
using Repository.Pattern.UnitOfWork;
using Unity;
using Unity.Injection;
using Unity.Lifetime;

namespace Invitations_GMG
{
    public static class InvitationsDALConfig
    {
        public static void RegisterTypes(IUnityContainer container)
        {
            container
                .RegisterType<IDataContextAsync, InvitationsContext>(new PerResolveLifetimeManager())
                .RegisterType<IUnitOfWorkAsync, UnitOfWork>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryProvider, RepositoryProvider>(
                    new PerResolveLifetimeManager(),
                    new InjectionConstructor(new object[] { new RepositoryFactories() })
                )
                .RegisterType<IRepositoryAsync<User>, Repository<User>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Package>, Repository<Package>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Contact>, Repository<Contact>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Invitee>, Repository<Invitee>>(new PerResolveLifetimeManager())
                //.RegisterType<IRepositoryAsync<Br_InvitationInvitiee>, Repository<Br_InvitationInvitiee>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Br_GroupContact>, Repository<Br_GroupContact>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Group>, Repository<Group>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<RefreshToken>, Repository<RefreshToken>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Template>, Repository<Template>>(new PerResolveLifetimeManager())
                .RegisterType<IRepositoryAsync<Invitation>, Repository<Invitation>>(new PerResolveLifetimeManager());

        }

    }
}
