Page({
  data: {
    userStatus: 'not_logged_in', // 初始状态
    userInfo: {
      username: 'Powder', // 默认值
      gender: '男',
      identity: '学生',
      year: '2022',
      major: '软件工程',
      location: '山西'
    }, // 登录后的用户信息

    selectedDate: '', // 保存选中的日期
    selectedRegion: '', // 保存选中的地区
    selectedNativePlace: '',
    selectedPoliticalStatus: '', // 保存选中的政治面貌
    politicalStatus: ['群众','团员','党员','其他'],
  },

  onLoad() {
    // 判断用户是否已登录
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (isLoggedIn) {
      this.setData({
        userStatus: 'logged_in',
        userInfo: wx.getStorageSync('userInfo')
      });
    }
  },

  onShow() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (isLoggedIn) {
      this.setData({
        userStatus: 'logged_in',
        userInfo: wx.getStorageSync('userInfo')
      });
    } else {
      this.setData({
        userStatus: 'not_logged_in'
      });
    }

    //测试页面切换：
    this.setData({
      userStatus: 'logged_in',
    });
  },

  login() {
    wx.showLoading({ title: '登录中...' });
    wx.login({
      success: (res) => {
        if (res.code) {
          // 获取到的code
          const code = res.code;
          
          // 将 code 发送到你的服务器进行登录验证
          wx.request({
            url: '172.30.207.108:5005/login', // 你的服务器地址
            method: 'POST',
            data: {
              code: code
            },
            success: (response) => {
              const { session_key, openid } = response.data;
              console.log('登录成功，session_key:', session_key, 'openid:', openid);
              wx.setStorageSync('isLoggedIn', true); // 表示用户已登录
              wx.hideLoading();
              wx.showToast({ title: '登录成功', icon: 'none' });
              this.setData({
                userStatus: 'registering' // 跳转到注册状态
              });
            },
            fail: (error) => {
              console.error('请求失败', error);
              wx.hideLoading();
              wx.showToast({ title: '微信登录失败', icon: 'none' });
            }
          });
        } else {
          console.log('微信登录失败！' + res.errMsg);
          wx.hideLoading();
          wx.showToast({ title: '登录失败，请重试', icon: 'none' });
        }
      }
    });
  },

  submitRegister() {
    // 模拟提交注册
    wx.showLoading({ title: '提交中...' });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        userStatus: 'logged_in', // 注册完成后跳转到已登录状态
        userInfo: { username: '张三', avatar: '../../images/avatar.jpg' } // 示例用户信息
      });
      wx.setStorageSync('isLoggedIn', true);
      wx.setStorageSync('userInfo', this.data.userInfo);
    }, 1000);
  },

  logout() {
    // 模拟退出登录
    wx.showModal({
      title: '提示',
      content: '确定退出登录？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            userStatus: 'not_logged_in',
            userInfo: {}
          });
          wx.removeStorageSync('isLoggedIn');
          wx.removeStorageSync('userInfo');
        }
      }
    });
  },

  //选择器选择后，回显到页面并存到data中
  onDateChange(e) {
    const selectedDate = e.detail.value;
    this.setData({
      selectedDate,
    });
  },

  onRegionChange(e) {
    const region = e.detail.value;
    this.setData({
      selectedRegion: region.join(' '), // 将地区数组转为字符串
    });
  },

  onNativePlaceChange(e) {
    const NativePlace = e.detail.value;
    this.setData({
      selectedNativePlace: NativePlace.join(' '), // 将地区数组转为字符串
    });
  },

  onPoliticalChange(e) {
    const index = e.detail.value; // 获取选择的索引
    const selectedPoliticalStatus = this.data.politicalStatus[index];
    this.setData({
      selectedPoliticalStatus,
    });
  },

  // 提交表单数据
  submitData() {
    const { selectedDate, selectedRegion, selectedPoliticalStatus } = this.data;

    if (!selectedDate || !selectedRegion || !selectedPoliticalStatus) {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none',
      });
      return;
    }

    // 构造要发送的 JSON 数据
    const requestData = {
      date: selectedDate,
      region: selectedRegion,
      politicalStatus: selectedPoliticalStatus,
    };

    // 提交到后端
    wx.request({
      url: 'https://your-backend-endpoint', // 替换为你的后端地址
      method: 'POST',
      data: requestData,
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
        });
      },
      fail(err) {
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none',
        });
      },
    });
  },

});
