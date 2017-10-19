var urls = require('urls.js')
var util = require('util.js')

function register(openId, nickName, callback) {
  let url = urls.registerUrl + `?openId=${openId}&nick=${nickName}`;
  util.request({
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
  util.request({
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

function getThings( openId, callback ) {
  let url = urls.getThingsUrl + "?openId=" + openId;
  util.request({
    url: url,
    success: function (response) {
      if (typeof (callback) === 'function') {
        callback(response.data);
      }
    }
  });
}

function deleteThing( id,callback ) {
  let url = urls.deleteThing + "?id=" + id;
  util.request({
    url: url,
    success: function (response) {
      if (typeof (callback) === 'function') {
        callback(response.data);
      }
    }
  });
}

module.exports = {
  register: register,
  addCard: addCard,
  getThings: getThings,
  deleteThing: deleteThing
}