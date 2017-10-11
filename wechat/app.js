var util = require('./utils/util.js')
var server = require('./utils/server.js')

App({
  onLaunch: function() {
    const appId = "wx61895187739be1b1";
    const secret = "2487c3b5056a825d2caa9b1aac217902";

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
          let self = this;
          let code = res.code;
          let url = 'https://www.chhblog.com/tht/Api/GetOpenID?code=' + code;
          wx.request({
            url: url,
            success: function(res) {
              let data = res.data;
              let openId = data.openid;
              let sesstionKey = data.session_key;
              self.getUserInfo(function(data){
                let nickName = data.nickName;
                server.register(openId,nickName);
              });
            }
          });
      }
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
