package com.iamvickyav.springboot.SpringBootRestWithH2.controller;

import com.iamvickyav.springboot.SpringBootRestWithH2.model.User;
import com.iamvickyav.springboot.SpringBootRestWithH2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/register")
    public String register(User user) {
        User result = userService.save(user);
        if(result != null) {
            return "{\"code\":1,"+"\"data\":\""+result.getId()+"\""+"\"msg\":\"success\"}";
        }
        return "{\"code\":0,"+"\"msg\":\"fail\"}";
    }

    @RequestMapping("/login")
    public String login(String userName,String passWord) {
        User result = userService.findByUserName(userName);
        if(result != null) {
            if(result.getPassWord().equals(passWord)) {
                return "{\"code\":1,"+"\"data\":\""+result.getId()+"\""+"\"msg\":\"success\"}";
            }
        }
        return "{\"code\":0,"+"\"msg\":\"fail\"}";
    }
}