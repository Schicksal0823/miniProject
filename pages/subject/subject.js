// pages/subject/subject.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjectsData: [],
    subjectsMethod: '',
    loadingComplete: false,
    options: {},
    start: 0,
    count: 20,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 保存参数
    this.setData({
      options: options,
    });
    // 导航栏title
    wx.setNavigationBarTitle({
      title: this.options.title,
    })
    //获取数据
    this.updataList(options, this.data);
    //console.log(options);
  },
  updataList: function(options, pageData, show = true) {
    let url = `/${options.method}/${options.basic}`;
    let data = {};
    if (options.method === "book") {
      data = {
        tag: "中国文学",
        start: pageData.start,
        count: pageData.count
      };
    } else if (options.method === "music") {
      data = {
        tag: "热门",
        start: pageData.start,
        count: pageData.count
      };
    } else {
      data = {
        start: pageData.start,
        count: pageData.count
      };
    }

    app.api.wxRequest({
      url: url,
      data: data
    }, show).then((res) => {
      let newRes = {};
      if (options.method === "book") {
        newRes = res.data.books;
      } else if (options.method === "music") {
        newRes = res.data.musics;
        for (let index = 0; index < newRes.length; index++) {
          let newImage = newRes[index].image;
          newRes[index].images = {
            small: newImage
          };
        }
      } else {
        newRes = res.data.subjects;
      }

      // 合并上拉数据
      let newData = pageData.subjectsData;
      newData = newData.concat(newRes);

      this.setData({
        subjectsData: newData,
        subjectsMethod: options.method,
        total: res.data.total
      });
    }).catch((error) => {
      wx.showToast({
        title: `请求 subject 失败!`,
        icon: 'none',
        duration: 2000
      });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 每次下翻一页，每页获取20个；
    var start = this.data.start + 20; 
    this.setData({
      start: start, 
    })
    // 获取数据并拼接前面的数据，完了显示底线
    if (this.data.total > this.data.start){
      this.updataList(this.data.options, this.data, false);
    }else{
      let loadingComplete = true;
      this.setData({
        loadingComplete: loadingComplete
      });
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})