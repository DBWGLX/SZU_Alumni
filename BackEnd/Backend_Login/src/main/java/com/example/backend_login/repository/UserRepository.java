package com.example.backend_login.repository;

import com.example.backend_login.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
    @Query("SELECT u FROM User u WHERE u.Openid = :openid")
    Optional<User> findByOpenid(@Param("openid") String openid);
}
