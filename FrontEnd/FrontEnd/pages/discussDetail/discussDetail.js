// pages/discussDetail/discussDetail.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:"swiper-container",
 article: {
      title: '这里是标题',
      authorName: '发布人',
      authorAvatar: '/images/image.png',
      content: '这里是正文内容'
    },
   comments: [
         {
           author: '用户A',
           avatar: '/images/image.png',
           content: '第一条留言内容'
         },
         {
           author: '用户B',
           avatar: '/images/image.png',
           content: '第二条留言内容'
         },
         // ...更多留言
       ],
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
          { id: 1, pic: 'https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/25bd5d0e4b850598e0ce5391dfd5c78f.jpeg' },
          { id: 2, pic: 'https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/5aaac45ba8b2fbd8c3eca0fb309b4052.jpeg' },
          { id: 3, pic: 'https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/5e04a73768304c85e525baeed139e3d6.jpeg' },
          // 更多图片...
        ],
        // 其他商品详情信息...
      },

  "reputation": {
    "result": [
      {
        "id": "1",
        "user": {
          "id": "1001",
          "nick": "爱科技的猫",
          "avatarUrl": "https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/25bd5d0e4b850598e0ce5391dfd5c78f.jpeg"
        },
        "goods": {
          "dateReputation": "2024-12-03",
          "goodReputation": 5,
          "goodReputationRemark": "商品质量非常好，物流也很快，非常满意！",
          "goodReputationReply": "感谢您的支持，我们会继续努力提供更好的服务！"
        },
        "reputationPics": [
          {
            "pic": "https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/25bd5d0e4b850598e0ce5391dfd5c78f.jpeg"
          },
          {
            "pic": "https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/25bd5d0e4b850598e0ce5391dfd5c78f.jpeg"
          }
        ]
      },
      {
        "id": "2",
        "user": {
          "id": "1002",
          "nick": "数码爱好者",
          "avatarUrl": "https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/25bd5d0e4b850598e0ce5391dfd5c78f.jpeg"
        },
        "goods": {
          "dateReputation": "2024-12-02",
          "goodReputation": 4,
          "goodReputationRemark": "产品不错，性价比高，值得购买。",
          "goodReputationReply": ""
        },
        "reputationPics": []
      },
      {
        "id": "3",
        "user": {
          "id": "1003",
          "nick": null,
          "avatarUrl": null
        },
        "goods": {
          "dateReputation": "2024-12-01",
          "goodReputation": 3,
          "goodReputationRemark": "一般般，没有想象中的那么好。",
          "goodReputationReply": "非常抱歉未能达到您的期望，我们会努力改进。"
        },
        "reputationPics": [
          {
            "pic": "https://web-tails-qianmeng.oss-cn-shenzhen.aliyuncs.com/25bd5d0e4b850598e0ce5391dfd5c78f.jpeg"
          }
        ]
      }
    ]
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.selectComponent('#tabs').resize();

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
})