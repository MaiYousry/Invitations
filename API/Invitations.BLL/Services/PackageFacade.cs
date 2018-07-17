using AutoMapper;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.BLL.DTOs;
using Invitations.BLL.Services.Interfaces;
using Invitations.Common.CustomException;
using Invitations.Entities.Model;
using Repository.Pattern.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.Services
{
    public class PackageFacade : BaseFacade, IPackageFacade
    {
        private IPackageService _packageService;

        public PackageFacade(IUnitOfWorkAsync unitOfWork, IPackageService packageService) : base(unitOfWork)
        {
            _packageService = packageService;
        }

        public void UpdatePackage(PackageDTO packageDto)
        {
            var package = _packageService.GetPackageByGUID(packageDto.PackageGuid);
            if (package == null) throw new NotFoundException(ErrorCodes.PackageNotFound);

            package.Limit = packageDto.Limit;
            package.Start = packageDto.Start;
            package.End = packageDto.End;
            package.UserConsumer = packageDto.UserConsumer;

            _packageService.Update(package);
            SaveChanges();
        }

        public PackageDTO GetAllPackagesForLoggedUser(long userID)
        {
            var packages = _packageService.GetAllPackagesForTotal(userID);

            var totalInvitees = 0;
            var consumedInvitees = 0;
            var package = new Package();

            foreach (var item in packages)
            {
                totalInvitees += item.Limit;
                consumedInvitees += item.UserConsumer;
            }

            package.Limit = totalInvitees;
            package.UserConsumer = consumedInvitees;

            return Mapper.Map<PackageDTO>(package);
        }
    }
}
