// pages/detail1/detail1.js
//获取全局app.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    listData: {},
    title: "",
    original_title: "",
    movieInfo: "",
    isTitle: true,

    iconText: '展开',
    isShow: false,
    state: {
      before: "想看",
      now: "在看",
      after: "看过"
    },
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存参数
    this.setData({
      options: options,
    });

    // 获取数据
    this.updataList(options);
  },
  isSummaryToggle: function (e) {
    let isShow = !this.data.isShow;
    let iconText = isShow ? "收起" : "展开"
    this.setData({
      iconText: iconText,
      isShow: isShow
    });
  },
  updataList: function (options, show = true) {
    let url = `/${options.method}/${options.id}`;
    let data = {};

    app.api.wxRequest({
      url: url,
      data: data
    }, show).then((res) => {
      console.log(res);
      // 导航栏title
      wx.setNavigationBarTitle({
        title: res.data.title
      })

      let title = res.data.title;
      let original_title = res.data.original_title;
      // 显示作品原名
      let isTitle = true;
      if (res.data.title === res.data.original_title) {
        isTitle = false;
      }
      // 组合影片信息
      let movieInfo = `${res.data.author} / ${res.data.publisher} / 出版时间： ${res.data.pubdate}`;

      this.setData({
        listData: res.data,
        title: title,
        original_title: original_title,
        movieInfo: movieInfo,
        isTitle: isTitle
      });
    }).catch((error) => {
      console.log(error)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})