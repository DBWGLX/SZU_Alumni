Page({
  data: {
    originalList: [
      { id: 1, name: "张三", class: "2020届", graduationYear: "2020" },
      { id: 2, name: "李四", class: "2019届", graduationYear: "2019" },
      { id: 3, name: "樊顺琪", class: "2022届", graduationYear: "2022" }
    ],
    alumniList: [],
    searchQuery: ''
  },
  onLoad() {
    this.setData({ alumniList: this.data.originalList }); // 初始化时显示所有校友
  },
  onSearch(e) {
    const query = e.detail.value;
    const filteredList = this.data.originalList.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    this.setData({ alumniList: filteredList });
  },
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
});
