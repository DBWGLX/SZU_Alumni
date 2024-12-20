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
    @Insert("INSERT INTO Posts(title, u_id,date,visits,subtext)" +
            " VALUES(#{post.title},#{post.user_id}, #{post.date},#{post.visits},#{post.subtext})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insert(@Param ("post")Post post);
    @Update("UPDATE posts SET visits = visits + 1 WHERE id = #{id}")
    void updateVisits(@Param("id") long id);
    @Select("SELECT * FROM Posts " +
            "WHERE title LIKE #{text} " +
            "ORDER BY date DESC")
    List<Post> search(@Param("text")String text);
    @Select("SELECT * FROM Posts " +
            "WHERE u_id = #{id} " +
            "ORDER BY date DESC")
    List<Post> selectByUser_Id(@Param("id")long id);
}
