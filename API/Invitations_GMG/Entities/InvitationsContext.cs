using Invitations.Entities.Model;
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Invitations.DAL.Entities.Model;

namespace Invitations.Entities
{
    public class InvitationsContext: DataContext
    {
        public InvitationsContext() : base("name=InvitationsDB")
        {
            Database.SetInitializer<InvitationsContext>(null);
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<Invitee> Invitees { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Br_GroupContact> Br_GroupsContacts { get; set; }
       // public DbSet<Br_InvitationInvitiee> Br_InvitationsInvitiees { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Invitee>()
                .HasRequired(c => c.User)
                .WithMany()
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Contact>()
                .HasRequired(c => c.User)
                .WithMany()
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Invitation>()
               .HasRequired(c => c.User)
               .WithMany()
               .WillCascadeOnDelete(false);

        }

    }
}