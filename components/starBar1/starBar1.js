// components/starBar1/starBar1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate:{
      type:Number,
      value: 0
    },
    starText: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    starLight:[],
    starHalf:[],
    starGrey: [],
    rateText: '',
    isStar: true,
    fontSize: 20
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //
    upData:function(){
      let rateNum = this.properties.rate;
      let intRate = Math.ceil(rateNum);
      let Light = parseInt(intRate / 2);
      let Half = intRate % 2;
      let Grey = 5 - Light - Half;
      let isStar = true;
      if (Light === 0 && Half === 0) {
        rateNum = "暂无评分";
        isStar = false;
      } else {
        this.pushArray(Light, "starLight");
        this.pushArray(Half, "starHalf");
        this.pushArray(Grey, "starGrey");
      }

      this.setData({
        rateText: rateNum,
        isStar: isStar
      });
    },
    // 各类rate数量
    pushArray:function(num,key) {
      let data = [];
      for (let i = 0; i < num; i++){
        data.push(i);
      }

      this.setData({
        [key]: data
      });
    }
  },
  // lifetimes: {
  //   attached: function () {
  //     // 在组件实例进入页面节点树时执行
  //     this.upData();
  //   }
  // },
  observers: {
    "rate": function () {
      this.upData();
    },
    "starText": function () {
      this.setData({
        fontSize: this.properties.starText
      });
    }
  }

})
