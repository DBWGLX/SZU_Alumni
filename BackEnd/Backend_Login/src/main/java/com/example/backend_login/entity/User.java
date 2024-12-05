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
    @Column(name = "user_id")
    private Integer UserId;

    @Column(name = "user_name")
    private String UserName;

    @Column(name = "user_job")
    private String UserJob;

    @Column(name = "user_major")
    private String UserMajor;

    @Column(name = "user_introduce")
    private String UserIntroduce;

    @Column(name = "user_gender")
    private boolean gender;

    @Column(name = "image_url")
    private String ImageUrl;

    @Column(name ="user_occupation")
    private String UserOccupation;

    @Column(name="school_year")
    private Date SchoolYear;

    @Column(name="if_public")
    private boolean IfPublic;

    @Column(name="if_approve")
    private boolean IfApprove;
}
