﻿using Invitations.DAL.Entities.Model;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.DataServices.Interfaces
{
    public interface IRefreshTokenService : IService<RefreshToken>
    {
    }
}
