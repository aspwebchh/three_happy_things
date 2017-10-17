var user = require('../../utils/user.js')
var util = require('../../utils/util.js')

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
  onConfirm : function() {
    hideWriteDialog(this);
    let content = util.trim( this.data.content );
    console.log( content );
  },
  onLoad: function () {

  }
})
