package org.example.service;

import org.example.entity.Post;
import org.example.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Random;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    public final String source = "discuss";
    private final PostMapper postMapper;

    private static List<Post> posts = null;
    @Autowired
    public PostService(PostMapper postMapper) {
        this.postMapper = postMapper;
        posts = postMapper.findAll();
    }
    public File getPostImage(long id){
        return new File(source+File.separator+id);
    }
    public File getPostText(long id){
        return new File(source+File.separator+id+"_text.json");
    }

    public List<Post> randomFind(int i){
        if(i >= posts.size())return posts;
        int max = posts.size() - 1;
        List<Post> a = new ArrayList<>();
        Random ran = new Random();
        HashSet<Integer> b = new HashSet<Integer>();

        //正态分布随机采样，靠近0的是最新的，
        while(b.size() < i){
            double ga = ran.nextGaussian();
            if(ga<=-3 || ga >= 3)continue;
            if(ga < 0)ga = ga*(-1);
            int id = (int) (max *(ga)/3);
            b.add(id);
        }
        for (int p : b){
            a.add(posts.get(p));
        }


        return a;
    }

    public List<Post> findAll() {
        return posts;
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
        //更新列表
        posts = postMapper.findAll();
    }
    public long insert(Post post) {
        postMapper.insert(post);
        System.out.println("数据库插入成功");
        //更新列表
        posts.add(0,post);
        return post.getId();
    }
}