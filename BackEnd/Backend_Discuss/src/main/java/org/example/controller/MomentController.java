package org.example.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.example.entity.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/discuss")
@Api(tags = "Moment API", description = "提供动态相关的API")
public class MomentController {
    private final PostController postcontroller;
    private static List<Post> posts = null;
    private final CommentController commentController;
    private static LocalDateTime cnt_time = LocalDateTime.now();
    @Autowired
    public MomentController(PostController postcontroller,CommentController com) {
        this.commentController = com;
        this.postcontroller = postcontroller;
    }
    @PostMapping("/list")
    @ApiOperation(value = "发布动态", notes = "发布动态api, 前端通过传输动态内容给后端,后端返回发布结果")
    public Map<String, String> postMoment(
            @RequestBody @ApiParam(value = "动态内容 JSON 格式", required = true,example = "{\n" +
                    "  \"id\": \"用户id\",\n" +
                    "  \"time\": \"当前时间戳\",\n" +
                    "  \"detailTop\": \"发帖标题\",\n" +
                    "  \"detailAll\": \"发帖内容正文\",\n" +
                    "  \"dePic\": \"发帖照片\"\n" +
                    "}") Map<String, Object> content) {
        //设置要存到数据库中的内容
        Post a = new Post();
        a.setUser_id(Long.parseLong(content.get("id").toString()));
        a.setDate(LocalDateTime.parse(content.get("time").toString()));
        a.setTitle(content.get("detailTop").toString());
        String text = content.get("detailAll").toString();
        //提取正文前30个字符
        if(text.length() < 30){
            a.setSubtext(text);
        }else{
            a.setSubtext(text.substring(0,29));
        }

        // 提取图片数组
        List<String> dePicBase64List = new ArrayList<>();
        if (content.get("dePic") instanceof List<?>) {
            for (Object obj : (List<?>) content.get("dePic")) {
                if (obj instanceof String) {
                    dePicBase64List.add((String) obj);
                }
            }
        }
//        List<byte[]> dePicDataList = new ArrayList<>();
//        for(String dePicBase64:dePicBase64List){
//            byte[] dePicData = Base64.getDecoder().decode(dePicBase64);
//            dePicDataList.add(dePicData);
//        }
        long id = 0;

        //插入数据库并返回数据库中的id
        id = postcontroller.createPost(a, dePicBase64List, text);
        Map<String, String> response = new HashMap<>();


        response.put("success", "true");
        response.put("discus",String.valueOf(id));
        return response;
    }

    @DeleteMapping("/list")
    @ApiOperation(value = "删除动态", notes = "删除动态api, 删除一个帖子及其附带的所有评论,后端返回删除结果")
    public Map<String, String> deleteMoment(
            @RequestBody @ApiParam(value = "需要删除的动态信息 JSON 格式", required = true,example = "{\n" +
                    "  \"id\": \"用户id\",\n" +
                    "  \"time\": \"当前时间\",\n" +
                    "  \"disId\": \"帖子id\"\n" +
                    "}") Map<String,Object> body) {
        long id = Long.parseLong(body.get("disId").toString());
        //删除帖子
        postcontroller.delete(id);

        //删除评论
        commentController.deleteAll(id);

        Map<String, String> response = new HashMap<>();
        response.put("success", "true");
        return response;
    }
    @GetMapping("/list/random")
    @ApiOperation(value = "获取随机动态", notes = "获取随机动态api, 返回一个符合正态分布的帖子列表，最新的几率大，老的几率小.需要注意，如果获取的数量超过帖子总量，将只会返回总量个数的帖子")
    public Map<String,Object> randomMoment(@ApiParam(value = "需要的动态数量", required = true,example = "{\n" +
            "num: 数量，填整数"+
            "}") @RequestParam("num") int num) {
        Map<String ,Object> res = new HashMap<>();
        List<Post> a = postcontroller.getRandomPosts(num);
        res.put("article",a);
        res.put("num",a.size());
        return res;
    }

    @GetMapping("/list")
    @ApiOperation(value = "获取动态", notes = "获取动态api,后端返回按时间排序的帖子列表")
    public List<Map<String, Object>> searchMoment(@ApiParam(value = "需要获取的动态信息，JSON 格式", required = true,example = "{\n" +
            "  \"id\": \"用户id\",\n" +
            "  \"time\": \"当前时间\",\n" +
            "  \"begin\": \"从哪一个开始\"\n" +
            "  \"number\": \"要多少个\"\n" +
            "}")@RequestParam("id") int id, @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime time, @RequestParam("begin") int begin, @RequestParam("number") int num
             ) {
        List<Map<String,Object>> response = new ArrayList<>();

        if(posts == null){
            posts = postcontroller.getPosts();
        }
        //分钟刷新一下帖子列表
        //if(LocalDateTime.now().isAfter(cnt_time)){
         //   cnt_time = cnt_time.plusMinutes(1);
            posts = postcontroller.getPosts();
       // }
        for (int i = begin; i < begin + num && i < posts.size(); i++){
            Post a = posts.get(i);
            Map<String,Object> cnt = new HashMap<>();
            cnt.put("disId",a.getId());
            String[]  user = User.getUser(a.getUser_id());
            cnt.put("visits",a.getVisits());
            if (user != null) {
                cnt.put("disName",user[0]);
                cnt.put("disPic", user[1]);
            }else{
                System.out.println("获取用户信息失败 :"+a.getUser_id());
            }
            Map<String,Object> content = new HashMap<>();
            content.put("title",a.getTitle());
            File file = postcontroller.getPostImage(a.getId());
            String cnt_image = null;
            try{
                cnt_image =new BufferedReader(new FileReader(file.toString())).readLine();
            }catch(IOException e){
                System.out.println("首页图片加载失败 :"+file.getName());
            }

            content.put("image",cnt_image);
            content.put("Date",a.getDate());
            content.put("subtext",a.getSubtext());
            cnt.put("disContent",content);
            response.add(cnt);
        }
        return response;
    }
    @GetMapping("/list/text")
    @ApiOperation(value = "获取具体的帖子正文", notes = "根据帖子id获取帖子api,后端返回帖子的正文内容")
    public Map<String, Object>searchMomentById(
            @RequestParam("id") @ApiParam(value = "需要获取的帖子,参数形式", required = true,example = "{\n" +
                    "  \"id\": \"帖子id\",\n" +
                    "  \"time\": \"当前时间\",\n" +
                    "}") long id,@RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime time) {

        Map<String,Object> response;
        response = postcontroller.getText(id);
        return response;
    }

    @GetMapping("/list/byuser")
    @ApiOperation(value = "获取某一用户动态", notes = "根据用户id获取动态api,后端返回按时间排序的帖子列表")
    public List<Map<String, Object>> searchMomentByUser(
            @RequestParam("id") @ApiParam(value = "需要获取的动态信息,参数形式", required = true,example = "{\n" +
                    "  \"id\": \"帖子id\",\n" +
                    "  \"time\": \"当前时间\",\n" +
                    "}") long id,@RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime time) {
        List<Map<String,Object>> response = new ArrayList<>();
        List<Post>posts = postcontroller.getPostsByUser(id);
        for (int i = 0; i < posts.size(); i++){
            Post a = posts.get(i);
            Map<String,Object> cnt = new HashMap<>();
            cnt.put("disId",a.getId());
            Map<String,Object> content = new HashMap<>();
            content.put("title",a.getTitle());
            File file = postcontroller.getPostImage(a.getId());
            String cnt_image = null;
            try{
                cnt_image =new BufferedReader(new FileReader(file.toString())).readLine();
            }catch(IOException e){
                System.out.println("用户帖子首页图片加载失败 :"+file.getName());
            }
            content.put("image",cnt_image);
            content.put("Date",a.getDate());
            content.put("subtext",a.getSubtext());
            content.put("visits",a.getVisits());
            cnt.put("disContent",content);
            response.add(cnt);
        }
        return response;
    }

    @GetMapping("/list/detail")
    @ApiOperation(value = "获取动态评论", notes = "获取动态评论api, 前端通过传输动态id给后端,后端返回所有评论")
    public List<Map<String,Object>> getMomentComments(
            @RequestParam("disId") @ApiParam(value = "帖子id", required = true) Long disId,
            @RequestParam("id") @ApiParam(value = "用户id", required = true) Long id,
            @RequestParam("time") @ApiParam(value = "当前时间",required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime time
    ) {
        List<Map<String,Object>> response = new ArrayList<>();
        JSONArray a = commentController.getComment(disId);
            for (int i = 0; i < a.length(); i++) {
                JSONObject jsonObject = a.getJSONObject(i);
                Map<String, Object> map = new HashMap<>();
                for (String key : jsonObject.keySet()) {
                    map.put(key, jsonObject.get(key));
                }
                response.add(map);
            }
        System.out.println("当前帖子"+disId+"\n");
        System.out.println(response);
        return response;
    }

    @PostMapping("/detail")
    @ApiOperation(value = "评论动态", notes = "评论动态api, 前端通过传输评论内容给后端,后端返回评论id")
    public Map<String, String> commentMoment(@RequestBody @ApiParam(value = "需要发布的评论信息", required = true,example = "{\n" +
            "  \"id\": \"用户id\",\n" +
            "  \"time\": \"当前时间\",\n" +
            "  \"detail\": \"评论内容\",\n" +
            "  \"disId\": \"帖子id\",\n" +
            "}") Map<String,Object> body
            ) {

        Map<String, String> response = new HashMap<>();
        String text = body.get("detail").toString();
        long id = Long.parseLong(body.get("disId").toString());
        long u_id = Long.parseLong(body.get("id").toString());
        long num = commentController.insert(text,id,u_id);
        //响应
        response.put("success", "true");
        response.put("discus",Long.toString(num));
        return response;
    }

    @DeleteMapping("/detail")
    @ApiOperation(value = "删除评论", notes = "删除评论api, 前端通过传输评论id给后端,后端返回删除结果")
    public Map<String, String> deleteComment(
            @RequestBody @ApiParam(value = "需要删除的评论信息",required = true,example = "\n +" +
                    "  \"id\": \"用户id\",\n" +
                    "  \"time\": \"当前时间\",\n" +
                    "  \"disId\": \"评论id\",\n" +
                    "")Map<String,Object> body) {
        //现在并没有对用户id进行校验

        commentController.delete(Long.parseLong(body.get("disId").toString()));

        Map<String, String> response = new HashMap<>();
        response.put("success", "true");
        return response;
    }
}