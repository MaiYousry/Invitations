using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Invitations.BLL.DataServices.Interfaces;
using Invitations.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;
using Invitations.Common.CustomException;

namespace Invitations.BLL.DataServices
{
    public class UserService: Service<User>, IUserService
    {
        public UserService(IRepositoryAsync<User> repository) : base(repository)
        {

        }

        public User CheckValidation(string userName, string password)
        {
            var user = _repository.Query(x => x.UserName == userName && x.Password == password).Select().FirstOrDefault();

            if (!user.IsActive) throw new NotFoundException(ErrorCodes.UserNotActive);
          
            return user;
        }

        public User EmailValidation(string email)
        {
            var user = _repository.Query(x => x.UserName == email).Select().FirstOrDefault();
            return user;
        }

        public User GetUserByGUID(Guid userGuid)
        {
            var user = _repository.Query(x => x.UserAccountId == userGuid).Select().FirstOrDefault();
            return user;
        }

        public User GetUserByID(long userID)
        {
            var user = _repository.Query(x => x.UserID == userID).Select().FirstOrDefault();
            return user;
        }
    }
}
