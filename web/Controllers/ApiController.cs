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
using web.Models;
using web.Entity;

namespace web.Controllers
{
    public class ApiController : Controller
    {
        private UserModel userModel = new UserModel();
        private ThingModel thingModel = new ThingModel();

        public string GetOpenID( string code )
        {
            const string APPID = "wx61895187739be1b1";
            const string SECRET = "2487c3b5056a825d2caa9b1aac217902";
            var url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + APPID + "&secret=" + SECRET + "&js_code=" + code + "&grant_type=authorization_code";
            return Http.HttpGet(url);
        }

        public String Register(string openId, string nick)
        {
            var result = userModel.Register(openId, nick);
            return result;
        }

        [HttpPost][HttpGet]
        public string RecordThing(string openId, String thing)
        {
            return thingModel.RecordThing(openId, thing);
        }

        public string GetThings( string openId )
        {
            return thingModel.GetThings(openId);
        }
    }
}