package com.example.backend_login.service;

import com.example.backend_login.entity.UserPrivacy;
import com.example.backend_login.entity.dto.UserDTO;
import com.example.backend_login.repository.UserPrivacyRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPrivacyServiceImpl implements UserPrivacyService {

    @Autowired
    private UserPrivacyRepository userPrivacyRepository;

    @Override
    public UserPrivacy getUserPrivacyById(Integer userId) {
        return userPrivacyRepository.findById(userId).orElse(null);
    }

    @Override
    public UserPrivacy saveUserPrivacy(UserDTO userPrivacy) {
        UserPrivacy userPojo=new UserPrivacy();
        BeanUtils.copyProperties(userPrivacy,userPojo);
        return userPrivacyRepository.save(userPojo);
    }

    @Override
    public UserPrivacy updateUserPrivacy(Integer userId, UserPrivacy userPrivacy) {
        UserPrivacy existingUserPrivacy = userPrivacyRepository.findById(userId).orElse(null);
        if (existingUserPrivacy == null) {
            return null;
        }
        userPrivacy.setUserId(userId); // 确保设置正确的用户ID
        return userPrivacyRepository.save(userPrivacy);
    }

    @Override
    public boolean deleteUserPrivacy(Integer userId) {
        UserPrivacy existingUserPrivacy = userPrivacyRepository.findById(userId).orElse(null);
        if (existingUserPrivacy == null) {
            return false;
        }
        userPrivacyRepository.deleteById(userId);
        return true;
    }
}