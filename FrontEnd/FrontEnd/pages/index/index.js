Page({
    data: {
      newsList: [
        { 
          id: 1, 
          title: "校友聚会活动通知", 
          content: "我们将举行一场校友聚会，期待各位校友的参与！", // 新增内容
          date: "2024-11-01", 
          views: 120, // 新增阅读量
          image: "../../image/news_image1.jpg" // 新增图片路径
        },
        { 
          id: 2, 
          title: "最新校友新闻", 
          content: "校友会最近举办了一次成功的募捐活动，感谢大家的支持！", // 新增内容
          date: "2024-10-28", 
          views: 85, // 新增阅读量
          image: "../../image/news_image2.jpg" // 新增图片路径
        },
        { 
          id: 3, 
          title: "校友募捐活动成功", 
          content: "我们成功筹集到足够的资金，用于支持在校学生。", // 新增内容
          date: "2024-10-25", 
          views: 45, // 新增阅读量
          image: "../../image/news_image3.jpg" // 新增图片路径
        }
      ]
    },
    goToDetail(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    },
      // 跳转到新闻页面
      navigateToNews: function() {
        wx.navigateTo({
          url: '/pages/news/news'
        });
      },
    
      // 跳转到消息页面
      navigateToDiscussion: function() {
        wx.navigateTo({
          url: '/pages/message/message'
        });
      },
    
      // 跳转到供需页面
      navigateToSupplyDemand: function() {
        wx.navigateTo({
          url: '/pages/supply-demand/supply-demand'
        });
      }
  });