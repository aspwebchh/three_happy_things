using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Entity
{
    public class Thing
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string content { get; set; }
        public DateTime add_time { get; set; }
    }
}
