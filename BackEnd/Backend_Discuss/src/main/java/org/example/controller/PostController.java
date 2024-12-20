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
    public List<Post> search(String key){
        return postService.search(key);
    }
    public long createPost(Post post, List<String> imagesData, String text){
        return postService.createPost(post,imagesData,text);
    }
    public Map<String,Object> getText(long id){
        return postService.getText(id);
    }
    public void delete(long id){
        postService.deletePostById(id);
    }
}