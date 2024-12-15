# DATABASE

```
//我的mysql版本是： C:mysql.exe  Ver 8.0.11 for Win64 on x86_64 (MySQL Community Server - GPL)

// MySQL 数据库的连接信息
    String url = "jdbc:mysql://172.30.207.108:3306/Alumni";
    String user = "root";
    String password = "123456";
```


## Overview

> 由于表经常需要维护，此图可能不是最新。

![image](https://github.com/user-attachments/assets/f7a32491-3b3e-44fe-ae19-7daa96798dfc)


#### users

![image](https://github.com/user-attachments/assets/03ed0704-dbba-4c40-9167-37cee4ad547a)


#### userinfo

![image](https://github.com/user-attachments/assets/334d7c61-5319-4062-803b-c18655093bd0)

#### usercontacts

![image](https://github.com/user-attachments/assets/f629764d-9cb0-4d6d-981d-88b3b6360b96)


#### userprivacy

![image](https://github.com/user-attachments/assets/0ce030ea-8460-462b-a3e4-86a8d2947cc3)


<br><br>

---

### .sql

```
create database alumni;
use alumni;
# 主用户表
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户主键，自增',
    username VARCHAR(10) NOT NULL COMMENT '用户名',
    openid VARCHAR(64) comment '微信登录唯一身份标识' 
    avatar_path VARCHAR(255) COMMENT '头像图路径',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间'
) COMMENT='主用户信息表';

# 用户信息表
CREATE TABLE UserInfo (
    user_id INT PRIMARY KEY COMMENT '用户ID，外键，关联Users表的id',
    gender TINYINT COMMENT '性别：1-男，2-女，0-未知',
    alumni_status TINYINT COMMENT '校友身份：1-在校生，2-毕业生，3-教职工',
    college INT COMMENT '学院ID，关联专业表',
    major INT COMMENT '专业ID，关联专业表',
    profession VARCHAR(15) COMMENT '职业',
    company VARCHAR(20) COMMENT '所在公司',
    enrollment_year YEAR COMMENT '入学年份',
    current_province INT COMMENT '现居住省ID，关联地区表',
    current_city INT COMMENT '现居住市ID，关联地区表',
    current_district INT COMMENT '现居住区ID，关联地区表',
    household_province INT COMMENT '户籍省ID，关联地区表',
    household_city INT COMMENT '户籍市ID，关联地区表',
    household_district INT COMMENT '户籍区ID，关联地区表',
    is_contact_public BOOLEAN DEFAULT FALSE COMMENT '联系方式是否公开',
    is_verified BOOLEAN DEFAULT FALSE COMMENT '是否通过认证',
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
) COMMENT='用户详细信息表';

# 用户隐私表
CREATE TABLE UserPrivacy (
    user_id INT PRIMARY KEY COMMENT '用户ID，外键，关联Users表的id',
    student_id VARCHAR(12) COMMENT '学号',
    certification_image_path VARCHAR(255) COMMENT '认证图片路径',
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
) COMMENT='用户隐私信息表';

# 用户联系方式表
CREATE TABLE UserContacts (
    user_id INT PRIMARY KEY COMMENT '用户ID，外键，关联Users表的id',
    wechat_id VARCHAR(30) COMMENT '微信号',
    qq_id VARCHAR(20) COMMENT 'QQ号',
    email VARCHAR(30) COMMENT '邮箱地址',
    phone_number VARCHAR(15) COMMENT '联系电话',
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
) COMMENT='用户联系方式表';

```
