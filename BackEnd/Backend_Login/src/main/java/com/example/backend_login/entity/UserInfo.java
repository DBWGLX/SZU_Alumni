package com.example.backend_login.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "UserInfo")
public class UserInfo {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "alumni_status")
    private Integer alumniStatus;

    @Column(name = "college")
    private Integer college;

    @Column(name = "major")
    private Integer major;

    @Column(name = "profession")
    private String profession;

    @Column(name = "company")
    private String company;

    @Column(name = "enrollment_year")
    private Short enrollmentYear;

    @Column(name = "current_province")
    private Integer currentProvince;

    @Column(name = "current_city")
    private Integer currentCity;

    @Column(name = "current_district")
    private Integer currentDistrict;

    @Column(name = "household_province")
    private Integer householdProvince;

    @Column(name = "household_city")
    private Integer householdCity;

    @Column(name = "household_district")
    private Integer householdDistrict;

    @Column(name = "is_contact_public")
    private Boolean isContactPublic;


    // 建立与User类的关联
    @OneToOne
    @MapsId  //主键是关联实体（User）的主键，实现共享主键的一对一关联
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}