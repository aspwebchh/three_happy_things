using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Common
{
    public class ServerResult
    {
        public static int CODE_SUCCESS = 0;
        public static int CODE_ERROR = 1;

        public int Code { get; set; }
        public string Message { get; set; }
    }
}
