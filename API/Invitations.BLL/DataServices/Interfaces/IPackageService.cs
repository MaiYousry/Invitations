using Invitations.Entities.Model;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.DataServices.Interfaces
{
    public interface IPackageService : IService<Package>
    {
        Package GetPackageByGUID(Guid packageGuid);
        List<Package> GetAllPackagesForTotal(long userID);
        List<Package> GetPackageByUserID(long userID);
    }
}
