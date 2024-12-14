package com.example.backend_login.controller;

import com.example.backend_login.entity.UserInfo;
import com.example.backend_login.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 处理与用户信息相关的HTTP请求的控制器类。
 */
@RestController
@RequestMapping("/api/userInfo")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    /**
     * 根据用户ID获取特定用户的详细信息。
     *
     * @param userId 要检索详细信息的用户的ID。
     * @return 如果找到，则返回包含UserInfo对象的ResponseEntity，
     *         如果未找到，则返回404 Not Found响应。
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserInfo> getUserInfo(@PathVariable Integer userId) {
        UserInfo userInfo = userInfoService.getUserInfoById(userId);
        if (userInfo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userInfo);
    }

    /**
     * 创建并保存新的用户详细信息。
     *
     * @param userInfo 包含要保存的详细信息的UserInfo对象。
     * @return 包含已保存UserInfo对象的ResponseEntity。
     */
    @PostMapping("/")
    public ResponseEntity<UserInfo> createUserInfo(@RequestBody UserInfo userInfo) {
        UserInfo savedUserInfo = userInfoService.saveUserInfo(userInfo);
        return ResponseEntity.ok(savedUserInfo);
    }

    /**
     * 更新现有用户的详细信息。
     *
     * @param userId   要更新的用户的ID。
     * @param userInfo 包含要更新的详细信息的UserInfo对象。
     * @return 如果成功更新，则返回包含已更新UserInfo对象的ResponseEntity，
     *         如果未找到用户，则返回404 Not Found响应。
     */
    @PutMapping("/{userId}")
    public ResponseEntity<UserInfo> updateUserInfo(@PathVariable Integer userId, @RequestBody UserInfo userInfo) {
        UserInfo updatedUserInfo = userInfoService.updateUserInfo(userId, userInfo);
        if (updatedUserInfo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUserInfo);
    }

    /**
     * 删除特定用户的详细信息。
     *
     * @param userId 要删除的用户的ID。
     * @return 如果删除成功，则返回204 No Content响应，
     *         如果未找到用户，则返回404 Not Found响应。
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUserInfo(@PathVariable Integer userId) {
        boolean isDeleted = userInfoService.deleteUserInfo(userId);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}



