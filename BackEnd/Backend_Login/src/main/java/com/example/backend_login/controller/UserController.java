package com.example.backend_login.controller;

import com.example.backend_login.entity.*;
import com.example.backend_login.entity.dto.UserDTO;
import com.example.backend_login.service.UserContactsService;
import com.example.backend_login.service.UserInfoService;
import com.example.backend_login.service.UserPrivacyService;
import com.example.backend_login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController //接口返回对象，转换成json文本
@RequestMapping("/user")  //localhost:8080/user/**  访问接口
public class UserController {

    @Autowired
    public UserService userService;
    @Autowired
    public UserContactsService userContactsService;
    @Autowired
    UserInfoService userInfoService;
    @Autowired
    UserPrivacyService userPrivacyService;

    //增
    @PostMapping    //url:localhost:8080/user/
    public ResponseMessage add(@RequestBody UserDTO user) {
        userService.saveUserAllInfo(user);
        return ResponseMessage.success(user);
    }

    //删
    @DeleteMapping("/{id}")
    public void del(@PathVariable Integer id){
        userService.delete(id);
    }

    //改
    @PutMapping
    public ResponseMessage set(@Validated @RequestBody UserDTO user){
        userService.set(user);
        return ResponseMessage.success(user);
    }

    //查
    @GetMapping("{id}")//localhost:8080/user/{id}  访问接口
    public User get(@PathVariable Integer id){
        User user =userService.get(id);
        return user;
    }

    @GetMapping("/nameAndImageUrl/{id}")
    public Map<String, Object> GetNameAndImageurlByid(@PathVariable Integer id){
        Map map=userService.getNameImageurlByid(id);
        return map;
    }

    @GetMapping("/userstatus/{openid}")
    public Integer ReturnUserStatus(@PathVariable String openid){
        return  userService.returnStatus(openid);
    }
    }
