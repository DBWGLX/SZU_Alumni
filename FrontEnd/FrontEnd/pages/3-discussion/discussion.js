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
    searchKeyword: '', // 搜索关键词
    serchDiscussions: [],  //搜索到的帖子列表
  },

  // 搜索框输入事件
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail
    });
    console.log(this.data.searchKeyword)
  },

  // 搜索框搜索事件处理函数
  onSearch() {
    // 获取data中的searchValue
    const searchValue = this.data.searchKeyword;
    // 这里可以添加搜索逻辑，例如调用API进行搜索
    console.log('执行搜索，关键词：', searchValue);
    // 示例：调用搜索API
    this.searchApi(searchValue);
  },

  searchApi(keyword) {
    // 这里编写调用搜索API的逻辑
    var that = this; // 保存当前页面的this到that变量

    // 假设有一个/search的API接口
    wx.request({
      url: 'http://localhost:8080/discuss/api/search',
      method: 'GET',
      data: {
        keyword: keyword
      },
      success: function(res) {
        // 处理API返回的数据
        console.log('搜索结果：', res.data);
        that.setData({
          discussions:res.data.data
        })
        console.log(that.data.discussions);
      },
      fail: function(err) {
        // 处理错误情况
        console.error('搜索失败：', err);
      }
    });
  },

  // 创建讨论按钮点击事件
onCreateDiscuss: function() {
 wx.navigateTo({
      url: '/pages/createDiscussion/createDiscussion'
    });
  },
  
 // 长按删除讨论事件处理函数
 onDeleteDiscuss: function(event) {
  // 获取被长按的讨论项的 id
  const disId = event.currentTarget.dataset.id;
  console.log(disId);
  const currentDateTime = this.getCurrentDateTime(); 
  console.log(currentDateTime);
  const formattedDateTime = this.formatDateTime(currentDateTime);
   console.log('当前日期和时间:', formattedDateTime);
  // 这里可以弹出一个确认对话框，让用户确认是否删除
  wx.showModal({
    title: '提示',
    content: '确定要删除这条讨论吗？',
    success: function(res) {
      if (res.confirm) {
        // 用户点击了确定，执行删除操作
        // 这里你需要根据你的后端API来实现删除逻辑
        wx.request({
          url: 'http://localhost:8080/discuss/list',
          method: 'DELETE',
          data: { disId: disId,
          time:formattedDateTime,
          id:22
         },
          success: function(response) {
            // 删除成功后的逻辑，比如更新页面数据
            wx.startPullDownRefresh();
          }
        });
      } else if (res.cancel) {
        // 用户点击了取消，不做任何操作
      }
    }
  });
},
onPullDownRefresh() {

   // 设置一个3秒的定时器，无论数据是否加载成功，都会停止下拉刷新
   this.loadDataTimeout = setTimeout(() => {
    wx.stopPullDownRefresh();
  }, 3000);

  // 这里重新加载页面数据
  this.loadData();
    // 数据加载完毕后，停止下拉刷新
  // wx.stopPullDownRefresh();
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
 this.loadData();
  
},
onshow() {
  this.loadData();
},
loadData() {
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
},
// 获取当前日期和时间
getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份是从0开始的，所以要加1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 格式化月份和日期，确保它们是两位数
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  // 构建完整的日期时间字符串
  const dateTimeString = `${year}-${formattedMonth}-${formattedDay}${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return dateTimeString;
},
 // 定义转换函数
 formatDateTime: function(dateTimeStr) {
  // 在日期和时间之间插入 "T"
  return dateTimeStr.slice(0, 10) + "T" + dateTimeStr.slice(10);
}
});
