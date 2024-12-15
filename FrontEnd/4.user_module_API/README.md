*可协商，需协商*

### 1.微信小程序登录：

前端向微信开发平台申请到code后，就向后端发code。

后端收到code后，向微信服务器请求access_token，给后端token用于身份识别。

#### POST /login

```
data: {
    code: code
}
```



### 2.注册信息的提交

注册时，有图像上传，这是另外的接口。注册提交信息中有图片名。

### POST /register


```
const requestData = {
      openid: wx.getStorageSync('openid'),
      username: this.data.userName,
      gender: this.data.genderCode,
      alumni_status: this.data.identityCode,
      //region: this.data.selectedRegion,
      //nativePlace: this.data.selectedNativePlace,
      contactInfo: {
        phone_number: this.data.phone,
        email: this.data.email,
        wechat_id: this.data.wechat,
        qq_id: this.data.qq,
      },
      studentInfo: {
        student_id: this.data.studentID,
        degree: this.data.selectedDegreeCode,
        campus: this.data.selectedCampusCode,
        college: this.data.selectedCollegeCode,
        major: this.data.selectedMajorCode,
        enrollment_year: this.data.selectedEnrollmentYear,
        graduationYear: this.data.selectedGraduationYear,
      },
      career: {
        industry_options: this.data.selectedIndustryCode,
        company: this.data.workUnit,
        profession: this.data.position,
      },
      uploadedImageName: this.data.uploadedImageName,
      otherDescription: this.data.otherDescription,
    };
```

### POST /uploadImage

图片上传会单独POST一次

>wx.uploadFile() 是一个基于 multipart/form-data 的文件上传请求，而非纯粹的 JSON 格式。文件上传时，文件本身会通过 filePath 上传，formData 中可以包含额外的数据。

```
filePath：上传的文件路径
name：上传字段名，这里是图片——image
formData：customName:指明谁上传的，后续改为token较好
```
