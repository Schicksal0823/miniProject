//主页
//获取全局app.js
const app = getApp();


// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleData: [{
        thisTitle: "影院热映",
        thisMethod: "movie",
        // thisBasic: "in_theaters",
        thisUrl: "/pages/subject/subject?method=movie&basic=in_theaters&title=影院热映",
        thisData: {}
        
      },
      {
        thisTitle: "即将上映",
        thisMethod: "movie",
        // thisBasic: "coming_soon",
        thisUrl: "/pages/subject/subject?method=movie&basic=coming_soon&title=即将上映",
        thisData: {}
      },
      {
        thisTitle: "Top250",
        thisMethod: "movie",
        // thisBasic: "top250",
        thisUrl: "/pages/subject/subject?method=movie&basic=top250&title=Top250",
        thisData: {}
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.initCategory();
    //this.ohterCategory();
  },
  //
  initCategory: function() {
    for (let index = 0; index < this.data.moduleData.length; index++) {
      app.api.wxRequest({
        url: app.config.globalUrl[index],
        data: {}
      }).then((res) => {
        let key = "moduleData[" + index + "].thisData";
        this.setData({
          [key]: res,
        });
      }).catch((error) => {
        wx.showToast({
          title: `请求失败!`,
          icon: 'none',
          duration: 2000
        });
      });
    }
  },
  ohterCategory: function () {
    app.api.wxRequest({
      url: app.config.default.book,
      data: {}
    }).then((res) => {
      let title = "中国文学";
      let method = "book";
      let basic = "search"
      let url = `/pages/subject/subject?method=${method}&basic=${basic}&title=${title}`;
      let data = res;
      this.data.moduleData.push({
        thisTitle: title,
        thisMethod: method,
        // thisBasic: basic,
        thisUrl: url,
        thisData: data
      });
      let newData = this.data.moduleData;
      this.setData({
        moduleData: newData,
      });
      console.log(res);
    }).catch((error) => {
      wx.showToast({
        title: `请求失败!`,
        icon: 'none',
        duration: 2000
      });
    });

    app.api.wxRequest({
      url: app.config.default.music,
      data: {}
    }).then((res) => {
      let title = "热门单曲";
      let method = "music";
      let basic = "search"
      let url = `/pages/subject/subject?method=${method}&basic=${basic}&title=${title}`;
      let data = res;
      this.data.moduleData.push({
        thisTitle: title,
        thisMethod: method,
        // thisBasic: basic,
        thisUrl: url,
        thisData: data
      });
      let newData = this.data.moduleData;
      this.setData({
        moduleData: newData,
      });
      console.log(res);
    }).catch((error) => {
      console.log(error)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.initCategory();
    this.ohterCategory();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})