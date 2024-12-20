package com.example.backend_login.entity.dto;

import com.example.backend_login.entity.UserPrivacy;
import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Date;

@Data
public class UserDTO {

    private Integer id;

    private String username;

    private String openid;

    private String avatar_path;

    private Date created_at;

    private Date updated_at;

    private Boolean is_verified;

    //UserContacts
    private String wechat_id;

    private String qq_id;

    private String phone_number;

    private String email;

    //UserInfo

    private Byte gender;

    private Byte alumni_status;

    private Integer college;

    private Integer major;

    private String profession;

    private String company;

    private Short enrollment_year;

    private Integer current_province;

    private Integer current_city;

    private Integer current_district;

    private Integer household_province;

    private Integer household_city;

    private Integer household_district;

    private Boolean is_contact_public;

    private Integer educational_background;

    private Integer industry_options;

    private Byte campus;
    //UserPrivacy

    private String student_id;

    private String certification_image_path;

    private String other_description;
}