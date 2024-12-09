Page({
  data: {},

  // 返回首页按钮
  goBack() {
    wx.switchTab({
        url: '/pages/1-index/index' // 跳转到首页
    });
  }
});
