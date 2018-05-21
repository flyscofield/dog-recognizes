//index.js
//获取应用实例
var index = 0
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    img: "img/0.jpg",
    animationData: {}, 
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 拍照
  addCamera: function () {
    var _this = this
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var start = new Date()
        var tempFilePaths = res.tempFilePaths
        //console.log(tempFilePaths)
        var userinfo = app.globalData.userInfo
        wx.showToast({
          icon: "loading",
          title: "正在上传",
          duration: 20000
        }),
        wx.uploadFile({
          url: 'http://www.knowdogs.wang',
          //url: "http://wang.nobody.site",
          filePath: tempFilePaths[0],
          name: "file",
          //header: { 'content-type': 'multipart/form-data' },
          formData: { 'user': userinfo.nickName },
          success: function (res) {
            //do something
            console.log("服务器返回状态: " + res.statusCode)
            if(res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '服务出现故障',
                showCancel: false
              })
              return;
            } else {
              app.globalData.doginfo = res.data
              //console.log(app.globalData.doginfo)
              var end = new Date()
              console.log("time: " + (end - start))
              wx.navigateTo({
                url: 'pop/pop',
              })
            }
          },
          fail: function () {
            wx.showModal({
              title: '提示',
              content: '上传失败,请打开调试重试',
              showCancel: false
            })
            console.log("上传失败")
            return
          },
          complete: function () {
            wx.hideToast();  //隐藏Toast
          }
        })
      }
    })
  },

  onLoad: function () {
    var _this = this
    
    setInterval( function() {
      var animation = wx.createAnimation({
        duration: 3000,
        timingFunction: 'ease',
      })
      _this.animation = animation

      _this.animation.scale(1,1).step()
      _this.setData({
        img: "img/" + (++index % 3) + ".jpg",
        animationData: animation.export(),
      })
      console.log("change backgroud")
    }.bind(_this), 30000)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
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
