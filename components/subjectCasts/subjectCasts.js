// components/subjectCasts/subjectCasts.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    singleData: {
      type: Object,
      value: {}
    },
    singleMethod: {
      type: String,
      value: ''
    },
    singlePosition: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    singleShow: {},
    position: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    subjectUrl: function (event) {
      wx.navigateTo({
        url: `/pages/detail/detail?method=${this.properties.singleMethod}&id=${this.properties.singleData.id}`
      });
    }
  },
  lifetimes: {
    attached: function () {

      this.setData({
        singleShow: this.properties.singleData
      });
    }
  }

})
