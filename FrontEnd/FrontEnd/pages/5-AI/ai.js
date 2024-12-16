Page({
  data: {
    webviewUrl: '' // 将通过 options 动态设置
  },
  onLoad(options) {
    // 从 options 中获取传递的 URL 参数
    this.setData({
      webviewUrl: decodeURIComponent(options.url)
    });
  }
});
