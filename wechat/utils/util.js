function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function trim(str) {
  if( str == null ) {
    return "";
  }
  return str.replace( /(^\s+)|(\s+$)/g,"");
} 

function request( option ) {
  if( typeof option === "object") {
    if (typeof option.fail !== "function" ) {
      option.fail = function(res) {
        wx.showModal({
          title: '提示',
          content: '您的手机无法使用该小程序，msg:' + res.errMsg,
          success: function (res) {
            if (res.confirm) {

            } else if (res.cancel) {

            }
          }
        });
      }
    }
    if (typeof option.complete !== "function") {
      option.complete = function (res) {
         //console.log(res);
      }
    }
    wx.request(option);
  }
}

module.exports = {
  formatTime: formatTime,
  trim: trim,
  request: request
}
