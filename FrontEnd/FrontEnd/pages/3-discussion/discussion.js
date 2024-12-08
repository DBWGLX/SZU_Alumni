// discuss.js
Page({
  data: {
    scrollTop: 110,
    offsetTop: 110,
    discussions: [
         // 示例数据，实际数据应从服务器获取
         {
          "disId": "帖子id", 
          "disName": "发帖人姓名",
          "disPic": "发帖人头像(也是base64编码（String）)",
          "disContent": 
           { "title":"无意者烈火焚身；以正义的烈火拔出黑暗。",
            "image":"/images/image.png",
            "Date":"2024-11-11"
            }
         },
         {
          "disId": "帖子id", 
          "disName": "发帖人姓名",
          "disPic": "发帖人头像(也是base64编码（String）)",
          "disContent": 
           { "title":"无意者烈火焚身；以正义的烈火拔出黑暗。",
            "image":"/images/image.png",
            "Date":"2024-11-11"
            }
         },
         {
          "disId": "帖子id", 
          "disName": "发帖人姓名",
          "disPic": "发帖人头像(也是base64编码（String）)",
          "disContent": 
           { "title":"无意者烈火焚身；以正义的烈火拔出黑暗。",
            "image":"/images/image.png",
            "Date":"2024-11-11"
            }
         },
         {
          "disId": "帖子id", 
          "disName": "发帖人姓名",
          "disPic": "发帖人头像(也是base64编码（String）)",
          "disContent": 
           { "title":"无意者烈火焚身；以正义的烈火拔出黑暗。",
            "image":"/images/image.png",
            "Date":"2024-11-11"
            }
         },
         ],
    searchKeyword: '' // 搜索关键词
  },

  // 搜索框输入事件
  onSearchInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 创建讨论按钮点击事件
onCreateDiscuss: function() {
 wx.navigateTo({
      url: '/pages/createDiscussion/createDiscussion'
    });
  },
  
  onDiscussionTap: function() {
},
onScroll(event) {
  wx.createSelectorQuery()
    .select('#scroller')
    .boundingClientRect((res) => {
      this.setData({
        scrollTop: event.detail.scrollTop,
        offsetTop: res.top,
      });
    })
    .exec();
},
});
