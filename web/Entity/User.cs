using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Entity
{
    public class User
    {
        public int id { get; set; }
        public string nick { get; set; }
        public DateTime add_time { get; set; }
        public string open_id { get; set; }
    }
}
