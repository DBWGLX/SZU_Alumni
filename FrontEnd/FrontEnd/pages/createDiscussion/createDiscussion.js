Page({
  data: {
    title: 'xxx',
    content: 'xxx',
    fileList: []
  },
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },
  onContentInput(e) {
    this.setData({
      content: e.detail.value
    });
  },
  afterRead(event) {
    const { file } = event.detail;
    // 将图片文件添加到fileList数组中
    this.setData({
      fileList: [...this.data.fileList, file]
    });
  },
  deleteImage(event) {
    const { index } = event.detail;
    const { fileList } = this.data;
    fileList.splice(index, 1);
    this.setData({
      fileList
    });
  },
  cancelPost() {
    // 取消发表，可以清空输入内容和图片
    this.setData({
      title: '',
      content: '',
      fileList: []
    });
    // 返回上一页
    wx.navigateBack();
  },
  submitPost() {
    // 发表逻辑，可以在这里调用后端接口上传数据
    console.log('发表成功', this.data);
    // 发表成功后，清空输入内容和图片
    this.setData({
      title: '',
      content: '',
      fileList: []
    });
    // 返回上一页
    wx.navigateBack();
  }
});
