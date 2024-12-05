package com.example.backend_login.entity.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Date;

@Data
public class UserDTO {

    private Integer UserId;

    private String UserName;

    private String UserJob;

    private String UserMajor;

    private String UserIntroduce;

    private boolean gender;

    private String ImageUrl;

    private String UserOccupation;

    private Date SchoolYear;

    private boolean IfPublic;

    private boolean IfApprove;

}
