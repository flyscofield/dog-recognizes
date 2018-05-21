var app = getApp();
var postData = require("../../data/res.js")
Page({

  data: {
    topNews:[],
    src: null
  },
  // 页面加载
  onLoad: function (options) {
    var that = this
    that.setData({
      topNews: postData.postList.slice(1, 12)
    })
  },
  // 下拉刷新
  onPullDownRefresh:function() {
    console.log("fresh----------------->>>>>>>>")
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading(); 
    this.getNews(this)
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();  
  },
  // 上拉刷新
  onReachBottom : function() {
    console.log("fresh ################## >>>>")
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })  
    this.getNews(this)
    // 隐藏加载框  
    wx.hideLoading()
  },
  // 界面跳转
  redictDetail : function(e) {
    wx.navigateTo({
      url: "../detail/detail?url=" + e.currentTarget.dataset.url
    })
  },
  getNews: function(e){
    var data_list = postData.postList;
    console.log(data_list.length);
    var res_list = e.shuffle(data_list)
    e.setData({
      topNews: res_list.slice(1, 12),
    })

  },
  shuffle : function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    /*method1--bigin*/
    while(0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

})