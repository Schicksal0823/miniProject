// pages/photos/photos.js
//获取全局app.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    imagesHeight: 0,
    imagesWidth: 0,
    listPhotos: [],
    loadingComplete: false,
    start: 0,
    count: 20,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存参数
    this.setData({
      options: options,
    });

    // 剧照宽高适应屏幕
    let windowWidth = wx.getSystemInfoSync().windowWidth
    let imagesWidth = (windowWidth - 5 ) / 3;
    this.setData({
      imagesHeight: imagesWidth * 2,
      imagesWidth: imagesWidth * 2
    })

    // 导航栏title
    wx.setNavigationBarTitle({
      title: `《${options.title}》的剧照`
    })

    this.photosList(options, this.data);
    //console.log(options);
  },
  photosList: function (options, pageData, show = true) {
    let url = `/movie/subject/${options.id}/photos`;
    let data = {
      start: pageData.start,
      count: pageData.count
    };

    app.api.wxRequest({
      url: url,
      data: data
    }, show).then((res) => {
      //console.log(res);
      
      // 合并上拉数据
      let newData = pageData.listPhotos;
      newData = newData.concat(res.data.photos);

      this.setData({
        listPhotos: newData,
        total: res.data.total
      });
    }).catch((error) => {
      wx.showToast({
        title: `请求 photos 失败!`,
        icon: 'none',
        duration: 2000
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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
    if (this.data.total > this.data.start) {
      this.photosList(this.data.options, this.data, false);
    } else {
      let loadingComplete = true;
      this.setData({
        loadingComplete: loadingComplete
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})