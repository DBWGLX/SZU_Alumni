Page({
  data: {
    title: '',
    content: '',
    fileList: []
  },
  onTitleInput(e) {
    console.log(e)
    this.setData({
      title: e.detail || ''
    });
    console.log(this.data.title)
  },
  onContentInput(e) {
    console.log(e)
    this.setData({
      content: e.detail || ''
    });
    console.log(this.data.title)
  },
  afterRead(event) {
    console.log(event)
    const { file } = event.detail;
    console.log(file)
    // 将图片文件添加到fileList数组中
    this.setData({
      fileList: [...this.data.fileList, file]
    });
    console.log(this.data.fileList)
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
    console.log("准备上传")
    console.log(this.data.fileList)
    // 发表逻辑，可以在这里调用后端接口上传数据
  if (!this.data.fileList.length) {
    wx.showToast({ title: '图片不能为空', icon: 'none' });
    return;
  }
  console.log("准备上传")
    wx.request({
      url: 'http://localhost:8080/discuss/list', // 你的后端接口地址
      method: 'POST', // 或者 'POST'
      data: {
        // 这里是发送给服务器的参数
        "id": "22",	
        "time": "2023-10-10T10:10:09",
        "detailTop":this.data.title,
        "detailAll": this.data.content,
        "dePic":this.data.fileList
      },
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        // 成功后的处理逻辑
console.log(this.data.fileList)
        console.log('发表成功', this.data);
        // 发表成功后，清空输入内容和图片
    this.setData({
      title: '',
      content: '',
      fileList: []
    });  
    // 返回上一页
    wx.navigateBack();
      },
      fail (error) {
        // 请求失败后的处理逻辑
        console.error("查询动态失败:",error)
      }
    })
  }
});
