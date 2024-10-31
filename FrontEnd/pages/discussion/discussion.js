Page({
  data: {
    posts: [
      { id: 1, content: "大家好，我是张三！" },
      { id: 2, content: "有没有人记得我们的班主任？" }
    ],
    newPost: ''
  },
  onInput(e) {
    this.setData({ newPost: e.detail.value });
  },
  submitPost() {
    if (this.data.newPost.trim()) {
      const newPostId = this.data.posts.length + 1;
      const newPost = { id: newPostId, content: this.data.newPost };
      this.setData({
        posts: [...this.data.posts, newPost],
        newPost: '' // 清空输入框
      });
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
    }
  }
});
