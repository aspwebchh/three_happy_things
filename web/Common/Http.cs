using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace web.Common
{
    public class Http
    {
        public static string HttpGet(string url)
        {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";
                request.ContentType = "text/html;charset=UTF-8";

                string retString = "";
                using (  HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    using (Stream stream = response.GetResponseStream())
                    {
                        using (StreamReader streamReader = new StreamReader(stream, Encoding.GetEncoding("utf-8")))
                        {
                             retString = streamReader.ReadToEnd();
                        }
                            
                    }
                }
                return retString;
        }

    }
}
