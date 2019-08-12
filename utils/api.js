import config from "./config.js"

// //查询接口
// function getMovie(options, callback, show = true) {
//   wxPromise('/movie', options, show).then((res)=>{
//     callback(res);
//   }).catch((error)=>{
//     callback(error);
//   })
// }

// 用Promise包装wx.request
const wxPromise = (options, show = true) => {
  return new Promise(function(resolve, reject) {
    if (show) {
      wx.showLoading({
        title: '载入中...'
      });
    }
    wx.request({
      url: config.api_url + "/v2" + options.url,
      data: options.data,
      method: options.method === undefined ? 'get' : options.method,
      header: options.header === undefined ? {
        'content-type': 'json'
      } : options.header,
      success(res) {
        if (show) {
          wx.hideLoading();
        }
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject({
            statusCode: res.statusCode,
            errorData: res.data,
            errMsg: res.errMsg
          });
        }
      },
      fail(error) {
        if (show) {
          wx.hideLoading();
        }
        reject(error);
      }
    })
  })
}

export { wxPromise as wxRequest };




// 热门电影
// wx.request({
//   url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=热门',
//   data: {},
//   header: {
//     'content-type': "json"
//   },
//   success(res) {
//     console.log(res);
//   }
// })

// // 热门tv
// wx.request({
//   url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=热门',
//   data: {},
//   header: {
//     'content-type': "json"
//   },
//   success(res) {
//     console.log(res);
//   }
// })