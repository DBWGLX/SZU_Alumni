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
requestData = {
      name: this.data.name,
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
        college: this.data.selectedCollege,
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
```

### POST /uploadImage

图片上传会单独POST一次

>wx.uploadFile() 是一个基于 multipart/form-data 的文件上传请求，而非纯粹的 JSON 格式。文件上传时，文件本身会通过 filePath 上传，formData 中可以包含额外的数据。

```
filePath：上传的文件路径
name：上传字段名，这里是图片——image
formData：customName:指明谁上传的，后续改为token较好
```
