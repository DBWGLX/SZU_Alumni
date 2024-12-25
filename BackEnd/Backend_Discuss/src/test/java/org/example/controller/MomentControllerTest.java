package org.example.controller;

import org.json.JSONArray;
import org.json.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.HashMap;
import java.util.Map;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;

@SpringBootTest
@AutoConfigureMockMvc
class MomentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    @Mock
    private CommentController commentController;

    @InjectMocks
    private MomentController commentMomentController;
    @Test
    public void testPostMoment() throws Exception {
        // 构建请求内容
        Map<String, Object> content = new HashMap<>();
        content.put("id", "1");
        content.put("time", "2023-10-10T10:10:10");
        content.put("detailTop", "发帖标题");
        content.put("detailAll", "发帖内容正文");
        content.put("dePic", new String[]{"图片1的Base64编码", "图片2的Base64编码"});

        // 将请求内容转换为 JSON 字符串
        String jsonContent = objectMapper.writeValueAsString(content);

        // 执行 POST 请求并验证响应
        mockMvc.perform(post("/list")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.discus").isNotEmpty());
    }


    @Test
    public void testDeleteMoment() throws Exception {
        // 构建请求内容
        Map<String, Object> content = new HashMap<>();
        content.put("id", "1");
        content.put("time", "2023-10-10T10:10:10");
        content.put("disId", "123");

        // 将请求内容转换为 JSON 字符串
        String jsonContent = objectMapper.writeValueAsString(content);

        // 执行 DELETE 请求并验证响应
        mockMvc.perform(delete("/list")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value("true"));
    }


    @Test
    public void testRandomMoment() throws Exception {
        int num = 5; // 需要的动态数量

        // 执行 GET 请求并验证响应
        mockMvc.perform(get("/list/random")
                        .param("num", String.valueOf(num))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.article").isArray())
                .andExpect(jsonPath("$.num").isNumber());
    }


    @Test
    public void testSearchMomentById() throws Exception {
        long id = 1L; // 帖子id
        LocalDateTime time = LocalDateTime.now(); // 当前时间

        // 执行 GET 请求并验证响应
        mockMvc.perform(get("/list/text")
                        .param("id", String.valueOf(id))
                        .param("time", time.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.Post_id").value(id))
                .andExpect(jsonPath("$.text").exists());
    }

    @Test
    public void testSearchMoment() throws Exception {
        int id = 1; // 用户id
        LocalDateTime time = LocalDateTime.now(); // 当前时间
        int begin = 0; // 从哪一个开始
        int num = 5; // 要多少个

        // 执行 GET 请求并验证响应
        mockMvc.perform(get("/list")
                        .param("id", String.valueOf(id))
                        .param("time", time.toString())
                        .param("begin", String.valueOf(begin))
                        .param("number", String.valueOf(num))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].disId").exists())
                .andExpect(jsonPath("$[0].disVolume").exists())
                .andExpect(jsonPath("$[0].visits").exists())
                .andExpect(jsonPath("$[0].disContent.title").exists())
                .andExpect(jsonPath("$[0].disContent.image").exists())
                .andExpect(jsonPath("$[0].disContent.Date").exists())
                .andExpect(jsonPath("$[0].disContent.subtext").exists());
    }

    @Test
    void testGetMomentComments() throws Exception {
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
    void testCommentMoment() throws Exception {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(commentMomentController).build();
        // 准备测试数据
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("id", "1");
        requestBody.put("time", "2023-10-10T10:00:00");
        requestBody.put("detail", "这是一个评论");
        requestBody.put("disId", "100");
        LocalDateTime time = LocalDateTime.now();
        // 模拟commentController.insert方法的返回值
        when(commentController.insert("这是一个评论", 100L, 1L,time)).thenReturn(123L);
        // 执行测试
        mockMvc.perform(MockMvcRequestBuilders.post("/discuss/detail")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestBody)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.success").value("true"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.discus").value("123"));
        // 验证commentController.insert方法被调用
        verify(commentController, times(1)).insert("这是一个评论", 100L, 1L,time);
    }

    @Test
    public void testSearch() throws Exception {
        String keyword = "test"; // 搜索关键词

        // 执行 GET 请求并验证响应
        mockMvc.perform(get("/api/search")
                        .param("keyword", keyword)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.msg").value("搜索成功"))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].disId").exists())
                .andExpect(jsonPath("$.data[0].disVolume").exists())
                .andExpect(jsonPath("$.data[0].visits").exists())
                .andExpect(jsonPath("$.data[0].disContent.title").exists())
                .andExpect(jsonPath("$.data[0].disContent.image").exists())
                .andExpect(jsonPath("$.data[0].disContent.Date").exists())
                .andExpect(jsonPath("$.data[0].disContent.subtext").exists());
    }

}

