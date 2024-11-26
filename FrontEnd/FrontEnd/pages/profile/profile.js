
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

    //基本信息
    name: '未填写',
    gender: '男',
    identity: '',
    selectedDate: '', // 保存选中的生日
    selectedRegion: '', // 保存选中的地区
    selectedNativePlace: '',
    politicalStatus: ['群众','团员','党员','其他'],
    selectedPoliticalStatus: '', // 保存选中的政治面貌
    displayContactInformation: true,
    phone: '',
    email: '',
    wechat: '',
    qq: '',
    //身份认证
    studentID: '',
    campusOptions: ['粤海沧海校区', '丽湖校区', '罗湖校区'],
    selectedCampus: '',
    majorOptions: ['计算机科学与技术', '软件工程', '电子信息工程'],
    selectedMajor: '',
    classOptions: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '特色班'],
    selectedClass: '',
    selectedEnrollmentYear: '',
    selectedGraduationYear: '',
    degreeOptions: ['本科', '硕士', '博士'],
    selectedDegree: '',
    //事业
    industryOptions: ['互联网', '金融', '教育', '制造业', '医疗'],
    selectedIndustry: '',
    workUnit: '',
    position: '',
    industryDescription: '',
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
      userStatus: 'registering',
      //userStatus: 'not_logged_in',
      //userStatus: 'logged_in',
      //userStatus: 'test',
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

  //选择器选择后，回显到页面并存到data中
  onNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },
  onGenderChange(e) {
    this.setData({
      gender: e.detail.value
    });
  },
  onIdentityChange(e) {
    this.setData({
      identity: e.detail.value
    });
  },
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
  onCheckboxChange(e) {
    // 处理复选框变化
    this.setData({
      checkboxValue: e.detail.value.length > 0? 1 : 0,
    });
  },
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  onEmailInput(e) {
    this.setData({
      email: e.detail.value
    });
  },
  onWechatInput(e) {
    this.setData({
      wechat: e.detail.value
    });
  },
  onQQInput(e) {
    this.setData({
      qq: e.detail.value
    });
  },
  onStudentIDInput(e){
    this.setData({
      studentID: e.datail.value
    });
  },
  onCampusChange(e) {
    this.setData({
      selectedCampus: this.data.campusOptions[e.detail.value]
    });
  },
  onMajorChange(e) {
    this.setData({
      selectedMajor: this.data.majorOptions[e.detail.value]
    });
  },
  onClassChange(e) {
    this.setData({
      selectedClass: this.data.classOptions[e.detail.value]
    });
  },
  onEnrollmentYearChange(e) {
    const enrollmentYear = e.detail.value;
    const graduationYear = new Date(enrollmentYear);
    graduationYear.setFullYear(graduationYear.getFullYear() + 4);
    this.setData({
      selectedEnrollmentYear: enrollmentYear,
      selectedGraduationYear: graduationYear.getFullYear(),
    });
  },
  onGraduationYearChange(e) {
    const graduationYear = e.detail.value;
    this.setData({
      selectedGraduationYear: graduationYear
    });
  },
  onDegreeChange(e) {
    this.setData({
      selectedDegree: this.data.degreeOptions[e.detail.value]
    });
  },
  onIndustryChange(e) {
    this.setData({
        selectedIndustry: this.data.industryOptions[e.detail.value]
    });
  },
  onWorkUnitInput(e) {
    this.setData({
      workUnit: e.detail.value
    });
  },
  onPositionInput(e) {
    this.setData({
      position: e.detail.value
    });
  },
  onIndustryDescriptionInput(e) {
    this.setData({
      industryDescription: e.detail.value
    });
  },


  uploadImage() {
    wx.chooseImage({
      count: 1, // 最多选择一张图片
      sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
      sourceType: ['album', 'camera'], // 可以从相册或相机选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://your-backend-url/upload', // 后端上传图片的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
          success: (resUpload) => {
            const response = JSON.parse(resUpload.data);
            if (response.success) {
              wx.showToast({ title: '图片上传成功', icon: 'success' });
            } else {
              wx.showToast({ title: '图片上传失败', icon: 'none' });
            }
          },
          fail: (err) => {
            wx.showToast({ title: '图片上传失败', icon: 'none' });
          },
        });
      },
      fail: (err) => {
        wx.showToast({ title: '选择图片失败', icon: 'none' });
      },
    });
  },

  submitRegister() {
    // 模拟提交注册
    wx.showLoading({ title: '提交中...' });
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        userStatus: 'logged_in', // 注册完成后跳转到已登录状态
        userInfo: { username: 'Powder', avatar: '../../images/avatar.jpg' } // 示例用户信息
      });
      wx.setStorageSync('isLoggedIn', true);
      wx.setStorageSync('userInfo', this.data.userInfo);


       // 提交到后端
      wx.request({
        url: 'https://your-backend-endpoint',
        method: 'POST',
        data: requestData,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          wx.hideLoading();
          this.setData({
            userStatus: 'logged_in',
            userInfo: { username: 'Powder', avatar: '../../images/avatar.jpg' }
          });
          wx.setStorageSync('isLoggedIn', true);
          wx.setStorageSync('userInfo', this.data.userInfo);
        },
        fail(err) {
          wx.hideLoading();
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none'
          });
        }
      });
    }, 1000);
  },

  // #####################################

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

  //背景动画
  onReady() {
    const query = wx.createSelectorQuery();
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        const { pixelRatio } = wx.getWindowInfo();
        canvas.width = res[0].width * pixelRatio;
        canvas.height = res[0].height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);

        const width = canvas.width / pixelRatio;
        const height = canvas.height / pixelRatio;

        // 初始化圆点
        const dots = [];
        const numDots = 100;

        for (let i = 0; i < numDots; i++) {
          dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 5 + 2,
            speed: Math.random() * 2 + 1,
          });
        }

        // 使用 setInterval 模拟动画
        function animate() {
          ctx.clearRect(0, 0, width, height);

          dots.forEach((dot) => {
            dot.x -= dot.speed;
            if (dot.x < -dot.radius) {
              dot.x = width + dot.radius;
              dot.y = Math.random() * height;
            }

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#8C0A41';
            ctx.fill();
          });
        }

        // 每 16ms 执行动画，相当于每秒约 60 帧
        setInterval(animate, 16);
      });
  },

});
