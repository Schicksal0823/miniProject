const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

// 用Promise包装wx.request
//let baseUrlPromise = 'https://douban-api-git-master.zce.now.sh';
let baseUrlPromise = 'https://douban-api.uieee.com';
//let baseUrlPromise = 'https://douban.uieee.com';
const wxPromise = obj => {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: baseUrlPromise + obj.url,
      data: obj.data,
      method: obj.method === undefined ? 'get' : obj.method,
      header: obj.header === undefined ? {
        'content-type': 'json'
      } : obj.header,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject({
            statusCode: res.statusCode,
            errorData: res.data
          });
        }
      },
      fail(error) {
        reject(error);
      }
    })

  })
}

module.exports = {
  wxRequest: wxPromise
}