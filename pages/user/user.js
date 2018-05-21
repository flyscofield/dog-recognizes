//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/date.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    timestring: util.formatTime(new Date()),

    data_list: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    var that = this;
    var userinfo = app.globalData.userInfo
    var url_user = 'http://www.knowdogs.wang/?user_name=' + encodeURI(userinfo.nickName)
    console.log(url_user)
    wx.request({
      url: url_user,
      // url: 'http://www.knowdogs.wang/?user_name=' + 'whu_hyzs',
      success: function (res) {
        console.log(res.data)

        that.setData({
          data_list: res.data['history']
        })
      }
    })
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        model:app.globalData.model,
        platform: app.globalData.platform,
        system: app.globalData.system,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
