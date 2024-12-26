package com.example.backend_login.entity;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ResponseMessage<T> {
    private Integer code;
    private String message;
    private T data;

    public ResponseMessage(Integer code, String message,T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    public static <T> ResponseMessage<T> success(T data){
        return new ResponseMessage<>(HttpStatus.OK.value(),"success",data);
    }
    public static <T> ResponseMessage<T> failed(T data){
        return new ResponseMessage<>(HttpStatus.FAILED_DEPENDENCY.value(),"failed",data);
    }
}
