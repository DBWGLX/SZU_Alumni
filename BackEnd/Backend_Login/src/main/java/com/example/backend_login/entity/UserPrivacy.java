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
    private String student_id;

    @Column(name = "certification_image_path")
    private String certification_image_path;

    @Column(name = "other_description")
    private String other_description;
    @OneToOne
    @MapsId  //主键是关联实体（User）的主键，实现共享主键的一对一关联
    @JoinColumn(name = "user_id")
    private User user;
}
