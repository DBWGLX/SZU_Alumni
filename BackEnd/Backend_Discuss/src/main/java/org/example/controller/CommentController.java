package org.example.controller;

import org.example.service.CommentService;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class CommentController {

    private final CommentService commentService;
    @Autowired
    public CommentController(CommentService com){
        this.commentService = com;
    }

    public JSONArray getComment(Long id){
        return commentService.getComment(id);
    }
    public long insert(String text,long p_id,long u_id){
        return commentService.insert(text,p_id,u_id);
    }
    public void deleteAll(long p_id){commentService.deleteAll(p_id);}

    public void delete(long p_id){commentService.delete(p_id);}

}
