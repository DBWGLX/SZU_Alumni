package org.example.controller;


import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.entity.Post;
import org.example.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@RestController
public class PostController {
    private final PostService postService;
    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    public List<Post> getPosts() {
        return postService.findAll();
    }

    public List<Post> getRandomPosts(int i){return postService.randomFind(i);}

    public List<Post> getPostsByUser(long id) {
        return postService.getPostByUser(id);
    }
    public File getPostImage(long id){
        return postService.getPostImage(id);
    }
    public File getPostText(long id){
        return postService.getPostText(id);
    }
    public long createPost(Post post, List<byte[]> imagesData, String text) throws IOException {
        System.out.println("开始插入");
        long a = postService.insert(post);
        //下面这一坨以后会放入服务层，现在暂时先这样
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
        for (byte[] imageDate : imagesData) {
            Map<String, String> imageMap = new HashMap<>();
            String imageBase64 = Base64.getEncoder().encodeToString(imageDate);
            imageMap.put("imageData", imageBase64);
            imageList.add(imageMap);
        }
        jsonMap.put("images", imageList);

        // 创建目录（如果不存在）
        File directory = new File(postService.source);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 创建JSON文件
        File jsonFile = new File(postService.source + File.separator + a + "_text.json");
        try {
            System.out.println("开始写入JSON :"+a);
            objectMapper.writeValue(jsonFile, jsonMap);
            System.out.println("正文JSON写入成功");
        } catch (IOException e) {
            System.err.println("写入JSON文件时出错: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }

        // 创建首页照片
        File imageFile = new File(postService.source + File.separator + a);
        try (FileOutputStream fos = new FileOutputStream(imageFile)) {
            fos.write(imagesData.get(0));
        }
        System.out.println("首页图片写入成功");

        return a;
    }
    public Map<String,Object> getText(long id){
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = new HashMap<>();
        try {
            // 读取JSON文件并转换成Map<String, Object>
            map = objectMapper.readValue(getPostText(id), Map.class);

            // 打印Map内容
            System.out.println(map);
        } catch (IOException e) {
            System.out.println("帖子正文获取失败");
            e.printStackTrace();
        }
        return map;
    }
    public void delete(long id){
        postService.deletePostById(id);
    }
}