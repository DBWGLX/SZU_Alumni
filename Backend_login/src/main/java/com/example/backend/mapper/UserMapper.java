package com.example.backend.mapper;

import com.example.backend.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper

public interface UserMapper {

    @Select("SELECT * FROM user WHERE id = #{id}")
    User selectUserById(@Param("id") int id);

    @Select("SELECT * FROM user")
    List<User> selectAllUsers();

    int insertUser(User user);

    int updateUser(User user);

    int deleteUserById(@Param("id") int id);
    @Select("SELECT name, image_url FROM user WHERE id = #{id}")
    User selectNameAndImageUrlById(@Param("id") int id);
}