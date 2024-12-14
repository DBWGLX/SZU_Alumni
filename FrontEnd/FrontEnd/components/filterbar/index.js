const positionData = require('position.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: ''
    },
    top: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 显示控制
    Stage: false,
    Major: false,
    sort: false,
    multi: false,
    Industry: false,
    // 筛选栏数据
    MajorData: {},
    sortData: {},
    multiData: {},
    IndustryData: {},
    IndustrySelected: '0',
    MajorSelected: '0',
    sortSelected: '0',
    multiSelected: [],
    // 返回筛选下来的参数对象数组
    selectedArray: []
  },

  /**
   * 组件生命周期
   */
  attached() {
    if (this.properties.mode === 'position') {
      this.setData({
        MajorData: positionData.MajorData,
        sortData: positionData.sortData,
        multiData: positionData.multiData,
        IndustryData: positionData.IndustryData,
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 单选激活
    onMajorActive: function(e) {
      this.setData({
        Stage: false,
        Major: !this.data.Major,
        sort: false,
        multi: false,
        Industry: false,
      })
    },
    // Industry激活
    onIndustryActive: function(e) {
      this.setData({
        Major: false,
        sort: false,
        multi: false,
        Industry: !this.data.Industry,
      })
    },
    // 排序激活
    onSortActive: function(e) {
      this.setData({
        Major: false,
        sort: !this.data.sort,
        multi: false,
        Industry: false,
      })
    },
    // 筛选激活
    onMultiActive: function(e) {
      this.setData({
        Major: false,
        sort: false,
        multi: !this.data.multi,
        Industry: false,
      })
    },
    // 向数组添加唯一参数（小程序没有集合set对象）
    addUnique2Array: function(array, args) {
      const _args = args.target ? args.target.dataset : args
      const value = _args.group.value + ':' + _args.item.value
      const label = _args.group.label + ':' + _args.item.label
      let flag = false
      for (let i = 0; i < array.length; i++) {
        const group = value.split(':')[0]
        const arrayGroup = array[i].value.split(':')[0]
        // 找到该组
        if (arrayGroup === group) {
          array[i].value = value
          array[i].label = label
          flag = true
        }
      }
      if (!flag) {
        array.push({
          value: value,
          label: label
        })
      }
    },
    // 单选
    onMajor: function(e) {
      this.closeFilter()
      this.setData({
        MajorSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },
    // 行业
    onIndustry: function(e) {
      this.closeFilter()
      this.setData({
        IndustrySelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },
    // 排序
    onSort: function(e) {
      this.closeFilter()
      this.setData({
        sortSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },
    // 多项筛选
    onMultiChange: function(e) {
      this.addUnique2Array(this.data.multiSelected, {
        group: {
          value: e.target.dataset.group.value,
          label: e.target.dataset.group.label
        },
        item: {
          value: e.target.dataset.item.value,
          label: e.target.dataset.item.label
        }
      })
      this.setData({
        multiSelected: this.data.multiSelected
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('multiChange', {
        selectedArray: this.data.selectedArray
      })
    },
    // 重置多项筛选
    onMultiReset: function() {
      this.setData({
        multiSelected: [],    // 清空多项选择的数组
        selectedArray: []     // 清空选中的数组
      })
      this.triggerEvent('multiChange', {
        selectedArray: []     // 通知外部更新为空的选中数组
      })
    },
    onMultiConfirm: function() {
      this.closeFilter()
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },
    // 关闭筛选
    closeFilter: function() {
      this.setData({
        Major: false,
        sort: false,
        multi: false,
        Industry: false,
      })
    },
  }
})