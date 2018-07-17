using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invitations.BLL.Services.ManageStorage
{
    public interface IManageStorage
    {
        void UploadImage(string path, MemoryStream image,string id);
    }
}
