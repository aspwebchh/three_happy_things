using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;
using Newtonsoft.Json;
using System.Net;
using System.IO;
using System.Text;
using web.Common;
using web.Entity;

namespace web.Models
{
    public class UserModel : BaseModel
    {


        private bool IsRegistered( string openId ) {
            var result = DbHelper.Query<User>(conn => {
                var sql = "select * from tht_user where open_id = @open_id";
                return conn.Query<User>(sql, new { open_id = openId }).ToList();
            });
            if( result.Count() > 0 ) {
                return true;
            } else {
                return false;
            }
        }

        public string Register( string openId, string nick ) {
            var isRegistered = this.IsRegistered(openId);
            if( isRegistered ) {
                return JsonResult(ServerResult.CODE_ERROR, "已注册");
            }

            var parameters = new List<MySqlParameter>(){
                new MySqlParameter("?nick",MySqlDbType.VarChar),
                new MySqlParameter("?open_id",MySqlDbType.VarChar)
            };
            parameters [0].Value = nick;
            parameters [1].Value = openId;
            var sql = "insert into tht_user(open_id, nick,add_time) values (?open_id,?nick,CURRENT_TIMESTAMP())";
            DbHelper.ExecuteSql(sql, parameters);
            return JsonResult(ServerResult.CODE_SUCCESS, "注册成功");
        }
    }
}
