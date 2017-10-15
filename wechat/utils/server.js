var urls = require('urls.js')

function register(openId, nickName, callback) {
  let url = urls.registerUrl + `?openId=${openId}&nick=${nickName}`;
  wx.request({
    url: url,
    success: function( response ) {
      if( typeof(callback) === 'function' ) {
        callback(response.data);
      }
    }
  })
}

module.exports = {
  register: register
}