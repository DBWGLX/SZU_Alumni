package com.example.backend_login.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Table(name="user")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer UserId;

    @Column(name = "username")
    private String UserName;

    @Column(name = "openid")
    private String Openid;

    @Column(name = "avatar_path")
    private String AvatarPath;

    @Column(name = "created_at")
    private Date CreatedAt;

    @Column(name = "updated_at")
    private Date UpdatedAt;

    @Column(name = "is_verified")
    private Boolean isVerified;
}
