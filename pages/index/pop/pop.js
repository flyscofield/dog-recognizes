// pop.js
const app = getApp()

Page({
  data: {
    display: "block",
    photo_path: "",
    dog_info: {}
  },

  showview: function () {
    this.setData({
      display: "block"
    })
  },

  hideview: function () {
    this.setData({
      display: "none"
    })
  },

  onLoad: function () {
    var dog = JSON.parse(app.globalData.doginfo)
    app.globalData.DogInfo = {
      //img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526714298249&di=595b32dc24a9dd7b7f940e1aa935b680&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D70386946c6bf6c81e33a24abd457db40%2F810a19d8bc3eb135df403a95ac1ea8d3fd1f441d.jpg",
      img: dog["dis_image"],
      name: dog["qm"],
      shape: dog["tx"],
      diaomao: dog["dmcd"], // 掉毛程度
      nianren: dog["nrcd"], // 粘人程度
      train: dog["kxld"], // 可训练度
      age: dog["sm"], // 寿命
      price: dog["jg"], // 价格区间

      furlength: dog["cm"],
      nickname: dog["bm"],
      high: dog["sg"],
      home: dog["ycd"],
      func: dog["gn"],
      bark: dog["xjcd"],
      smell: dog["twcd"],
      koushui: dog["kscd"],
      friend: dog["yscd"],
      cool: dog["nhcd"],
      hot: dog["nrcd"],
      extra: dog["xxxx"], // 详细信息
    }
    if (app.globalData.DogInfo) {
      this.setData({
        dog_info : app.globalData.DogInfo
      })
    } else {
      this.setData({
        dog_info:{name : "读取DogInfo错误"}
      })
    }

    app.globalData.Photo = "img/back.jpg"
    if (app.globalData.Photo) {
      this.setData({
        photo_path: app.globalData.Photo
      })
    } else {
      this.setData({
        dog_info: { name: "读取拍照照片错误" }
      })
    }
  }
})