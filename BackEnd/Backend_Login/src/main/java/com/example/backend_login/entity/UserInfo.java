package com.example.backend_login.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "userinfo")
public class UserInfo {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "gender")
    private Byte gender;

    @Column(name = "alumni_status")
    private Byte alumni_status;

    @Column(name = "campus")
    private Byte campus;


    @Column(name = "educational_background")
    private Integer educational_background;

    @Column(name = "college")
    private Integer college;

    @Column(name = "major")
    private Integer major;

    @Column(name = "industry_category")
    private Integer industry_category;

    @Column(name = "industry_code")
    private Integer industry_code;

    @Column(name = "profession")
    private String profession;

    @Column(name = "company")
    private String company;

    @Column(name = "enrollment_year")
    private Short enrollment_year;

    @Column(name = "current_province")
    private Integer current_province;

    @Column(name = "graduation_year")
    private Integer graduation_year;

    @Column(name = "current_city")
    private Integer current_city;

    @Column(name = "current_district")
    private Integer current_district;

    @Column(name = "household_province")
    private Integer household_province;

    @Column(name = "household_city")
    private Integer household_city;

    @Column(name = "household_district")
    private Integer household_district;

    @Column(name = "is_contact_public")
    private Boolean is_contact_public;

    // 建立与User类的关联
    @OneToOne
    @MapsId  //主键是关联实体（User）的主键，实现共享主键的一对一关联
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}