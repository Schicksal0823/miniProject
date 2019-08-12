// components/subjectBar/subjectBar.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    singleShow:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    subjectUrl: function (event) {
      if (this.properties.singleMethod === "movie"){
        wx.navigateTo({
          url: `/pages/detail/detail?method=${this.properties.singleMethod}&id=${this.properties.singleData.id}`
        });
      }else{
        wx.navigateTo({
          url: `/pages/detail1/detail1?method=${this.properties.singleMethod}&id=${this.properties.singleData.id}`
        });
      } 
    }
  },
  lifetimes:{
    attached:function(){

      this.setData({
        singleShow: this.properties.singleData
      });
    }
  }

})
