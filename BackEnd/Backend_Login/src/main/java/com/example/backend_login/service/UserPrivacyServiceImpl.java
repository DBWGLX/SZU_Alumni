package com.example.backend_login.service.impl;

import com.example.backend_login.entity.UserPrivacy;
import com.example.backend_login.repository.UserPrivacyRepository;
import com.example.backend_login.service.UserPrivacyService;
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
    public UserPrivacy saveUserPrivacy(UserPrivacy userPrivacy) {
        return userPrivacyRepository.save(userPrivacy);
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



