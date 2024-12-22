package com.example.backend_login.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Data
@Table(name="users")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "openid")
    private String openid;

    @Column(name = "avatar_path")
    private String avatar_path;

    @Column(name = "created_at")
    private Date created_at;

    @Column(name = "updated_at")
    private Date updated_at;

    @Column(name = "is_verified")
    private Byte is_verified;
}