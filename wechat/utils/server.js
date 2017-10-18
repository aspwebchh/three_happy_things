var urls = require('urls.js')

function register(openId, nickName, callback) {
  let url = urls.registerUrl + `?openId=${openId}&nick=${nickName}`;
  wx.request({
    url: url,
    success: function (response) {
      if (typeof (callback) === 'function') {
        callback(response.data);
      }
    }
  })
}

function addCard(openId, content, callback) {
  let url = urls.addCardUrl + "?openId=" + openId + "&thing=" + content;
  wx.request({
    url: url,
    // method: "POST",
    // data: {
    //   "openId": openId,
    //   "thing": content
    // },
    success: function (response) {
      if (typeof (callback) === 'function') {
        callback(response.data);
      }
    }
  });
}

module.exports = {
  register: register,
  addCard: addCard
}