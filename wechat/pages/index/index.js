var user = require('../../utils/user.js')
var util = require('../../utils/util.js')
var server = require('../../utils/server.js')

function showWriteDialog(page) {
  page.setData({
    showWriteDialog: true
  })
}

function hideWriteDialog(page) {
  page.setData({
    showWriteDialog: false
  })
}

//index.js
//获取应用实例
var app = getApp()
Page({
  onTab: function() {
    showWriteDialog(this);
  },
  onInput: function(e) {
    let val = e.detail.value;
    this.setData({content: val});
  },
  onMaskClick: function() {
    hideWriteDialog(this);
  },

  submit: function() {
    hideWriteDialog(this);
    let content = util.trim(this.data.content);
    content = encodeURIComponent(content);
    if( content == "") {
      return;
    }
    user.getUserInfoFromCache(function (data) {
      let openId = data["open_id"];
      server.addCard(openId, content, function (data) {
        console.log(content);
        //console.log(data);
      });
    });
  },

  onConfirm : function() {
    this.submit();
  },
  onSubmit: function() {
    this.submit();
  },
  onLoad: function () {

  }
})
