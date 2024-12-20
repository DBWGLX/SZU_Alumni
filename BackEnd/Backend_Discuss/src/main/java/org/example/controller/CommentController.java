package org.example.controller;

import org.example.service.CommentService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Controller
public class CommentController {

    private final CommentService commentService;
    @Autowired
    public CommentController(CommentService com){
        this.commentService = com;
    }
    public int getCommentsNum(long id){
        return commentService.getCommentsNum(id);
    }
    public JSONArray getComment(Long id){
        return commentService.getComment(id);
    }
    public long insert(String text, long p_id, long u_id, LocalDateTime time){
        return commentService.insert(text,p_id,u_id,time);
    }
    public void deleteAll(long p_id){commentService.deleteAll(p_id);}

    public void delete(long p_id){commentService.delete(p_id);}

}
