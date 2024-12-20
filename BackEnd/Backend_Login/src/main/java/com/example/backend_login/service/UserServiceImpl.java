package com.example.backend_login.service;

import com.example.backend_login.entity.User;
import com.example.backend_login.entity.UserContacts;
import com.example.backend_login.entity.UserInfo;
import com.example.backend_login.entity.UserPrivacy;
import com.example.backend_login.entity.dto.UserDTO;
import com.example.backend_login.repository.UserContactsRepository;
import com.example.backend_login.repository.UserInfoRepository;
import com.example.backend_login.repository.UserPrivacyRepository;
import com.example.backend_login.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    private UserContactsRepository userContactsRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private UserPrivacyRepository userPrivacyRepository;
    /**
     * 增加用户
     */
    @Override
    public void add(UserDTO user) {
        User userPojo=new User();
        BeanUtils.copyProperties(user,userPojo);
        userRepository.save(userPojo);
    }
    @Transactional
    public void saveUserAllInfo(UserDTO user) {
        //openid校验，如果数据库里已有重复的openid，将不会存入信息并抛出异常
        Optional<User> existingUser = userRepository.findByOpenid(user.getOpenid());
        if (existingUser.isEmpty()) {
            User userPojo=new User();//创建User
            BeanUtils.copyProperties(user,userPojo);

            UserContacts userContactsPojo=new UserContacts();//创建UserContacts
            BeanUtils.copyProperties(user,userContactsPojo);

            UserInfo userInfoPojo=new UserInfo();
            BeanUtils.copyProperties(user,userInfoPojo);

            UserPrivacy userPrivacyPojo=new UserPrivacy();
            BeanUtils.copyProperties(user,userPrivacyPojo);

            User savedUser = userRepository.save(userPojo);
            userContactsPojo.setUser(savedUser);
            userInfoPojo.setUser(savedUser);
            userPrivacyPojo.setUser(savedUser);
            userContactsRepository.save(userContactsPojo);
            userInfoRepository.save(userInfoPojo);
            userPrivacyRepository.save(userPrivacyPojo);
        } else {
            // 抛出异常提示用户openid已存在
            throw new IllegalArgumentException("Openid already exists");
        }
    }
    /**
     * 删除用户
     */
    @Override
    public void delete(Integer id){
        userRepository.deleteById(id);
    }

    /**
     * 更新用户
     */
    @Override
    public void set(UserDTO user){
        User userpojo =new User();
        BeanUtils.copyProperties(user,userpojo);
        userRepository.save(userpojo);
    }

    public User get(Integer id){
        return userRepository.findById(id).orElseThrow(()->{
            try {
                throw new IllegalAccessException("查询失败");
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        });
    }
    @Override
    public Map<String, Object> getNameImageurlByid(Integer id){
        Map resultmap=new HashMap<>();
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()){
            User user=optionalUser.get();
            resultmap.put("username",user.getUsername());
            resultmap.put("image_url",user.getAvatar_path());
        }
        return resultmap;
    }
    //返回用户状态

    @Override
    public Integer returnStatus(String openid){
        Optional<User> optionalUser = userRepository.findByOpenid(openid);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Byte temp = user.getIs_verified();
            if(temp==2){
                return 2;
            }else if(temp==3){
                return 3;
            }else return 1;
        }
        return 0;
    }
}
