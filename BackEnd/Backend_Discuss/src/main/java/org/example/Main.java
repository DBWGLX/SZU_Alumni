package org.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.example.entity.Post;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.*;

@SpringBootApplication
@MapperScan("org.example.mapper")
public class Main {


    public static void main(String[] args) {

        SpringApplication.run(Main.class,args);

    }
}