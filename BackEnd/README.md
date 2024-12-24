# DATABASE

```
//我的mysql版本是： C:mysql.exe  Ver 8.0.11 for Win64 on x86_64 (MySQL Community Server - GPL)

// MySQL 数据库的连接信息
    String url = "jdbc:mysql://172.30.207.108:3306/Alumni";
    String user = "root";
    String password = "123456";
```


## Overview

![image](https://github.com/user-attachments/assets/378a9fdf-e4d3-4386-8f02-c4da5d5fbfce)


#### users

![image](https://github.com/user-attachments/assets/03ed0704-dbba-4c40-9167-37cee4ad547a)


#### userinfo

![image](https://github.com/user-attachments/assets/edaf142e-ec51-4945-bb58-9fb948bb2d12)


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
-- users 表
CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户主键，自增',
    `username` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
    `openid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '微信登录唯一身份标识',
    `is_verified` int(11) DEFAULT NULL COMMENT '是否认证： 1-未认证, 2-认证通过, 3-认证不通过',
    `avatar_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '头像图路径',
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- userinfo 表
CREATE TABLE `userinfo` (
  `user_id` int(11) NOT NULL COMMENT '用户ID，外键，关联Users表的id',
  `gender` tinyint(4) DEFAULT NULL COMMENT '性别：1-男，2-女，0-未知',
  `alumni_status` tinyint(4) DEFAULT NULL COMMENT '校友身份：1-学生，2-教职工',
  `campus` tinyint(4) DEFAULT NULL COMMENT '校区：1-粤海，2-丽湖， 3-罗湖',
  `educational_background` int(11) DEFAULT NULL COMMENT '学历： 1-本科, 2-硕士, 3-博士, 4-其他',
  `college` int(11) DEFAULT NULL COMMENT '学院ID，关联专业表',
  `major` int(11) DEFAULT NULL COMMENT '专业ID，关联专业表',
  `profession` varchar(64) DEFAULT NULL COMMENT '职业',
  `company` varchar(64) DEFAULT NULL COMMENT '所在公司',
  `enrollment_year` year(4) DEFAULT NULL COMMENT '入学年份',
  `graduation_year` int(11) DEFAULT NULL COMMENT '毕业年份',
  `industr_category` int(11) DEFAULT NULL COMMENT '行业领域类别',
  `industry_code` int(11) DEFAULT NULL COMMENT '行业领域下具体行业编码',
  `current_province` int(11) DEFAULT NULL COMMENT '现居住省ID，关联地区表',
  `current_city` int(11) DEFAULT NULL COMMENT '现居住市ID，关联地区表',
  `current_district` int(11) DEFAULT NULL COMMENT '现居住区ID，关联地区表',
  `household_province` int(11) DEFAULT NULL COMMENT '户籍省ID，关联地区表',
  `household_city` int(11) DEFAULT NULL COMMENT '户籍市ID，关联地区表',
  `household_district` int(11) DEFAULT NULL COMMENT '户籍区ID，关联地区表',
  `is_contact_public` tinyint(1) DEFAULT '0' COMMENT '联系方式是否公开',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `userinfo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户详细信息表'


-- userprivacy 表
CREATE TABLE `userprivacy` (
    `user_id` int(11) NOT NULL COMMENT '用户ID，外键，关联Users表的id',
    `student_id` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '学号',
    `certification_image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '认证图片路径',
    `other_description` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '注册时额外的说明',
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户隐私表';

-- usercontacts 表
CREATE TABLE `usercontacts` (
    `user_id` int(11) NOT NULL COMMENT '用户ID，外键，关联Users表的id',
    `wechat_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '微信号',
    `qq_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'QQ号',
    `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '邮箱地址',
    `phone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '联系电话',
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户联系方式表';


```
