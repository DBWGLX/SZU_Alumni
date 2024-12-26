package org.example.service;

import org.example.entity.Comment;
import org.example.entity.User;
import org.example.mapper.CommentMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CommentService {
    private  final CommentMapper commentMapper;
    public final String source = "discuss"+ File.separator +"comment";

    @Autowired
    public CommentService(CommentMapper com){
        this.commentMapper = com;
        File file = new File(source);
        if(!file.exists()){
            file.mkdirs();
        }
    }
    String getSource(long id){
        //储存路径加上帖子id，在加上后缀
        return source + File.separator + id + "_comment.json";
    }
    //计算一个帖子的评论数量
    public int getCommentsNum(long p_id){
        return commentMapper.CountComments(p_id);

    }
    //读取一个帖子的所有评论
    public JSONArray getComment(Long id){
        String FILE_PATH = getSource(id);
        try {
            // 读取文件内容
            String content = new String(Files.readAllBytes(Paths.get(FILE_PATH)));
            JSONArray jsonArray = new JSONArray(content);
            System.out.println("评论读取"+content);
            return jsonArray;
            } catch (IOException e) {
            e.printStackTrace();
            System.out.println("评论"+id+"读取失败");
        }
        return null;
    }


    //插入评论
    public long insert(String text, long p_id, long u_id, LocalDateTime time){
        Comment a = new Comment();
        a.setTime(time);
        a.setP_id(p_id);
        a.setU_id(u_id);
        commentMapper.insert(a);
        //储存路径加上帖子id，在加上后缀
        String FILE_PATH = getSource(p_id);
        File file = new File(FILE_PATH);
        if(!file.exists()){
            try {
                file.createNewFile();
                System.out.println("创建评论 "+p_id+" 文件成功");
            }catch (IOException e){
                System.out.println("评论文件 "+p_id+" 创建失败");
            }
        }
        try {
            // 读取文件内容
            String content = new String(Files.readAllBytes(Paths.get(FILE_PATH)));
            JSONArray jsonArray;
            if(content.isEmpty())
                jsonArray = new JSONArray();
            else
                jsonArray = new JSONArray(content);
            // 向数组末尾添加新记录
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // 使用 DateTimeFormatter 格式化 LocalDateTime 对象
            String formattedDate = a.getTime().format(formatter);
            JSONObject newRecord = new JSONObject();
            newRecord.put("id",a.getId());
            newRecord.put("u_id",a.getU_id());
            newRecord.put("dateReputation",formattedDate);
            //获取用户信息
            String[] user = User.getUser(a.getId());
            if(user == null){
                System.out.println("评论用户信息获取失败");
            }
            else{
                newRecord.put("detailName",user[0]);
                newRecord.put("detailPic",user[1]);
            }
            newRecord.put("detailContent",text);
            jsonArray.put(newRecord);

            // 将更新后的内容写回文件
            try (FileWriter fileWriter = new FileWriter(FILE_PATH)) {
                fileWriter.write(jsonArray.toString(4)); // 格式化输出
            }
        } catch (IOException e) {
            System.out.println("评论\""+ text+"\"写入失败,帖子id:"+p_id);
            e.printStackTrace();
        }
        return a.getId();
    }

    //删除一个帖子的全部评论
    public void deleteAll(long p_id){
        commentMapper.deleteCommentByPostId(p_id);
        String path = getSource(p_id);
        File file = new File(path);
        if(file.delete()){
            System.out.println("帖子"+p_id+"评论删除成功");
        }else{
            System.out.println("帖子"+p_id+"评论删除失败");
        }
    }
    //删除id所属评论
    public void delete(long id){
        commentMapper.deleteCommentById(id);
        String FILE_PATH = getSource(id);
        try {
            // 读取文件内容
            String content = new String(Files.readAllBytes(Paths.get(FILE_PATH)));
            JSONArray jsonArray = new JSONArray(content);

            // 查找并删除记录
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject record = jsonArray.getJSONObject(i);
                if (Long.parseLong(record.getString("id"))==id) {
                    jsonArray.remove(i);
                    break;
                }
            }
            // 将更新后的内容写回文件
            try (FileWriter fileWriter = new FileWriter(FILE_PATH)) {
                fileWriter.write(jsonArray.toString(4)); // 格式化输出
                System.out.println("评论"+id+"删除成功");
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("评论"+id+"删除失败");
        }

    }
}
