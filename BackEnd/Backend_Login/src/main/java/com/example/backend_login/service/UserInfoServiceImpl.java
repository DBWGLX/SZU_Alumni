package com.example.backend_login.service.impl;

import com.example.backend_login.entity.UserInfo;
import com.example.backend_login.repository.UserInfoRepository;
import com.example.backend_login.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public UserInfo getUserInfoById(Integer userId) {
        return userInfoRepository.findById(userId).orElse(null);
    }

    @Override
    public UserInfo saveUserInfo(UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }

    @Override
    public UserInfo updateUserInfo(Integer userId, UserInfo userInfo) {
        UserInfo existingUserInfo = userInfoRepository.findById(userId).orElse(null);
        if (existingUserInfo == null) {
            return null;
        }
        userInfo.setUserId(userId); // 确保设置正确的用户ID
        return userInfoRepository.save(userInfo);
    }

    @Override
    public boolean deleteUserInfo(Integer userId) {
        UserInfo existingUserInfo = userInfoRepository.findById(userId).orElse(null);
        if (existingUserInfo == null) {
            return false;
        }
        userInfoRepository.deleteById(userId);
        return true;
    }
}



