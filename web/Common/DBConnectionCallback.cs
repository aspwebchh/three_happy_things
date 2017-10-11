using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace web.Common
{
    public delegate TResult DBConnectionCallback<TResult>(MySqlConnection connect);
}
