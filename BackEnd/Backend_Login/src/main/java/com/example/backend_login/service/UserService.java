package com.example.backend_login.service;


import com.example.backend_login.entity.User;
import com.example.backend_login.entity.UserContacts;
import com.example.backend_login.entity.dto.UserDTO;

import java.util.Map;

public interface UserService {
    /**
     * 插入用户
     * @param user
     */
    void add(UserDTO user);

    void saveUserAllInfo(UserDTO user);
    void delete(Integer id);

    void set(UserDTO user);

    Map<String, Object> getNameImageurlByid(Integer id);

    User get(Integer id);

    Integer returnStatus(String openid);

}
