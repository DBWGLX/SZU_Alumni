package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.IUserService;
import com.example.backend.utils.WechatUtils;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpiration;

    @PostMapping("/wechat/login")
    public Map<String, Object> wechatLogin(@RequestParam String code) {
        // 调用微信接口获取用户信息
        Map<String, Object> userInfo = WechatUtils.getUserInfoByCode(code);
        if (userInfo == null) {
            return Map.of("success", false, "message", "微信登录失败");
        }

        // 检查用户是否已存在
        String openId = (String) userInfo.get("openId");
        User existingUser = userService.getUserByOpenId(openId);

        if (existingUser == null) {
            // 注册新用户
            User newUser = new User();
            newUser.setName((String) userInfo.get("nickname"));
            newUser.setSex((String) userInfo.get("gender"));
            newUser.setImage_url((String) userInfo.get("avatarUrl"));
            newUser.setOpenId(openId);
            existingUser = userService.registerUser(newUser);
        }

        // 生成 JWT token
        String token = generateJwtToken(existingUser);

        // 返回用户信息和 token
        return Map.of("success", true, "user", existingUser, "token", token);
    }

    private String generateJwtToken(User user) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // 创建 JWT token
        return Jwts.builder()
                .setSubject(user.getOpenId())
                .setIssuedAt(now)
                .setExpiration(new Date(nowMillis + jwtExpiration * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

}