var server = require('server.js')

function getUserInfoFromCache(callback) {
  var userInfo = wx.getStorageSync('userInfo');
  if (userInfo != null && userInfo != "") {
    callback(userInfo);
    return;
  }
  wx.login({
    success: res => {
      let self = this;
      let code = res.code;
      let url = 'https://www.chhblog.com/tht/Api/GetOpenID?code=' + code;
      wx.request({
        url: url,
        success: function (res) {
          let data = res.data;
          let openId = data.openid;
          let sesstionKey = data.session_key;
          getUserInfo(function (userInfo) {
            let nickName = userInfo.nickName;
            server.register(openId, nickName, function (data) {
              if (data.Code === 0) {
                userInfo["open_id"] = openId;
                wx.setStorageSync('userInfo', userInfo)
              }
            });
          });
        }
      });
    }
  })
}

function getUserInfo(cb) {
  wx.getUserInfo({
    withCredentials: false,
    success: function (res) {
      typeof cb == "function" && cb(res.userInfo)
    }
  })
}

module.exports = {
  getUserInfo: getUserInfo,
  getUserInfoFromCache: getUserInfoFromCache
}