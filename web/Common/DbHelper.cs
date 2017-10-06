using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Dapper;

namespace web.Common
{
    public static class DbHelper
    {
        public static void ExecuteSql(string sql, List<MySqlParameter> parameters )
        {
            using (MySqlConnection conn = new MySqlConnection(Config.ConnectionString))
            {
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                parameters.ForEach(item => cmd.Parameters.Add(item));
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public static List<T> Query<T>(string sql)
        {
            using (MySqlConnection conn = new MySqlConnection(Config.ConnectionString))
            {
                var list = conn.Query<T>(sql);
                return list.ToList();
            }
        }
    }
}
