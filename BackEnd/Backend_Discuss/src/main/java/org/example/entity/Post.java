package org.example.entity;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class Post {
    //本帖子id
    private long id;
    //发帖人
    private long user_id;
    //标题
    private String title;
    //发帖日期
    private LocalDateTime date;
    private String subtext;

    //访问量
    int visits = 0;
    public void setId(long id){
        this.id = id;
    }
    public void up_visits(){visits++;}
    public int getVisits(){return visits;}
    public void setUser_id(long user_id){
        this.user_id = user_id;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public void setDate(LocalDateTime date){
        this.date = date;
    }
    public long getId(){
        return id;
    }
    public String getTitle(){
        return title;
    }
    public LocalDateTime getDate(){
        return date;
    }
    public void setSubtext(String text){this.subtext = text;}
    public String getSubtext(){return subtext;}

    public long getUser_id(){
        return user_id;
    }
}
