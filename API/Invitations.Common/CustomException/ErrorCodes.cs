using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.Common.CustomException
{
    public enum ErrorCodes
    {
        UserNotFound,
        GroupNotFound,
        RepeatedGroupName,
        RepeatedContactEmail,
        ContactNotFound,
        EmptyTemplateImage,
        ImageExceedSize,
        InvalidImageType,
        TemplateNotFound,
        InvitationNotFound,
        NoAllowedAccessForInvitation,
        InviteeNotFound,
        UserNotActive,
        RepeatedEmail,
        PackageNotFound
    }
}
