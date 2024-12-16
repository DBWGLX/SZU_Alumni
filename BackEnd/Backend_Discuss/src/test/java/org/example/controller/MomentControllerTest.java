package org.example.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;

class MomentControllerTest {
    private MockMvc mockMvc;

    @Mock
    private CommentController commentController;

    @InjectMocks
    private MomentController commentMomentController;
    @Test
    void postMoment() {
    }

    @Test
    void randomMoment() {
    }

    @Test
    void searchMoment() {
    }

    @Test
    void searchMomentById() {
    }

    @Test
    void searchMomentByUser() {
    }

    @Test
    void getMomentComments() throws Exception {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(commentMomentController).build();
        // 准备测试数据
        Long disId = 100L;
        Long id = 1L;
        LocalDateTime time = LocalDateTime.of(2023, 10, 10, 10, 0);
        // 模拟commentController.getComment方法的返回值
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("comment", "这是一个评论");
        jsonObject.put("userId", 1);
        jsonArray.put(jsonObject);

        when(commentController.getComment(disId)).thenReturn(jsonArray);
        // 执行测试
        mockMvc.perform(MockMvcRequestBuilders.get("/discuss/list/detail")
                        .param("disId", disId.toString())
                        .param("id", id.toString())
                        .param("time", time.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].comment").value("这是一个评论"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].userId").value(1));

        // 验证commentController.getComment方法被调用
        verify(commentController, times(1)).getComment(disId);
    }

    @Test
    void commentMoment() throws Exception {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(commentMomentController).build();
        // 准备测试数据
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("id", "1");
        requestBody.put("time", "2023-10-10T10:00:00");
        requestBody.put("detail", "这是一个评论");
        requestBody.put("disId", "100");
        // 模拟commentController.insert方法的返回值
        when(commentController.insert("这是一个评论", 100L, 1L)).thenReturn(123L);
        // 执行测试
        mockMvc.perform(MockMvcRequestBuilders.post("/discuss/detail")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestBody)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value("true"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.discus").value("123"));
        // 验证commentController.insert方法被调用
        verify(commentController, times(1)).insert("这是一个评论", 100L, 1L);
    }
}