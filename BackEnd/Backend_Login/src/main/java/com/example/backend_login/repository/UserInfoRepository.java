package com.example.backend_login.repository;

import com.example.backend_login.entity.User;
import com.example.backend_login.entity.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends CrudRepository<UserInfo,Integer> {
    void deleteByUser(User user);
}
