var util = require('./utils/util.js')
var server = require('./utils/server.js')
var user = require('./utils/user.js')

App({
  onLaunch: function() {
    const appId = "wx61895187739be1b1";
    const secret = "2487c3b5056a825d2caa9b1aac217902";

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  }
})
