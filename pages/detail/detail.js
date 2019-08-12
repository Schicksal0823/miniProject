// pages/detail/detail.js
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

    listReviews: [],
    loadingComplete: false,
    start: 0,
    count: 20,
    total: 0,

    iconText: '展开',
    isShow: false,
    scrollHeight: 0,
    videoWidth: 0,
    imagesWidth: 0,
    state: {
      before: "想看",
      now: "在看",
      after: "看过"
    },
    // commentIndex: 0,
    // commentShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 保存参数
    this.setData({
      options: options,
    });

    // 剧照宽高适应屏幕
    let windowWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      scrollHeight: windowWidth / 5 * 4,
      videoWidth: windowWidth / 3 * 2 * 2,
      imagesWidth: windowWidth * 2
    })

    // 获取数据
    this.updataList(options);
    // 获取影评
    this.reviewsList(options, this.data);

    //console.log(options)
  },
  isSummaryToggle: function(e) {
    let isShow = !this.data.isShow;
    let iconText = isShow ? "收起" : "展开"
    this.setData({
      iconText: iconText,
      isShow: isShow
    });
  },
  isCommentsToggle: function(e) {
    let listData = this.data.listData;
    listData.popular_comments[e.currentTarget.dataset.index].isShow = true;
    this.setData({
      listData: listData
    });

    // this.setData({
    //   commentIndex: e.currentTarget.dataset.index,
    //   commentShow: true
    // });
  },
  photosUrl: function(e) {
    wx.navigateTo({
      url: `/pages/photos/photos?title=${this.data.listData.title}&id=${this.data.listData.id}`
    });
  },
  commentsUrl: function(e) {
    wx.navigateTo({
      url: `/pages/comments/comments?title=${this.data.listData.title}&id=${this.data.listData.id}&ratings_count=${this.data.listData.ratings_count}&comments_count=${this.data.listData.comments_count}`
    });
  },
  reviewsUrl: function(e) {
    wx.navigateTo({
      url: `/pages/reviews/reviews?title=${this.data.listData.title}&id=${this.data.options.id}&index=${e.currentTarget.dataset.index}`
    });
  },
  updataList: function(options, show = true) {
    let url = `/${options.method}/subject/${options.id}`;
    let data = {};

    app.api.wxRequest({
      url: url,
      data: data
    }, show).then((res) => {
      //console.log(res);
      // 导航栏title
      wx.setNavigationBarTitle({
        title: res.data.title
      })

      let title = `${res.data.title} (${res.data.year})`;
      let original_title = `${res.data.original_title} (${res.data.year})`;
      // 显示影片原名
      let isTitle = true;
      if (res.data.title === res.data.original_title) {
        isTitle = false;
      }
      // 组合影片信息
      let movieInfo = `${res.data.genres.join(" ")} / ${res.data.countries.join(" ")} / 片长${res.data.durations.join(" ")}`;

      // 为短评加入一个属性，方便后面展开使用
      let comments = res.data.popular_comments;
      for (var i in comments) {
        comments[i].isShow = false;
      }

      this.setData({
        listData: res.data,
        title: title,
        original_title: original_title,
        movieInfo: movieInfo,
        isTitle: isTitle
      });
    }).catch((error) => {
      wx.showToast({
        title: `请求 subject 失败!`,
        icon: 'none',
        duration: 2000
      });
    });
  },
  reviewsList: function(options, pageData, show = true) {
    let url = `/${options.method}/subject/${options.id}/reviews`;
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
      let newData = pageData.listReviews;
      newData = newData.concat(res.data.reviews);

      // 更新数据
      this.setData({
        listReviews: newData,
        total: res.data.total
      });
    }).catch((error) => {
      wx.showToast({
        title: `请求 reviews 失败!`,
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
  onReachBottom: function() {
    // 每次下翻一页，每页获取20个；
    var start = this.data.start + 20;
    this.setData({
      start: start,
    })
    // 获取数据并拼接前面的数据，完了显示底线
    if (this.data.total > this.data.start) {
      this.reviewsList(this.data.options, this.data, false);
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
  onShareAppMessage: function() {

  }
})