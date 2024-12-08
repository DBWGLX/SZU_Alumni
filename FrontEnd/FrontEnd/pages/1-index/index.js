Page({
  data: {
    newsList: [{
        id: 1,
        url: 'https://mp.weixin.qq.com/s/8C-7kvXRSxIbYmpQf4Iaww',
        title: "招聘机器学习专家",
        content: "1.熟练使用 TensorFlow, PyTorch 等主流框架。2.熟悉 GPU 加速 (CUDA, TensorRT)。",
        date: "2024-11-15",
        views: 54,
        image: "/images/wx_1.jpg",
        author: "黄亮天",
        department: "互联网/IT-电子/腾讯"
      },
      {
        id: 2,
        url: 'https://mp.weixin.qq.com/s/8C-7kvXRSxIbYmpQf4Iaww',
        title: "招聘机器学习专家",
        content: "1.熟练使用 TensorFlow, PyTorch 等主流框架。2.熟悉 GPU 加速 (CUDA, TensorRT)。",
        date: "2024-11-15",
        views: 54,
        image: "/images/wx_1.jpg",
        author: "黄亮天",
        department: "互联网/IT-电子/腾讯"
      },

      {
        id: 3,
        url: 'https://mp.weixin.qq.com/s/8C-7kvXRSxIbYmpQf4Iaww',
        title: "招聘机器学习专家",
        content: "1.熟练使用 TensorFlow, PyTorch 等主流框架。2.熟悉 GPU 加速 (CUDA, TensorRT)。",
        date: "2024-11-15",
        views: 54,
        image: "/images/wx_1.jpg",
        author: "黄亮天",
        department: "互联网/IT-电子/腾讯"
      },

      {
        id: 4,
        url: 'https://mp.weixin.qq.com/s/8C-7kvXRSxIbYmpQf4Iaww',
        title: "招聘机器学习专家",
        content: "1.熟练使用 TensorFlow, PyTorch 等主流框架。2.熟悉 GPU 加速 (CUDA, TensorRT)。",
        date: "2024-11-15",
        views: 54,
        image: "/images/wx_1.jpg",
        author: "黄亮天",
        department: "互联网/IT-电子/腾讯"
      },

      {
        id: 5,
        url: 'https://mp.weixin.qq.com/s/8C-7kvXRSxIbYmpQf4Iaww',
        title: "招聘机器学习专家",
        content: "1.熟练使用 TensorFlow, PyTorch 等主流框架。2.熟悉 GPU 加速 (CUDA, TensorRT)。",
        date: "2024-11-15",
        views: 54,
        image: "/images/wx_1.jpg",
        author: "黄亮天",
        department: "互联网/IT-电子/腾讯"
      }
    ],
    // 推荐新闻数据
    recommendedNews: [
      {
        id: 1,
        url: 'https://mp.weixin.qq.com/s/8C-7kvXRSxIbYmpQf4Iaww',
        title: '推荐新闻1',
        image: '/images/home.png',
      },
      {
        id: 2,
        url: 'https://mp.weixin.qq.com/s/8C-7kvXRSxIbYmpQf4Iaww',
        title: '推荐新闻2',
        image: '/images/message.png',
      },
      {
        id: 3,
        url: 'https://mp.weixin.qq.com/s/8C-7kvXRSxIbYmpQf4Iaww',
        title: '推荐新闻3',
        image: '/images/supply.png',
      }
    ]
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

  // 跳转到新闻页面
  navigateToNews: function () {
    wx.navigateTo({
      url: '/pages/news/news'
    });
  },

  // 跳转到消息页面
  navigateToDiscussion: function () {
    wx.navigateTo({
      url: '/pages/message/message'
    });
  },

  // 跳转到供需页面
  navigateToSupplyDemand: function () {
    wx.navigateTo({
      url: '/pages/supply-demand/supply-demand'
    });
  }
});