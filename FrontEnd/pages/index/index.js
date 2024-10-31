Page({
  data: {
    originalList: [
      { id: 1, name: "张三", class: "2020届" },
      { id: 2, name: "李四", class: "2019届" },
      { id: 3, name: "马化腾", class: "1989届"}
    ],
    alumniList: [],
    searchQuery: ''
  },
  onLoad() {
    this.setData({ alumniList: this.data.originalList }); // 初始化时显示所有校友
  },
  onSearch(e) {
    const query = e.detail.value;
    this.setData({ searchQuery: query });
    const filteredList = this.data.originalList.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) // 过滤校友列表
    );
    this.setData({ alumniList: filteredList }); // 更新视图
    console.log(filteredList);
    },
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
});
