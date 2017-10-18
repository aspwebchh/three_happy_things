using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web.Common;

namespace web.Models
{
    public class BaseModel
    {
        protected string JsonResult(int code, string msg)
        {
            var json = JsonConvert.SerializeObject(new ServerResult { Code = code, Message = msg });
            return json;
        }
    }
}
