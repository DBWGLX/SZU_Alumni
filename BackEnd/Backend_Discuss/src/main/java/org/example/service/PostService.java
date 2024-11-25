package org.example.service;

import org.example.entity.Post;
import org.example.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
public class PostService {
    public final String source = "discuss";
    private final PostMapper postMapper;
    @Autowired
    public PostService(PostMapper postMapper) {
        this.postMapper = postMapper;
    }
    public File getPostImage(long id){
        return new File(source+File.separator+id);
    }
    public File getPostText(long id){
        return new File(source+File.separator+id+"_text.json");
    }
    public List<Post> findAll() {
        return postMapper.findAll();
    }
    public List<Post> getPostByUser(long id){return postMapper.selectByUser_Id(id);}
    public void deletePostById(long id){
        //帖子存储分为帖子正文加图片部分和单独的首页图片部分，还有评论部分，不过初版还没有
        File file = getPostText(id);
        File image = getPostImage(id);
        //为评论删除预留

        postMapper.deletePostById(id);
        if(file.exists()){
            if(file.delete()){
                System.out.println("帖子"+id+"删除成功");
            }else{
                System.out.println("帖子删除失败");
            }
        }else{
            System.out.println("删除的帖子" +id+"不存在");
        }
        if(image.exists()){
            if(image.delete()){
                System.out.println("帖子首页图片"+id+"删除成功");
            }else{
                System.out.println("帖子图片删除失败");
            }
        }else{
            System.out.println("删除的帖子图片" +id+"不存在");
        }
    }
    public long insert(Post post) {
        postMapper.insert(post);
        System.out.println("数据库插入成功");
        return post.getId();
    }
}