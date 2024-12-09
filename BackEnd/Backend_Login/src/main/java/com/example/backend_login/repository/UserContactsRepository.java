package com.example.backend_login.repository;

import com.example.backend_login.entity.UserPrivacy;
import org.springframework.data.repository.CrudRepository;

public interface UserContactsRepository extends CrudRepository<UserPrivacy,Integer> {
}
