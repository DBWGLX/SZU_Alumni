package com.example.backend_login.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "userprivacy")
public class UserPrivacy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "student_id")
    private String StuId;

    @Column(name = "certification_image_path")
    private String CertificationImagePath;

    @OneToOne
    @MapsId  //主键是关联实体（User）的主键，实现共享主键的一对一关联
    @JoinColumn(name = "user_id")
    private User user;
}
