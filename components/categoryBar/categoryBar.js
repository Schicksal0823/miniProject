// components/categoryBar/categoryBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleCategory:{
      type:String,
      value:''
    },
    moreCategory: {
      type: String,
      value: {}
    },
    dataCategory:{
      type: Object,
      value: {}
    },
    methodCategory: {
      type: String,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    headerTitle: '',
    headerMore: '',
    subjectsData: {},
    subjectsMethod: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updataSubjects:function(){
      // 强行凑数据
      let objectNull = this.properties.dataCategory;
      if (Object.keys(objectNull).length > 0) {
        if (this.properties.titleCategory === "中国文学"){
          this.setData({
            headerTitle: this.properties.titleCategory,
            headerMore: this.properties.moreCategory,
            subjectsData: this.properties.dataCategory.data.books,
            subjectsMethod: this.properties.methodCategory
          });
        } else if (this.properties.titleCategory === "热门单曲"){
          for (let index = 0; index < this.properties.dataCategory.data.musics.length; index++){
            let newImage = this.properties.dataCategory.data.musics[index].image;
            this.properties.dataCategory.data.musics[index].images = { small: newImage };
          }
          let newData = this.properties.dataCategory.data.musics;
          this.setData({
            headerTitle: this.properties.titleCategory,
            headerMore: this.properties.moreCategory,
            subjectsData: newData,
            subjectsMethod: this.properties.methodCategory
          });
        }else{
          this.setData({
            headerTitle: this.properties.titleCategory,
            headerMore: this.properties.moreCategory,
            subjectsData: this.properties.dataCategory.data.subjects,
            subjectsMethod: this.properties.methodCategory
          });
        }
      }
    },
    // moreUrl:function(event){
    //   console.log(event.currentTarget.dataset);
    //   wx.navigateTo({
    //     //url: `/pages/search/${event.currentTarget.dataset}`
    //     url: event.currentTarget.dataset.psd
    //   });
    // } 
  },
  lifetimes: {
    attached: function () {
      //this.updataSubjects(); 
    }
  },
  observers:{
    "dataCategory": function(){
      this.updataSubjects();
    }
  }

      

})
