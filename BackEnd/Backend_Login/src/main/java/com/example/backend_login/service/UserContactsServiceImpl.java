package com.example.backend_login.service;

import com.example.backend_login.entity.UserContacts;
import com.example.backend_login.entity.dto.UserDTO;
import com.example.backend_login.repository.UserContactsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserContactsServiceImpl implements UserContactsService {

    @Autowired
    private UserContactsRepository userContactsRepository;

    @Override
    public UserContacts getUserContactsById(Integer userId) {
        return userContactsRepository.findById(userId).orElse(null);
    }

    @Override
    public UserContacts saveUserContacts(UserDTO userContacts) {
        UserContacts userPojo=new UserContacts();
        BeanUtils.copyProperties(userContacts,userPojo);
        return userContactsRepository.save(userPojo);
    }

    @Override
    public UserContacts updateUserContacts(Integer userId, UserContacts userContacts) {
        UserContacts existingUserContacts = userContactsRepository.findById(userId).orElse(null);
        if (existingUserContacts == null) {
            return null;
        }
        userContacts.setUserId(userId); // 确保设置正确的用户ID
        return userContactsRepository.save(userContacts);
    }

    @Override
    public boolean deleteUserContacts(Integer userId) {
        UserContacts existingUserContacts = userContactsRepository.findById(userId).orElse(null);
        if (existingUserContacts == null) {
            return false;
        }
        userContactsRepository.deleteById(userId);
        return true;
    }
}



