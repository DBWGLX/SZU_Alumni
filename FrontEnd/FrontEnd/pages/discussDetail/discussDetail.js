// pages/discussDetail/discussDetail.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showGoodsAction: true,
    value: '',
    user_id:'', //发帖者id
    det_id:'', //帖子id
    toView:"swiper-container",
    total:'',
    article: {
      title: '《原神》5.2版本PV：「灵与火的织卷」',
      authorName: '发布人',
      authorAvatar: '/images/image.png',
      content: "⭐截止到现在5.2版本共有两个签到获取原石途径，一般可获得340原石原石，以及今天新版本更新和角色试用还有640原石，今天开始还可以拿完，家人们上号！微博：搜索“原神”进入原神超话→原神超话签到3天→可得80原石！一定要连续签到！不然会断签！"
    },
       createTabs: true, // 控制是否显示标签页
       tabs: [
         { tabs_name: '正文' ,
         view_id:"swiper-container",
         index:1},
         { tabs_name: '评论',
         view_id: "reputation",
         index:2}
       ],
       active: '1', // 默认激活的标签页
       goodsDetail: {
        pics: [
          { id: 1, pic: 'https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/WechatIMG72.jpg' },
          { id: 2, pic: 'https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/WechatIMG71.jpg' },
          { id: 3, pic: 'https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/WechatIMG73.jpg' },
          { id: 4, pic: 'https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/WechatIMG74.jpg' },
          // 更多图片...
        ],
        // 其他商品详情信息...
      },

  "reputation": {
    "result": [
      {
        "id": "1",
        "u_id": "1001",
          "detailName": "克里丝特",
          "detailPic": "https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/WechatIMG9.jpg",
         "dateReputation": "2024-12-03",
          "detailContent": "话说公子和白术选哪个好，有芙芙但没龙王",
          "goodReputationReply": "公子需要手法，白术只能是奶爸"
       
      },
      {
          "id": "2",
          "u_id": "1002",
            "detailName": "达达鸭",
            "detailPic": "https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/WechatIMG8.jpg",
           "dateReputation": "2024-12-02",
            "detailContent": "唉，给帝君一个小保底，剩下的都要给冬极准备了[笑哭R][笑哭R][笑哭R]",
            "goodReputationReply": ""
      },
      {
          "id": "3",
          "id": "1003",
          "detailName": null,
          "detailPic": "https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/WechatIMG10.jpg",
          "dateReputation": "2024-12-01",
          "detailContent": "不是白术！！！！！！不是刚复刻过吗？这么近混池感觉不太对味[流汗R][流汗R]白术应该不太会进混池（个人感觉）[流汗R]",
          "goodReputationReply": "那應該誰進呢？我也考慮過 "
      }
    ]
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData ({
      det_id: options.id
    })
 this.loadData();
  },

  loadData() {
    this.selectComponent('#tabs').resize();
    const currentDateTime = this.getCurrentDateTime();
    const formattedDateTime = this.formatDateTime(currentDateTime);
    console.log('当前日期和时间:', formattedDateTime);
   
    //获取标题正文
    wx.request({
      url: 'http://localhost:8080/discuss/list/text', // 你的后端接口地址
      method: 'GET', // 或者 'POST'
      data: {
        // 这里是发送给服务器的参数
       id: this.data.det_id,
      time: formattedDateTime
      },
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        // 请求成功后的处理逻辑
        console.error("查询具体帖子成功")
      this.setData({
        "article.title":res.data.title,
        "article.content":res.data.text,
        user_id:res.data.user_id
      })

      },
      fail (error) {
        // 请求失败后的处理逻辑
        console.error("查询具体帖子失败:",error)
      }
    })

    //获取讨论区内容
    wx.request({
      url: 'http://localhost:8080/discuss/list/detail', // 你的后端接口地址
      method: 'GET', // 或者 'POST'
      data: {
        // 这里是发送给服务器的参数
        id: 22,
        disId:this.data.det_id,
         time: formattedDateTime
      },
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
      if (res.statusCode === 200 && res.data) {
        // 请求成功后的处理逻辑
        console.error("查询讨论区成功")
        console.log(res.data)
      this.setData({
        "reputation.result":res.data
      })
      } else {
        // 处理非 200 状态码的情况
        console.error("查询讨论区失败，状态码：" + res.statusCode);
      }
      },
      fail (error) {
        // 请求失败后的处理逻辑
        console.error("查询讨论区失败:",error)
      }
    })

    this.setData({
      total:this.data.reputation.result.length
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.selectComponent('#tabs').resize();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.selectComponent('#tabs').resize();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
  // 点赞
    likeArticle() {
      // 这里可以添加点赞逻辑
    },
    // 分享
    shareArticle() {
      // 这里可以添加分享逻辑
    },
    // 留言
    leaveComment() {
      // 这里可以添加留言逻辑
    },
    onTabsChange(e) {
      console.log(e)
      var index=e.detail.index;
      this.setData({
        toView: this.data.tabs[index].view_id,
      })
      // setTimeout(() => {
      //   this.setData({
      //     tabclicked: false
      //   })
      // }, 1000);
    },
    onClose() {

      this.setData({ show: false,
        showGoodsAction:true });
    },
  
    onSelect(event) {
      console.log(event);
    },
    AddDiscuss() {
      console.log(1)
      this.setData({ show: 1,
        showGoodsAction:false });
    },
    onChange(event) {
      // event.detail 为当前输入的值
      console.log(this.data.value);
    },
    // 发送按钮点击事件处理函数
  onSend() {
    // 获取输入框的值
    const message = this.data.value;
    if (message.trim() === '') {
      // 可以在这里处理空消息的情况，例如提示用户
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }
    // 在这里处理发送逻辑，例如发送到服务器或者更新页面状态
    console.log('发送的消息:', message);
    const currentDateTime = this.getCurrentDateTime(); 
   console.log(currentDateTime)
   const formattedDateTime = this.formatDateTime(currentDateTime);
    console.log('当前日期和时间:', formattedDateTime);
    wx.request({
      url: 'http://localhost:8080/discuss/detail', // 你的后端接口地址
      method: 'POST', // 或者 'POST'
      data: {
        // 这里是发送给服务器的参数
        id: 22,
      time: formattedDateTime,
      "detail":message,
      "disId": this.data.det_id
      },
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        // 请求成功后的处理逻辑
        console.error("评论成功")
        this.loadData();
      },
      fail (error) {
        // 请求失败后的处理逻辑
        console.error("评论失败:",error)
      }
    })
    // 发送后清空输入框
    this.setData({ value: '' });
    // 可以选择关闭动作面板
    this.onClose();
    // 其他逻辑...
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
})