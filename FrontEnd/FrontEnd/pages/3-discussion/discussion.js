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
onLoad() {
  wx.request({
    url: 'http://localhost:8080/discuss/list', // 你的后端接口地址
    method: 'GET', // 或者 'POST'
    data: {
      // 这里是发送给服务器的参数
     id: "2",
    time: "2023-10-10T10:10:13",
    begin: 0, 
    number: 10
    },
    
    header: {
      'content-type': 'application/json' // 默认值
    },
    success:(res)=> {
      // 请求成功后的处理逻辑
      console.log(res.data)
    this.setData({
      discussions:res.data
    })
    },
    fail (error) {
      // 请求失败后的处理逻辑
      console.error("查询动态失败:",error)
    }
  })
  
}
});
