using Invitations.BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.Services.Interfaces
{
    public interface IPackageFacade
    {
        void UpdatePackage(PackageDTO packageDto);
        PackageDTO GetAllPackagesForLoggedUser(long userID);
    }
}
