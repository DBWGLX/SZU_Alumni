package org.example.entity;

import java.time.LocalDateTime;

public class Comment {
    //评论id，主键
    private long id;
    //用户id
    private long u_id;
    //帖子id
    private long p_id;
    private LocalDateTime time;
    public void setId(long id){this.id = id;}
    public void setU_id(long id){this.u_id = id;}
    public void setP_id(long id){this.p_id = id;}

    public long getId(){return id;}
    public long getU_id(){return u_id;}
    public long getP_id(){return p_id;}
    public LocalDateTime getTime(){return time;}
    public void setTime(LocalDateTime t){this.time = t;}

}
