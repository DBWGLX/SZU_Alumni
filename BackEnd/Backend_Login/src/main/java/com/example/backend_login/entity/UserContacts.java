package com.example.backend_login.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "usercontacts")
public class UserContacts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "wechat_id")
    private String wechat_id;

    @Column(name = "qq_id")
    private String qq_id;

    @Column(name = "phone_number")
    private String phone_number;

    @Column(name = "email")
    private String email;

    @OneToOne
    @MapsId  // 表明此实体的主键也是关联实体（User）的主键，实现共享主键的一对一关联
    @JoinColumn(name = "user_id")
    private User user;
}
