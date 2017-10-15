var user = require('../../utils/user.js')

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  onLoad: function () {
    var that = this
    user.getUserInfoFromCache(function(userInfo){
      console.log(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
