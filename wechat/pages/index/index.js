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
  onTab: function () {
    showWriteDialog(this);
  },
  onInput: function (e) {
    let val = e.detail.value;
    this.setData({ content: val });
  },
  onMaskClick: function () {
    hideWriteDialog(this);
  },

  submit: function () {
    let self = this;
    hideWriteDialog(this);
    let content = util.trim(this.data.content);
    content = encodeURIComponent(content);
    if (content == "") {
      return;
    }
    user.getUserInfoFromCache(function (data) {
      let openId = data["open_id"];
      server.addCard(openId, content, function (data) {
        wx.showToast({
          title: data.Message,
          duration: 2000
        })
        delete self.data.content
        self.load();
      });
    });
  },

  onConfirm: function () {
    this.submit();
  },
  onSubmit: function () {
    this.submit();
  },

  onDel: function (event) {
    let self = this;
    let id = event.currentTarget.dataset.id;
    server.deleteThing( id , function( data ){
      wx.showToast({
        title: data.Message,
        duration: 2000
      });
      self.load();
    });
  },

  closeTool: function (id, isClose) {
    let dataList = this.data["data_list"];
    for (let i = 0; i < dataList.length; i++) {
      let item = dataList[i];
      if (item.id == id) {
        item.closeTool = isClose;
        break;
      }
    }
    this.setData({ "data_list": dataList })
  },

  onOpenTool: function (event) {
    let id = event.currentTarget.dataset.id;
    this.closeTool(id, false);
  },

  onCloseTool: function (event) {
    let id = event.currentTarget.dataset.id;
    this.closeTool(id, true);
  },

  load: function () {
    let self = this;
    user.getUserInfoFromCache(function (data) {
      let openId = data["open_id"];
      server.getThings(openId, function (data) {
        let result = [];
        for (let key in data) {
          let items = data[key];
          result.push({ 'content': key, 'class': "date" });
          items.forEach(item => {
            item.class = "item";
            item.closeTool = true;
            result.push(item);
          });
        }
        self.setData({ "data_list": result });
      });
    });
  },
  onLoad: function () {
    this.load();
  }
})
