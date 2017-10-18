using Dapper;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web.Common;
using web.Entity;

namespace web.Models
{
    public class ThingModel : BaseModel
    {
        public string RecordThing(string openId, string thing)
        {
            var parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("?open_id", MySqlDbType.VarChar),
                new MySqlParameter("?content",MySqlDbType.Text)
            };
            parameters[0].Value = openId;
            parameters[1].Value = thing;
            var sql = "insert into tht_thing(open_id, content,add_time) values (?open_id,?content,CURRENT_TIMESTAMP())";
            DbHelper.ExecuteSql(sql, parameters);
            return JsonResult(ServerResult.CODE_SUCCESS, "记录成功");
        }

        public string GetThings(string openId)
        {
            var listResult = DbHelper.Query<Thing>((conn) => {
                var sql = "select * from tht_thing where open_id =@open_id";
                return conn.Query<Thing>(sql, new { open_id = openId }).ToList();
            });
            var init = new Dictionary<string, List<Entity.Thing>>();
            var result = listResult.Aggregate(init, (prod, next) =>
            {
                var key = next.add_time.ToString("yyyy-MM-dd");
                if (!prod.ContainsKey(key))
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
