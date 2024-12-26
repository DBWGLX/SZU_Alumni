package com.example.backend_login.repository;

import com.example.backend_login.entity.User;
import com.example.backend_login.entity.UserPrivacy;
import org.springframework.data.repository.CrudRepository;

public interface UserPrivacyRepository extends CrudRepository<UserPrivacy,Integer> {
    void deleteByUser(User user);
}
