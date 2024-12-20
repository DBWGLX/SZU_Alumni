package org.example.mapper;

import org.apache.ibatis.annotations.*;
import org.example.entity.Comment;
import org.example.entity.Post;

import java.util.List;

@Mapper
public interface CommentMapper {
    @Select("SELECT COUNT(*) FROM Comments Where p_id = #{id}")
    int CountComments(@Param("id")long id);
    @Delete("DELETE FROM Comments WHERE p_id = #{id}")
    void deleteCommentByPostId(@Param("id") long id);
    @Delete("DELETE FROM Comments WHERE id = #{id}")
    void deleteCommentById(@Param("id") long id);
    @Insert("INSERT INTO Comments(u_id,p_id,time)" +
            " VALUES(#{comment.u_id},#{comment.p_id},#{comment.time})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insert(@Param ("comment") Comment comment);


    @Select("SELECT * FROM Comments " +
            "WHERE u_id = #{id} " +
            "ORDER BY date DESC")
    List<Comment> selectByUser_Id(@Param("id")long id);
}
