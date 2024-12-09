Page({
  data: {
    newsList: [{
        id: 1,
        url: 'https://news.szu.edu.cn/info/1003/12444.htm',
        title: "CUBAL广东赛区基层赛决赛打响 深大男篮主场惜败上届全国总冠军广工男篮",
        date: "2024-11-30",
        views: 62,
        image: "https://gitee.com/liao-yuhao123/Image/raw/master/%E5%9B%BE%E7%89%87/407A0646420FBCF48ABD3495324_FC4A0234_F9EB2.png",
        author: "深圳大学",
        department: "党委宣传部"
      },
      {
        id: 2,
        url: 'https://news.szu.edu.cn/info/1003/12443.htm',
        title: "国家重大科研仪器“深部岩石原位保真取芯与保真测试分析系统”科技成果发布会在深圳举行",
        date: "2024-12-01",
        views: 71,
        image: "https://gitee.com/liao-yuhao123/Image/raw/master/%E5%9B%BE%E7%89%87/0C32ED66AACD6338F02AB7E303D_E67E5183_4C193.jpeg",
        author: "深圳大学",
        department: "中国发展网"
      },

      {
        id: 3,
        url: 'https://mp.weixin.qq.com/s/SeaYNbb9SYM0NIE2wTb7RA',
        title: "冷空气来袭！我们的深大加入会下雪...",
        date: "2024-11-28",
        views: 8416,
        image: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/TqDMlFr5tLQiaJL5lKFqJvYArTtGfB3NHAcFv9NalNT7VpDCRFWuRRIjQ3Vrq5x2xzgcHiaEVksscpL3ichN8tF9w/640?wx_fmt=jpeg&from=appmsg&wxfrom=13",
        author: "深大荔知",
        department: ""
      },

      {
        id: 4,
        url: 'https://mp.weixin.qq.com/s/cvH19eR5ebAm_CJcmd0ARQ',
        title: "聊一聊：2024年还剩最后一个月，你的目标完成了多少啦？",
        date: "2024-11-27",
        views: 2075,
        image: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/TqDMlFr5tLQiaJL5lKFqJvYArTtGfB3NHkfkickdQ0iaL2JMTkvUA1lhDDobv4nmO0byO6p2hOJGiaLUgV8P3iaLkuw/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",
        author: "深大荔知",
        department: ""
      },

      {
        id: 5,
        url: 'https://mp.weixin.qq.com/s/uwzaH68kNR2WdR2po59SJw',
        title: "期末考试！深大2学分校外MOOC线下期末考试安排出炉",
        date: "2024-11-27",
        views: 2075,
        image: "https://mmbiz.qpic.cn/sz_mmbiz_png/TqDMlFr5tLQI9Ksw5lhf32NK1GCRVb1ic4o0lVksM5vPD8fmG9S0jbkzatiaNicfJ73ViajEKv9f3C7GY8YqK7SESA/640?wx_fmt=png&from=appmsg&wxfrom=13",
        author: "深大荔知",
        department: ""
      }
    ],
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
        description: "深大的寒假长度排名出炉，引发网友热议。",
        image: 'https://gitee.com/liao-yuhao123/Image/raw/master/%E5%9B%BE%E7%89%87/3892A24D4F7C484F5106DA335A5_D4C15146_28D28.jpg',
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