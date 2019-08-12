// components/starProgress/starProgress.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: {
      type: Object,
      value: {}
    },
    ratings_count: {
      type: Number,
      value: 0
    },
    progressWidth: {
      type: Number,
      value: 0
    },
    progresText: {
      type: Number,
      value: 0
    },
    progresBool: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    rate: {},
    rates_count: 0,
    stroke_width: 5,
    star1: 0,
    star2: 0,
    star3: 0,
    star4: 0,
    star5: 0,
    fontSize: 12,
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  // lifetimes: {
  //   attached: function () {

  //   }
  // },
  observers: {
    "rating": function () {
      if (this.properties.rating != null ){
        if (Object.keys(this.properties.rating).length > 0){
          let details = this.properties.rating.details;
          let allStarNum = 0;
          for (var i in details) {
            allStarNum += details[i];
          }

          this.setData({
            rate: this.properties.rating,
            star1: Math.round(details[1] / allStarNum * 1000) / 10,
            star2: Math.round(details[2] / allStarNum * 1000) / 10,
            star3: Math.round(details[3] / allStarNum * 1000) / 10,
            star4: Math.round(details[4] / allStarNum * 1000) / 10,
            star5: Math.round(details[5] / allStarNum * 1000) / 10
          });
        } 
      }
    },
    "ratings_count": function () {
      this.setData({
        rate_count: this.properties.ratings_count
      });
    },
    "progressWidth": function () {
      this.setData({
        stroke_width: this.properties.progressWidth
      });
    },
    "progresText": function () {
      this.setData({
        fontSize: this.properties.progresText
      });
    }, 
    "progresBool": function () {
      this.setData({
        isShow: this.properties.progresBool
      });
    }

  }

})