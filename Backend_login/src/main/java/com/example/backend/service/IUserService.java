package com.example.backend.service;

import com.example.backend.entity.User;

import java.util.List;

public interface IUserService {

    User getUserById(int id);

    List<User> getAllUsers();

    User saveUser(User user);

    User updateUser(User user);

    void deleteUserById(int id);


    User getUserNameAndImageUrlById(int id);
}