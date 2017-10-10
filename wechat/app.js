//app.js
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
          let code = res.code;
          let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
          console.log( url );
          wx.request({
            url: url,
            success: function(res) {
              console.log(res);
            }
          })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
