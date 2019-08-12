// pages/comments/comments.js
//获取全局app.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    listComments: [],
    loadingComplete: false,
    start: 0,
    count: 20,
    total: 0,
    rate: {},
    // array: ['看过', '想看'],
    // index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 保存参数
    this.setData({
      options: options,
    });
    // 导航栏title
    wx.setNavigationBarTitle({
      title: `《${options.title}》的短评`
    })

    // 获取短评
    this.commentsList(options, this.data);
  },
  // pickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
  isCommentsToggle: function (e) {
    let listComments = this.data.listComments;
    listComments[e.currentTarget.dataset.index].isShow = true;
    this.setData({
      listComments: listComments
    });
  },
  commentsList: function (options, pageData, show = true) {
    let url = `/movie/subject/${options.id}/comments`;
    let data = {
      start: pageData.start,
      count: pageData.count
    };

    app.api.wxRequest({
      url: url,
      data: data
    }, show).then((res) => {
      //console.log(res);
      // 为短评加入一个属性，方便后面展开使用
      let comments = res.data.comments;
      for (var i in comments) {
        comments[i].isShow = false;
      }

      // 合并上拉数据
      let newData = pageData.listComments;
      newData = newData.concat(res.data.comments);

      // 更新数据
      this.setData({
        listComments: newData,
        total: res.data.total,
        rate: res.data.subject.rating
      });
    }).catch((error) => {
      wx.showToast({
        title: `请求 comments 失败!`,
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
      this.commentsList(this.data.options, this.data, false);
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