package com.example.backend_login.entity.dto;

import com.example.backend_login.entity.UserPrivacy;
import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Date;

@Data
public class UserDTO {

    private Integer UserId;

    private String UserName;

    private String openid;

    private String AvatarPath;

    private Date CreatedAt;

    private Date UpdatedAt;

    private Boolean isVerified;

    //UserInfo
    private Integer userId;

    private Integer gender;

    private Integer alumniStatus;

    private Integer college;

    private Integer major;

    private String profession;

    private String company;

    private Short enrollmentYear;

    private Integer currentProvince;

    private Integer currentCity;

    private Integer currentDistrict;

    private Integer householdProvince;

    private Integer householdCity;

    private Integer householdDistrict;

    private Boolean isContactPublic;

    //UserContacts
    private String StuId;

    private String QqId;

    private String PhoneNumber;

    private String Email;

    //UserPrivacy

    @Column(name = "certification_image_path")
    private String CertificationImagePath;
}
