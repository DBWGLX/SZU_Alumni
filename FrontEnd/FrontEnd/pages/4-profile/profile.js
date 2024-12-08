Page({
  data: {
    userStatus: 'not_logged_in', // 初始状态
    userInfo: {
      userName: 'Powder', // 默认值
      gender: '男',
      identity: '学生',
      year: '2022',
      major: '软件工程',
      location: '山西'
    }, // 登录后的用户信息

    token: '',
    //基本信息
    userName: '未填写',
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
    uploadedImageName: '',
    otherDescription: '',
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
      //userStatus: 'not_logged_in',
      userStatus: 'registering',
      //userStatus: 'logged_in',
      //userStatus: 'test',
    });
  },

  login() {
    wx.showLoading({ title: '登录中...' });
    wx.login({
      success: (res) => {
        if (res.code) {
          const code = res.code;
          // 将 code 发送到后端
          wx.request({
            url: 'http://172.30.207.108:3000/login', // 你的服务器地址
            method: 'POST',
            data: {
              code: code
            },
            success: (response) => {
              if (response.data.success) {
                const { session_key, openid } = response.data;
                //wx.setStorageSync('token', token); // 存储 token
                wx.setStorageSync('session_key', session_key);
                wx.setStorageSync('openid', openid);
                wx.setStorageSync('isLoggedIn', true); // 表示用户已登录
                wx.hideLoading();
                wx.showToast({ title: '登录成功', icon: 'none' });
                this.setData({
                  userStatus: 'registering' // 跳转到注册状态
                });
              } else{
                  wx.hideLoading();
                  wx.showToast({
                    title: response.data.message || '登录失败，请重试',
                    icon: 'none'
                  });
              }
            },
            fail: (error) => {
              console.error('请求失败', error);
              wx.hideLoading();
              wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({ title: '微信登录失败，请重试', icon: 'none' });
        }
      }
    });
  },

  //选择器选择后，回显到页面并存到data中
  onNameInput(e) {
    this.setData({
      userName: e.detail.value
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
  onOtherDescriptionInput(e){
    this.setData({
      otherDescription: e.detail.value
    });
  },

  uploadImage() {
    wx.chooseImage({
      count: 1, // 最多选择一张图片
      sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
      sourceType: ['album', 'camera'], // 可以从相册或相机选择
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        wx.uploadFile({
          url: 'http://172.30.207.108:5010/upload', // 后端上传图片的接口地址
          filePath: tempFilePath,//上传的文件路径
          name: 'image',// 后端用来解析上传文件的字段名
          formData: { // 额外的表单数据
            customName: this.data.name+'uploadedImageName', // 自定义的图片名
          },
          success: (resUpload) => { //上传成功后的回调函数
            const response = JSON.parse(resUpload.data);
            if (response.success) {
              const imageName = response.imageName;
              this.setData({
                uploadedImageName: this.data.name+'uploadedImageName',
              });
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
    wx.showLoading({ title: '提交中...' });
    
    // 构造请求数据对象
    const requestData = {
      userName: this.data.userName,
      gender: this.data.gender,
      identity: this.data.identity,
      birthday: this.data.selectedDate,
      region: this.data.selectedRegion,
      nativePlace: this.data.selectedNativePlace,
      politicalStatus: this.data.selectedPoliticalStatus,
      contactInfo: {
        phone: this.data.phone,
        email: this.data.email,
        wechat: this.data.wechat,
        qq: this.data.qq,
      },
      studentInfo: {
        studentID: this.data.studentID,
        campus: this.data.selectedCampus,
        major: this.data.selectedMajor,
        class: this.data.selectedClass,
        enrollmentYear: this.data.selectedEnrollmentYear,
        graduationYear: this.data.selectedGraduationYear,
        degree: this.data.selectedDegree,
      },
      career: {
        industry: this.data.selectedIndustry,
        workUnit: this.data.workUnit,
        position: this.data.position,
        description: this.data.industryDescription,
      },
      uploadedImageName: this.data.uploadedImageName,
      otherDescription: this.data.otherDescription,
    };
  
    // 提交ing
    setTimeout(() => {
      wx.request({
        url: 'http://172.29.19.212:8080/user', // 替换为实际的后端地址
        method: 'POST',
        data: requestData,
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          if (res.data.success) { // 假设后端返回的 JSON 数据中有 success 字段
            // 替换实际后端返回的用户名和头像
            this.setData({
              userStatus: 'logged_in',
              userInfo: { username: requestData.name, avatar: '../../images/avatar.jpg' }, 
            });
            wx.setStorageSync('isLoggedIn', true);
            wx.setStorageSync('userInfo', this.data.userInfo);
            wx.showToast({ title: '注册成功', icon: 'success' });
          } else {
            wx.showToast({
              title: res.data.message || '提交失败，请重试',
              icon: 'none',
            });
          }
        },
        fail: (err) => {
          wx.showToast({
            title: '提交失败，请检查网络连接',
            icon: 'none',
          });
        },
      });
      wx.hideLoading();
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


});