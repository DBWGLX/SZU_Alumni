Page({
  data: {
    newsList: [], // 当前显示的新闻列表
    offset: 0,      // 当前偏移
    loadingMore: false, // 是否正在加载更多
    hasReachedBottom: false, // 是否滑动到底部（手动检测用）
    showBackToTop: false, // 控制“返回顶部”按钮是否显示

    // 推荐新闻数据
    recommendedNews: [
      {
        id: 1,
        url: 'https://news.szu.edu.cn/info/1003/12987.htm',
        title: "深圳大学建筑设计研究院举行建院40周年庆典，即...",
        image: 'https://gitee.com/liao-yuhao123/Image/raw/master/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241207141304.jpg',
      },
      {
        id: 2,
        url: 'https://news.szu.edu.cn/info/1059/12991.htm',
        title: "深圳大学2024年校运会启幕 “荔枝快跑”见证荔园人十载青春",
        image: 'https://gitee.com/liao-yuhao123/Image/raw/master/%E5%9B%BE%E7%89%87/0EB4C77479FE88984A6EB106ED9_E4CDC526_28C06F.jpg',
      },
      {
        id: 3,
        url: 'https://news.szu.edu.cn/info/1003/12439.htm',
        title: "《城市形象新媒体传播报告（2024）》在深圳发布",
        image: 'https://gitee.com/liao-yuhao123/Image/raw/master/%E5%9B%BE%E7%89%87/3892A24D4F7C484F5106DA335A5_D4C15146_28D28.jpg',
      }
    ]
  },

  onLoad() {
    this.loadNews();
  },

  // 监听滚动事件
  onScroll(e) {
    const scrollTop = e.detail.scrollTop;
    const scrollHeight = e.detail.scrollHeight;
    const query = wx.createSelectorQuery();
    query.select('.news-list').boundingClientRect((res) => {
      if (res) {
        const clientHeight = res.height;
        console.log('当前滚动状态:', {
          scrollTop,
          scrollHeight,
          clientHeight,
        });

        // 检测是否到底部
        if (scrollTop + clientHeight >= scrollHeight - 50) {
          console.log('接近底部，尝试加载更多新闻...');
          this.setData({ hasReachedBottom: true });
        } else {
          this.setData({ hasReachedBottom: false });
        }
      }
    }).exec();
    // 显示或隐藏返回顶部按钮
  this.setData({
    showBackToTop: scrollTop > 500 // 当滚动距离超过500px时显示
  });
  },

  backToNewsTop() {
    this.setData({
      newsScrollTop: 0 // 设置滚动位置为顶部
    });
  },
  
    // 用户手动滑动检测
    loadMoreNews() {
      console.log('用户尝试加载更多新闻...');
      if (this.data.hasReachedBottom) {
        console.log('已经到底部，加载更多新闻');
        this.setData({ hasReachedBottom: false }); // 重置触底状态
        this.loadNews(); // 加载新新闻
      } else {
        console.log('未检测到滑动到底部');
      }
    },

  // 加载新闻数据
  loadNews() {
    if (this.data.loadingMore) return; // 防止重复请求
    this.setData({ loadingMore: true });
    wx.request({
      url: 'http://172.24.42.58:1145/get_latest_news',
      method: 'POST',
      data: {
        count: 10, // 请求新闻的数量
        offset: this.data.offset, // 传递当前偏移给后端
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const newNews = res.data; // 假设返回的数据就是新闻列表
          console.log(res);
          // 合并新加载的新闻
          this.setData({
            newsList: [...this.data.newsList, ...newNews],
            offset: this.data.offset + 10, // 更新偏移量
            loadingMore: false, // 停止加载状态
          });
        } else {
          console.error('请求失败:', res.statusCode);
          this.setData({ loadingMore: false });
        }
      },
      fail: (error) => {
        console.error('请求错误:', error);
        this.setData({ loadingMore: false });
      },
    });
  },
  
  goToDetail(e) {
    const url = e.currentTarget.dataset.url; // 获取绑定的 URL
    if (url) {
      wx.navigateTo({
        url: `/pages/webview/webview?url=${encodeURIComponent(url)}`
      });
    } else {
      wx.showToast({
        title: '链接无效',
        icon: 'error'
      });
    }
  },
});
