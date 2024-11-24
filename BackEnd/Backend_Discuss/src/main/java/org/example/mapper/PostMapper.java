package org.example.mapper;
import org.example.entity.Post;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface PostMapper {
    @Select("SELECT * FROM Posts ORDER BY date DESC")
    List<Post> findAll();
    @Delete("DELETE FROM Posts WHERE id = #{id}")
    void deletePostById(@Param("id") long id);
    @Insert("INSERT INTO Posts(title, u_id,date)" +
            " VALUES(#{post.title},#{post.user_id}, #{post.date})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insert(@Param ("post")Post post);


    @Select("SELECT * FROM Posts " +
            "WHERE u_id = #{id} " +
            "ORDER BY date DESC")
    List<Post> selectByUser_Id(@Param("id")long id);
}
