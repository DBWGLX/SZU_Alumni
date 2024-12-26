// 导入学院映射表
const collegeMap = require("../../utils/collegeMap.js");
const regionData = require("../../utils/region-data.js").RegionData();
const industry_options = require("../../utils/industryOptions.js");
const regUrl = 'http://172.30.207.108:8080';//后端服务器
//const regUrl = 'http://192.168.137.135:8080';
//url: 'http://172.29.19.212:8080/user', // 替换为实际的后端地址

Page({
  data: {
    userStatus: 'not_logged_in', // 初始状态
    token: '',
    //基本信息
    userName: '用户名',
    gender: '',
    genderCode: '2',
    identity: '',
    identityCode: '1',
    //selectedDate: '', // 保存选中的生日
    //地区
    multiArray: [[], [], []], // 每列数据
    selectedIndices: [0, 0, 0], // 每列选中的索引
    selectedRegion: "", // 显示选择结果
    //籍贯
    multiArray2: [[], [], []],
    selectedIndices2: [0, 0, 0],
    selectedNativePlace: '',
    //politicalStatus: ['群众','团员','党员','其他'],
    //selectedPoliticalStatus: '', // 保存选中的政治面貌
    displayContactInformation: true,
    phone: '10086111231',
    email: '163@wmail.com',
    wechat: 'abcde',
    qq: '123456789',
    //身份认证
    studentID: '',
    //校区
    campusOptions: ['粤海沧海校区', '丽湖校区', '罗湖校区'],
    selectedCampus: '',
    selectedCampusCode: '',
    //学院
    collegeOptions: [],
    selectedCollege: '',
    selectedCollegeCode: '', // 选择的学院编码
    //专业
    majorOptions: ['请先选择您的学院'],
    selectedMajor: '',
    selectedMajorCode: '',
    //班级
    // classOptions: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B','其他'],
    // selectedClass: '',
    selectedEnrollmentYear: '',
    selectedGraduationYear: '',
    degreeOptions: ['本科', '硕士', '博士'],
    selectedDegree: '',
    selectedDegreeCode: '',
    //事业
    //行业领域
    industryOptions: ['互联网', '金融', '教育', '制造业', '医疗'],
    selectedIndustry: '',
    selectedCategory: '',
    selectedIndustryCode: '',
    selectedCategoryCode: '',

    workUnit: '',
    position: '',
    industryDescription: '',
    uploadedImageName: '',
    otherDescription: '',
  },

  onLoad() {
    // 加载学院数据
    const collegeOptions = Object.values(collegeMap).map(college => college.name);
    //加载地区三维数组
    //console.log(regionData);
    //console.log(Array.isArray(regionData));
    const provinces = regionData.map(province => province.label);
    const cities = regionData[0].children.map(city => city.label);
    const areas = regionData[0].children[0].children.map(area => area.label);
    //加载行业领域二维数组
    const pickerColumns = [
      industry_options.map(item => item.category), // 第一列：类别
      industry_options[0].options                  // 第二列：默认显示第一个类别的选项
    ];
    this.setData({
      collegeOptions: collegeOptions,
      multiArray: [provinces, cities, areas],
      multiArray2: [provinces, cities, areas],
      industryOptions: pickerColumns,
    });
    console.log("industryOptions",this.data.industryOptions);
    console.log("industry_options",industry_options);
    // 判断用户是否已登录
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (isLoggedIn) {
      // const selectedCollegeSet = collegeMap[this.data.selectedCollegeCode]; // 获取学院
      // const selectedCollegeName = selectedCollegeSet.name;
      // this.setData({
      //   userStatus: 'logged_in',
      //   selectedCollege: selectedCollegeName,  // 选择的学院名称
      //   selectedMajor: this.data.majorOptions[this.data.selectedMajorCode],
      // });
    }
  },

  onShow() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (isLoggedIn) {
      this.setData({
        userStatus: 'logged_in',
      });
    } else {
      this.setData({
        userStatus: 'not_logged_in'
      });
    }

    // #####
    //测试页面切换：
    this.setData({
      userStatus: 'not_logged_in',
      //userStatus: 'registering',
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
          const that = this; // 保存当前页面实例的引用
          wx.request({
            //url: 'http://172.30.207.108:3000/login', // 你的服务器地址
            url: 'http://127.0.0.1:3000/login',
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
                
                //【2】根据用户状态，跳转不同页面 （注册/待核验/个人界面）
                //openid = wx.getStorageSync('openid');4
                console.log(123);
                wx.request({
                  url: `${regUrl}/user/userstatus/${openid}`,  // 拼接 URL，传递 openid
                  method: 'GET',  // 使用 GET 请求
                  success(res) {
                    if (res.statusCode === 200) {
                      console.log(456);
                      const intResult = res.data;  // 假设返回的整数在响应体中
                      console.log("后端返回的整数是:", intResult);

                      wx.hideLoading();
                      wx.showToast({ title: '登录成功', icon: 'none' });
                      if(intResult === 0){
                        that.setData({
                          userStatus : 'registering',
                        })
                      }
                      else if(intResult === 1){
                        wx.redirectTo({
                          url: '/pages/4-waiting_for_approval/waiting_for_approval'
                        }); 
                      }
                      else if(intResult === 2){
                        that.setData({
                          userStatus : 'logged_in'
                        })
                      }
                      else{
                        wx.showToast({ title: '服务器返回错误，请稍后重试', icon: 'none' });
                      }
                    } else {
                      console.error("请求失败2，状态码:", res.statusCode);
                      wx.hideLoading();
                      wx.showToast({
                        title: response.data.message || '服务器异常2，请重试',
                        icon: 'none'
                      });
                    }
                  },
                  fail(error) {
                    console.error("请求失败2:", error);
                    wx.hideLoading();
                    wx.showToast({
                      title: response.data.message || '网络异常2，请重试',
                      icon: 'none'
                    });
                  }
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
    var genderCode = 1;
    console.log(e);
    if(e.detail.value === '男'){
      genderCode = 1;
    }else{
      genderCode = 2;
    }
    
    this.setData({
      gender: e.detail.value,
      genderCode: genderCode
    });
    console.log("性别：",this.data.genderCode);
  },
  onIdentityChange(e) {
    var identityCode = 1;
    if(e.detail.value === "学生"){
      identityCode = 1;
    }else{
      identityCode = 2;
    }
    this.setData({
      identity: e.detail.value,
      identityCode: identityCode
    });
    console.log("校友身份：",this.data.identityCode);
  },
  // onDateChange(e) {
  //   const selectedDate = e.detail.value;
  //   this.setData({
  //     selectedDate,
  //   });
  // },
  onColumnChange(e) {
    const { column, value } = e.detail; // 哪一列，选中了哪个值
    const selectedIndices = this.data.selectedIndices;
    selectedIndices[column] = value;

    // 更新其他列的数据
    if (column === 0) {
      // 更新城市和区
      const cities = regionData[value].children.map(city => city.label);
      const areas = regionData[value].children[0].children.map(area => area.label);
      this.setData({
        multiArray: [this.data.multiArray[0], cities, areas],
        selectedIndices: [value, 0, 0],
      });
    } else if (column === 1) {
      // 更新区
      const areas = regionData[selectedIndices[0]].children[value].children.map(area => area.label);
      this.setData({
        multiArray: [this.data.multiArray[0], this.data.multiArray[1], areas],
        selectedIndices: [selectedIndices[0], value, 0],
      });
    }
  },
  onRegionChange(e) {
    console.log(e);
    const selectedIndices = e.detail.value;
    const province = regionData[selectedIndices[0]].label;
    const city = regionData[selectedIndices[0]].children[selectedIndices[1]].label;
    const area = regionData[selectedIndices[0]].children[selectedIndices[1]].children[selectedIndices[2]].label;

    this.setData({
      selectedIndices,
      selectedRegion: `${province} ${city} ${area}`, // 将地区数组转为字符串
    });
    console.log("所在城市：",this.data.selectedIndices,this.data.selectedRegion);
  },
  onColumnChange2(e) {
    const { column, value } = e.detail; // 哪一列，选中了哪个值
    const selectedIndices2 = this.data.selectedIndices2;
    selectedIndices2[column] = value;

    // 更新其他列的数据
    if (column === 0) {
      // 更新城市和区
      const cities = regionData[value].children.map(city => city.label);
      const areas = regionData[value].children[0].children.map(area => area.label);
      this.setData({
        multiArray2: [this.data.multiArray2[0], cities, areas],
        selectedIndices2: [value, 0, 0],
      });
    } else if (column === 1) {
      // 更新区
      const areas = regionData[selectedIndices[0]].children[value].children.map(area => area.label);
      this.setData({
        multiArray2: [this.data.multiArray2[0], this.data.multiArray2[1], areas],
        selectedIndices2: [selectedIndices2[0], value, 0],
      });
    }
  },
  onNativePlaceChange(e) {
    const selectedIndices = e.detail.value;
    const province = regionData[selectedIndices[0]].label;
    const city = regionData[selectedIndices[0]].children[selectedIndices[1]].label;
    const area = regionData[selectedIndices[0]].children[selectedIndices[1]].children[selectedIndices[2]].label;
    this.setData({
      selectedIndices2: selectedIndices,
      selectedNativePlace: `${province} ${city} ${area}`, // 将地区数组转为字符串
    });
    console.log("籍贯：",this.data.selectedIndices2,this.data.selectedNativePlace);
  },
  // onPoliticalChange(e) {
  //   const index = e.detail.value; // 获取选择的索引
  //   const selectedPoliticalStatus = this.data.politicalStatus[index];
  //   this.setData({
  //     selectedPoliticalStatus,
  //   });
  // },
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
  //学号
  onStudentIDInput(e){
    this.setData({
      studentID: e.detail.value
    });
  },
  onCampusChange(e) {
    const index = e.detail.value; // 获取用户选择的索引
    console.log(e);
    this.setData({
      selectedCampus: this.data.campusOptions[index],
      selectedCampusCode: parseInt(index)
    });
    console.log("校区：",this.data.selectedCampus,this.data.selectedCampusCode);
  },
  //学院
  onCollegeChange(e) {
    const index = e.detail.value; // 获取用户选择的索引
    const selectedCollegeCode = parseInt(index, 10)+1; // 获取对应的学院编码 
    const selectedCollegeSet = collegeMap[selectedCollegeCode]; // 获取学院
    const curMajors = Object.values(selectedCollegeSet.majors);
    this.setData({
      selectedCollege: selectedCollegeSet.name,  // 选择的学院名称
      selectedCollegeCode: selectedCollegeCode,  // 选择的学院编码
      majorOptions: curMajors
    });
    console.log("学院：",this.data.selectedCollege,this.data.selectedCollegeCode,this.data.majorOptions);
  },
  //专业
  onMajorChange(e) {
    const index = e.detail.value;
    const selectedCollegeSet = collegeMap[this.data.selectedCollegeCode]; // 获取学院
    // console.log(selectedCollegeSet.majors);
    // console.log(Object.values(selectedCollegeSet.majors)[index]);
    // console.log(Object.keys(selectedCollegeSet.majors)[index]);
    this.setData({
      selectedMajor: this.data.majorOptions[index],
      selectedMajorCode: Object.keys(selectedCollegeSet.majors)[index]
    });
  },
  // onClassChange(e) {
  //   this.setData({
  //     selectedClass: this.data.classOptions[e.detail.value]
  //   });
  // },
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
      selectedDegree: this.data.degreeOptions[e.detail.value],
      selectedDegreeCode: e.detail.value+1,
    });
  },
  onIndustryColumnChange(e) {
    const { column, value } = e.detail;
    const { industryOptions } = this.data;
    //console.log(e);
    //console.log(industryOptions);
    //console.log(industry_options);
    if (column === 0) {
      // 如果切换的是第一列（类别），更新第二列的选项
      const newIndustryOptions = [...industryOptions];//【深拷贝】
      //console.log(newIndustryOptions);
      newIndustryOptions[1] = industry_options[value].options;
      this.setData({
        industryOptions:newIndustryOptions,
      });
    }
  },
  onIndustryChange(e) {
    const { value } = e.detail; 
    const selectedCategory = industry_options[value[0]].category;
    const selectedIndustry =  industry_options[value[0]].options[value[1]];
    this.setData({
      selectedIndustry: `${selectedCategory} ${selectedIndustry}`,
      selectedCategoryCode:value[0],
      selectedIndustryCode:value[1],
    });
    console.log(this.data.selectedIndustry,);
    console.log("选中的分类：", this.data.selectedCategoryCode);
    console.log("选中的行业：", this.data.selectedIndustryCode);
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

  //注册的图片上传
  uploadImage() {
    wx.showLoading({ title: '正在上传图片...' });
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
            wx.hideLoading();
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
            wx.hideLoading();
            console.log(err.errMsg);
            wx.showToast({ title: '图片上传失败'+ err.errMsg, icon: 'none' });
          },
        });
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: '选择图片失败', icon: 'none' });
      },
    });
  },

  //注册的提交
  submitRegister() {
    wx.showLoading({ title: '提交中...' });
    
    // 构造请求数据对象
    const requestData = {
      openid: wx.getStorageSync('openid'),
      username: this.data.userName,
      gender: this.data.genderCode,
      alumni_status: this.data.identityCode,
      current_province: this.data.selectedIndices[0],
      current_city:this.data.selectedIndices[1],
      current_district:this.data.selectedIndices[2],
      household_province:this.data.selectedIndices2[0],
      household_city:this.data.selectedIndices2[1],
      household_district:this.data.selectedIndices2[2],
      //region: this.data.selectedRegion,
      //nativePlace: this.data.selectedNativePlace,
      phone_number: this.data.phone,
      email: this.data.email,
      wechat_id: this.data.wechat,
      qq_id: this.data.qq,
      student_id: this.data.studentID,
      degree: this.data.selectedDegreeCode,
      campus: this.data.selectedCampusCode,
      college: this.data.selectedCollegeCode,
      major: this.data.selectedMajorCode,
      enrollment_year: this.data.selectedEnrollmentYear,
      graduation_year: this.data.selectedGraduationYear,
      industr_category: this.data.selectedCategoryCode,//待加
      industry_code: this.data.selectedIndustryCode,//待加
      company: this.data.workUnit,
      profession: this.data.position,
      uploaded_imageName: this.data.uploadedImageName,
      other_description: this.data.otherDescription,
    };
  
    console.log(requestData);
    // 提交ing
    setTimeout(() => {
      wx.request({
        //url: 'http://172.29.19.212:8080/user', // 替换为实际的后端地址
        url: `${regUrl}/user`,
        method: 'POST',
        data: requestData,
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          wx.hideLoading();
          if (res.data.success) { // 假设后端返回的 JSON 数据中有 success 字段       
            wx.redirectTo({
              url: '/pages/4-register_success/register_success'
            }); 
            wx.showToast({ title: '注册成功', icon: 'success' });
          } else {
            wx.showToast({
              title: res.data.message || '提交失败，请重试',
              icon: 'none',
            });
          }
          
        },
        fail: (err) => {
          wx.hideLoading();
          wx.showToast({
            title: '提交失败，请检查网络连接',
            icon: 'none',
          });
        },
      });
    }, 1000);
  },
  

  // #####################################

  copyToClipboard(event) {
    console.log(event);
    const contentToCopy = event.currentTarget.dataset.content; // 获取动态绑定的数据
    wx.setClipboardData({
      data: contentToCopy, // 复制动态内容
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'none'
        });
      }
    });
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

});