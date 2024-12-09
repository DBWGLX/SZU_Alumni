const IndustryData = {
  value: '1',
  label: '行业',
  children: [{
    value: '0',
    label: '计算机'
  }, {
    value: '1',
    label: '电子信息工程'
  }, {
    value: '2',
    label: '金融科技'
  }, {
    value: '3',
    label: '实习'
  }]
}

const MajorData = {
  value: '2',
  label: '专业',
  children: [{
    value: '0',
    label: '不限'
  }, {
    value: '1',
    label: '全职'
  }, {
    value: '2',
    label: '兼职'
  }, {
    value: '3',
    label: '实习'
  }]
}



const sortData = {
  value: '3',
  label: '排序',
  children: [{
    value: '0',
    label: '综合排序'
  }, {
    value: '1',
    label: '发布时间'
  }, {
    value: '2',
    label: '距离优先'
  }]
}



const multiData = {
  label: '筛选',
  children: [{
      value: '4',
      label: '学历',
      children: [{
          value: '0',
          label: '不限'
        }, {
          value: '1',
          label: '本科'
        }, {
          value: '2',
          label: '硕士'
        },
        {
          value: '3',
          label: '博士'
        }
      ]
    },
    {
      value: '5',
      label: '工作经验',
      children: [{
          value: '0',
          label: '不限'
        }, {
          value: '1',
          label: '应届'
        }, {
          value: '2',
          label: '1年以下'
        },
        {
          value: '3',
          label: '1-3年'
        }, {
          value: '4',
          label: '3-5年'
        }, {
          value: '5',
          label: '5-10年'
        }, {
          value: '6',
          label: '10年以上'
        }
      ]
    }
  ]
}

module.exports = {
  MajorData: MajorData,
  sortData: sortData,
  multiData: multiData,
  IndustryData: IndustryData,
}