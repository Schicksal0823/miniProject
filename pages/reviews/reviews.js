// pages/reviews/reviews.js
//获取全局app.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    listReviews: {},
    article_content: ""
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
      title: `${options.title}的影评`
    })

    // 获取影评
    this.reviewsList(options, this.data);
  },
  reviewsList: function (options, pageData, show = true) {
    let url = `/movie/subject/${options.id}/reviews`;
    let data = {
      start: options.index,
      count: 1
    };

    app.api.wxRequest({
      url: url,
      data: data
    }, show).then((res) => {
      //console.log(res);
      let article_content = res.data.reviews[0].content;
      article_content = article_content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ');
      article_content = article_content.replace(/\r\n/gi, '<br/><br/>')
      // 更新数据
      this.setData({
        article_content: article_content,
        listReviews: res.data.reviews[0]
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})