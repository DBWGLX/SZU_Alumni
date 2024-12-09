package com.example.backend_login.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "userContacts")
public class UserContacts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "wechat_id")
    private String StuId;

    @Column(name = "qq_id")
    private String QqId;

    @Column(name = "phone_number")
    private String PhoneNumber;

    @Column(name = "email")
    private String Email;

    @OneToOne
    @MapsId  // 表明此实体的主键也是关联实体（User）的主键，实现共享主键的一对一关联
    @JoinColumn(name = "user_id")
    private User user;
}
