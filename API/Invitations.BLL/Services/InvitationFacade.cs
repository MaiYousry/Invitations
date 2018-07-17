using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.BLL.Services.Interfaces;
using Invitations.Common.CustomException;
using Invitations.Entities.Model;
using Repository.Pattern.UnitOfWork;
using System.Net.Mail;
using System.Net.Http;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using System.Text;

namespace Invitations.BLL.Services
{
    public class InvitationFacade : BaseFacade, IInvitationFacade
    {
        private IInvitationService _invitationService;
        private IContactService _contactService;
        private IBr_GroupContactService _brGroupContactService;
        private IInviteeService _inviteeService;
        private IPackageService _packageService;
        private IUserService _userService;

        public InvitationFacade(IPackageService packageService, IUserService userService, IInvitationService invitationService, IContactService contactService, IInviteeService inviteeService, IBr_GroupContactService brGroupContactService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _invitationService = invitationService;
            _brGroupContactService = brGroupContactService;
            _inviteeService = inviteeService;
            _contactService = contactService;
            _packageService = packageService;
            _userService = userService;
        }

        public PagedResultsDTO GetAllPagingInvitationsForLoggedUser(long userID, int page, int pageSize)
        {
            var invitations = _invitationService.GetAllInvitations(userID, page, pageSize);
            return invitations;
        }

        public List<InvitationDTO> GetInvitationsForLoggedUser(long userID)
        {
            var invitations = _invitationService.GetAllInvitations(userID);

            return Mapper.Map<List<InvitationDTO>>(invitations);
        }
        public InvitationDTO GetCertainInvitationForLoggedUser(long userID, long invitationID)
        {
            var invitation = _invitationService.Find(invitationID);

            if (invitation == null) throw new NotFoundException(ErrorCodes.InvitationNotFound);

            return Mapper.Map<InvitationDTO>(invitation);
        }

        public InvitationDTO GetInviteeInvitation(long invitationID, long inviteeID)
        {
            var invitation = _invitationService.Find(invitationID);

            if (invitation == null) throw new NotFoundException(ErrorCodes.InvitationNotFound);

            var checkInviteeAllowance = _inviteeService.GetInviteeByID(inviteeID, invitationID);

            if (checkInviteeAllowance == null) throw new NotFoundException(ErrorCodes.NoAllowedAccessForInvitation);

            return Mapper.Map<InvitationDTO>(invitation);
        }

        public long AddInvitation(InvitationDTO invitationDto, long userID, string fileName)
        {
            var invitation = new Invitation();

            invitation.InvitationName = invitationDto.InvitationName;
            //invitation.InvitationDateTime = DateTime.Now;
            invitation.InvitationDateTime = invitationDto.InvitationDateTime;
            invitation.InvitationDescription = invitationDto.InvitationDescription;
            invitation.TemplateID = invitationDto.TemplateID;
            invitation.UserID = userID;
            invitation.icsFile = fileName;

            _invitationService.Insert(invitation);

            var inviteesList = AddSelectedInvitees(invitationDto.inviteesData, userID, invitation.InvitationID);

            SaveChanges();

            // Uncomment below code to run Sending email
            foreach (var item in inviteesList)
            {
                var contact = _contactService.GetContactByID(item.ContactID);

                string url = "http://invitationsbackend.azurewebsites.net/#!/viewInvitationForInvitee/" + invitation.InvitationID + "/" + item.InviteeID;
                string body = PopulateBody(url);
                SendHtmlFormattedEmail(contact.ContactEmail, "New Invitation!", body);

                //sendEmailViaWebApi(invitation.InvitationID, item.InviteeID, contact.ContactEmail, fileName);
            }

            // Edit consumed Users in package and send to subscription
            UpdateUserPackages(invitationDto.ConsumedPackage, userID);
            return invitation.InvitationID;
        }

        private void SubscriptionIntegration(Package package, User user)
        {
            var url = "http://ssubscriptionbackend.azurewebsites.net";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url + "/api/Users/EditUserConsumer");
            request.ContentType = "application/json";
            request.Method = "POST";

            var serializer = JsonConvert.SerializeObject(new
            {
                userAccountId = user.UserAccountId,
                userConsumer = package.UserConsumer,
                backageGuid = package.PackageGuid,
            });
            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                string json = serializer;

                streamWriter.Write(json);
            }

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {

                Stream receiveStream = response.GetResponseStream();
                StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
                var infoResponse = readStream.ReadToEnd();

                response.Close();
                receiveStream.Close();
                readStream.Close();
            }
        }

        private void UpdateUserPackages(int newConsumedPackage, long userID)
        {
            var user = _userService.GetUserByID(userID);

            var packages = _packageService.GetPackageByUserID(userID);
            if (packages == null) throw new NotFoundException(ErrorCodes.PackageNotFound);
            var flagConsumer = newConsumedPackage;

            foreach (var item in packages)
            {
                if (flagConsumer > 0)
                {
                    if (item.UserConsumer < item.Limit)
                    {
                        var abilityOfDeduction = item.Limit - item.UserConsumer;

                        // lw al hyt5sem aktr mn al masmo7 b fi al package d
                        if (flagConsumer > abilityOfDeduction)
                        {
                            item.UserConsumer += abilityOfDeduction;
                            flagConsumer -= abilityOfDeduction;
                            _packageService.Update(item);
                            SubscriptionIntegration(item, user);
                        }
                        //lw al hyt5sem ykafi al package d ... h5smo kolo mnha
                        else
                        {
                            item.UserConsumer += flagConsumer;
                            flagConsumer = 0;
                            _packageService.Update(item);
                            SubscriptionIntegration(item, user);
                        }

                    }
                }

                else break;

            }


            SaveChanges();
        }


        private List<Invitee> AddSelectedInvitees(List<SelectInviteesDTO> selectInviteesDtos, long userID, long invitationID)
        {
            var inviteesList = new List<Invitee>();

            foreach (var item in selectInviteesDtos)
            {
                var invitee = new Invitee();

                if (item.GroupID == -1) //Individual
                {
                    invitee.ContactID = item.ContactID;
                    invitee.UserID = userID;
                    invitee.InvitationID = invitationID;
                    invitee.InviteeStatus = "Pending";

                    inviteesList.Add(invitee);
                }

                else if (item.ContactID == -1) // Group
                {
                    //Get All Contacts In this Group
                    var contactsInGroup = _brGroupContactService.GetContactsByGroup(userID, item.GroupID);

                    foreach (var contact in contactsInGroup)
                    {
                        invitee = new Invitee
                        {
                            ContactID = contact.ContactID,
                            UserID = userID,
                            InvitationID = invitationID,
                            InviteeStatus = "Pending"
                        };

                        inviteesList.Add(invitee);
                    }
                }
            }

            _inviteeService.InsertRange(inviteesList);

            return inviteesList;
        }

        private string PopulateBody(string url)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/MailTemplate.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{Url}", url);
            return body;
        }

        private void SendHtmlFormattedEmail(string recepientEmail, string subject, string body)
        {
            string FromMail = "mezabumra@mobarkhotel.com";
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("in-v3.mailjet.com");
            mail.From = new MailAddress(FromMail);
            mail.To.Add(recepientEmail);
            mail.Subject = subject;
            mail.IsBodyHtml = true;
            mail.Body = body;
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("bcf977deb8fc4fc0472fff9c0671f1da", "623839195387298a9889232abede04e4");
            SmtpServer.EnableSsl = false;
            SmtpServer.Send(mail);

        }

        //private void SendHtmlFormattedEmail(string recepientEmail, string subject, string body)
        //{
        //    string FromMail = "gmggroupsoftware@gmail.com";
        //    MailMessage mail = new MailMessage();
        //    SmtpClient SmtpServer = new SmtpClient("in-v3.mailjet.com");
        //    mail.From = new MailAddress(FromMail);
        //    mail.To.Add(recepientEmail);
        //    mail.Subject = subject;
        //    mail.IsBodyHtml = true;
        //    mail.Body = body;
        //    SmtpServer.Port = 587;
        //    SmtpServer.Credentials = new System.Net.NetworkCredential("9d7c1de804eabdf8fedf498bffadd546", "93187ce363c3beb198214badc25cdc3c");
        //    SmtpServer.EnableSsl = false;
        //    SmtpServer.Send(mail);

        //}

        private void sendEmailViaWebApi(long invitationID, long inviteeID, string email, string fileName)
        {
            //var url = "http://localhost:9091/#!/viewInvitationForInvitee/" + invitationID + "/" + inviteeID;
            var url = "http://invitationsbackend.azurewebsites.net/#!/viewInvitationForInvitee/" + invitationID + "/" + inviteeID;

            //var fileURL = "http://localhost:33343/InvitationsICS/" + fileName + ".ics";
            // var url = "http://invitationsbackend.azurewebsites.net/#!/viewInvitationForInvitee/" + invitationID + "/" + inviteeID;

            string subject = "Invitation";
            string body = "Check invitation: " + url;

            //string htmlBody2 = @"<html lang=""en""><head><meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type""><title></title></head><body><div>Check invitation: ";
            //htmlBody2 += url;
            //htmlBody2 += "</div><br/><div>Add invitation too your calendar: ";
            //htmlBody2 += fileURL;
            //htmlBody2 += "</div></body></html>";

            string FromMail = "gmggroupsoftware@gmail.com";
            string emailTo = email;
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("in-v3.mailjet.com");
            mail.From = new MailAddress(FromMail);
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.IsBodyHtml = true;
            mail.Body = body;
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("9d7c1de804eabdf8fedf498bffadd546", "93187ce363c3beb198214badc25cdc3c");
            SmtpServer.EnableSsl = false;
            SmtpServer.Send(mail);
        }
    }
}