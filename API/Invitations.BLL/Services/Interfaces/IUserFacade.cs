using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Invitations.BLL.DTOs;

namespace Invitations.BLL.Services.Interfaces
{
    public interface IUserFacade
    {
        UserDTO ValidateUser(string UserName, string Password);
        UserDTO GetUser(long userID);
        void AddUserAndPackage(UserPackageDTO userPackageDto);
        void UpdateUser(UserDTO userDto);
    }
}