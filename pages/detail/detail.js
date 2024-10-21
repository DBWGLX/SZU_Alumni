Page({
  data: {
    alumni: {}
  },
  onLoad(options) {
    const id = options.id;
    const alumniList = [
      { id: 1, name: "张三", class: "2020届", graduationYear: "2020" },
      { id: 2, name: "李四", class: "2019届", graduationYear: "2019" }
    ];
    const alumni = alumniList.find(item => item.id == id);
    this.setData({ alumni });
  }
});
