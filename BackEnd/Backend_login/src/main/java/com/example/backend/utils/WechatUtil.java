package com.example.backend.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

public class WechatUtils {

    private static final String WECHAT_LOGIN_URL = "https://api.weixin.qq.com/sns/jscode2session";

    public static Map<String, Object> getUserInfoByCode(String code) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String appId = "wx6ccf9c08602e6586";
        String appSecret = "1d58bf712da3d8ad7e92c9667a907fdd";

        String url = WECHAT_LOGIN_URL + "?appid=" + appId + "&secret=" + appSecret + "&js_code=" + code + "&grant_type=authorization_code";

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> result = objectMapper.readValue(response.getBody(), HashMap.class);
                if (result.containsKey("openid")) {
                    // 模拟用户信息
                    Map<String, Object> userInfo = new HashMap<>();
                    userInfo.put("openId", result.get("openid"));
                    userInfo.put("unionid", result.get("unionid")); // 如果有 UnionID
                    userInfo.put("nickname", "微信用户"); // 从微信接口获取昵称
                    userInfo.put("gender", "男"); // 从微信接口获取性别
                    userInfo.put("avatarUrl", "https://example.com/avatar.jpg"); // 从微信接口获取头像URL
                    return userInfo;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}