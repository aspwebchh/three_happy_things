using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;
using Newtonsoft.Json;
using web.Common;

namespace web.Controllers
{
    public class ApiController : Controller
    {
        public String Register(String nick)
        {
            var parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("?nick",MySqlDbType.VarChar)
            };
            parameters[0].Value = nick;
            var sql = "insert into tht_user(nick,add_time) values (?nick,CURRENT_TIMESTAMP())";
            DbHelper.ExecuteSql(sql, parameters);
            var json = JsonConvert.SerializeObject(new ServerResult { Code = ServerResult.CODE_SUCCESS, Message = "注册成功" });
            return json;
        }

        public string RecordThing(int userId, String thing)
        {
            var parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("?user_id", MySqlDbType.Int32),
                new MySqlParameter("?content",MySqlDbType.Text)
            };
            parameters[0].Value = userId;
            parameters[1].Value = thing;
            var sql = "insert into tht_thing(user_id, content,add_time) values (?user_id,?content,CURRENT_TIMESTAMP())";
            DbHelper.ExecuteSql(sql, parameters);
            var json = JsonConvert.SerializeObject(new ServerResult { Code = ServerResult.CODE_SUCCESS, Message = "记录成功" });
            return json;
        }

        public string GetThings( int userId )
        {
            var sql = "select * from tht_thing where user_id =" + userId;
            var listResult = DbHelper.Query<Entity.Thing>(sql);
            var init = new Dictionary<string, List<Entity.Thing>>();
            var result = listResult.Aggregate(init, (prod, next) =>
            {
                var key = next.add_time.ToString("yyyy-MM-dd");
                if( !prod.ContainsKey(key))
                {
                    prod[key] = new List<Entity.Thing>();
                }
                prod[key].Add(next);
                return prod;
            });
            var json = JsonConvert.SerializeObject(result);
            return json;
        }
    }
}