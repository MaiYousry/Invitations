using Invitations.Entities.Model;

namespace Invitations_GMG.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Invitations.Entities.InvitationsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(Invitations.Entities.InvitationsContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            
        //context.Contacts.Add(new Contact()
        //    {
        //        ContactName = "test",
        //        ContactEmail = "Wedding",
        //        UserID = 1,
        //        ContactMobileNum = "22222222266666662"
        //    });

        }
    }
}
