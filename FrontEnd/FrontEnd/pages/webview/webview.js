Page({
  data: {
    url: ''
  },

  onLoad(options) {
    // 获取传递的 URL
    if (options.url) {
      const decodedUrl = decodeURIComponent(options.url); // 解码传递的 URL
      this.setData({
        url: decodedUrl
      });
    } else {
      wx.showToast({
        title: 'URL 无效',
        icon: 'error'
      });
    }
  }
});
