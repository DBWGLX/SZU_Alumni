package com.example.backend_login.service;

import com.example.backend_login.entity.User;
import com.example.backend_login.entity.dto.UserDTO;
import com.example.backend_login.repository.UserRepository;
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

    /**
     * 增加用户
     */
    @Override
    public void add(UserDTO user) {
        User UserPojo=new User();
        BeanUtils.copyProperties(user,UserPojo);
        userRepository.save(UserPojo);
    }

    /**
     * 删除用户
     */
    @Override
    public void delete(Integer id){
        userRepository.deleteById(id);
    }

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
            resultmap.put("username",user.getUserName());
            resultmap.put("image_url",user.getImageUrl());
        }
        return resultmap;
    }
}
