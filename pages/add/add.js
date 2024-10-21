Page({
  data: {
    name: '',
    class: '',
    graduationYear: ''
  },
  onNameInput(e) {
    this.setData({ name: e.detail.value });
  },
  onClassInput(e) {
    this.setData({ class: e.detail.value });
  },
  onYearInput(e) {
    this.setData({ graduationYear: e.detail.value });
  },
  addAlumni() {
    const newAlumni = {
      name: this.data.name,
      class: this.data.class,
      graduationYear: this.data.graduationYear
    };
    // 这里可以调用后端接口保存数据
    console.log(newAlumni);
    wx.navigateBack();
  }
});
