package org.example.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.entity.Post;
import org.example.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;
import java.io.File;

@Service
public class PostService {
    //帖子数据储存路径
    public final String source = "discuss";
    //帖子的评论数据储存路径
    private final PostMapper postMapper;
    //帖子数据的实体
    private static List<Post> posts = null;
    @Autowired
    public PostService(PostMapper postMapper) {
        this.postMapper = postMapper;
        posts = postMapper.findAll();
        File file = new File(source);
        if(!file.exists()){
            file.mkdirs();
        }
    }
    public Map<String,Object> getText(long id){
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = new HashMap<>();
        try {
            // 读取JSON文件并转换成Map<String, Object>
            map = objectMapper.readValue(getPostText(id), Map.class);
            //成功说明文章被访问了一次
            postMapper.updateVisits(id);
            // 打印Map内容
            // System.out.println(map);
        } catch (IOException e) {
            System.out.println("帖子正文获取失败");
            e.printStackTrace();
        }
        return map;
    }
    public File getPostImage(long id){
        return new File(source+File.separator+id);
    }
    public File getPostText(long id){
        return new File(source+File.separator+id+"_text.json");
    }

    public List<Post> search(String key){
        return postMapper.search("%"+key+"%");
    }
    public List<Post> randomFind(int i){
        if(i >= posts.size())return posts;
        int max = posts.size() - 1;
        List<Post> a = new ArrayList<>();
        Random ran = new Random();
        HashSet<Integer> b = new HashSet<Integer>();

        //正态分布随机采样，靠近0的是最新的，
        //为了满足新的比较多，老的比较少而采用正态分布
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

    public long createPost(Post post, List<String> imagesData, String text)  {
        System.out.println("开始插入");
        long a = insert(post);
        // 创建ObjectMapper实例
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        // 创建JSON数据
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("Post_id", post.getId());
        jsonMap.put("text", text);
        jsonMap.put("user_id", post.getUser_id());
        jsonMap.put("Date", post.getDate());
        jsonMap.put("title", post.getTitle());
        List<Map<String, String>> imageList = new ArrayList<>();
        for (String imageDate : imagesData) {
            Map<String, String> imageMap = new HashMap<>();
            imageMap.put("imageData", imageDate);
            imageList.add(imageMap);
        }
        jsonMap.put("images", imageList);

        // 创建JSON文件
        File jsonFile = getPostText(a);
        try {
            System.out.println("开始写入JSON :"+a);
            objectMapper.writeValue(jsonFile, jsonMap);
            System.out.println("正文JSON写入成功");
        } catch (IOException e) {
            System.err.println("写入JSON文件时出错: " + e.getMessage());
            jsonFile.delete();
            deletePostById(a);
        }
        // 创建首页照片
        File imageFile = getPostImage(a);
        try (FileOutputStream fos = new FileOutputStream(imageFile)) {
            fos.write(imagesData.get(0).getBytes());
            System.out.println("首页图片写入成功");
        }catch (Exception e){
            System.out.println("首页图片写入失败");
            imageFile.delete();
            jsonFile.delete();
            deletePostById(a);
        }
        return a;
    }
}