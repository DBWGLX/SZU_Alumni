// pages/discussDetail/discussDetail.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
       ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
    }
})