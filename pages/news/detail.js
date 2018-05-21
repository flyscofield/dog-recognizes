var Api = require( '../../utils/api.js' );
var util = require( '../../utils/util.js' );
var WxParse = require('../wxParse/wxParse.js');

Page({
  data: {
    detail: {
      // 'item': null,
      'title': null,
      'src': null
    },
    url: null,
    hidden: false
  },
  ClearBr: function (key) {
    key = key.replace(/[\r\n]/g, "");
    return key;
  }, 

  onReady: function () {
    var that = this
    WxParse.wxParse('article', 'html', '', that, 5);
    var tmpDATA = {
      'title': '',
      'src': ''
    }  
    that.setData({
      detail: tmpDATA
    });

    wx.request({
      url: Api.getNewsByUrl(that.data.url),
      success: function (res) {
        var data = that.ClearBr(res.data)
        var title = data.match(/(<title>).*?(<\/title>)/ig)[0].replace('<title>', '').replace('</title>', '').split("_")[0];
        var src = data.match(/(<title>).*?(<\/title>)/ig)[0].replace('<title>', '').replace('</title>', '').split("_")[1];
        console.log(title);
        var article = data.match(/(<div class="t_fsz">).*?(\<\/div\>)/ig).slice(0, 1)[0];
        WxParse.wxParse('article', 'html', article, that, 5);
        var DATA = {
          'title': title,
          'src': src
        }
        that.setData({
          detail: DATA
        });
        setTimeout(function () {
          that.setData({
            hidden: true
          });
        }, 300);
      }
    })
  },

  onLoad: function (options) {
    console.log("############## onload ##############")
    var that = this
    that.setData({
      hidden: false
    })
    that.setData({
      url: options.url
    })
    WxParse.wxParse('article', 'html', '', that, 5);
    var tmpDATA = {
      'title': '',
      'src': ''
    }
    that.setData({
      detail: tmpDATA
    });

  }
})