package com.iamvickyav.springboot.SpringBootRestWithH2.service;

import com.iamvickyav.springboot.SpringBootRestWithH2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserService extends JpaRepository<User, Integer> {

    User findByUserName(String username);
}
