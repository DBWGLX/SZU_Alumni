package com.example.backend_login.controller;

import com.example.backend_login.entity.UserPrivacy;
import com.example.backend_login.service.UserPrivacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 处理与用户隐私信息相关的HTTP请求的控制器类。
 */
@RestController
@RequestMapping("/api/userPrivacy")
public class UserPrivacyController {

    @Autowired
    private UserPrivacyService userPrivacyService;

    /**
     * 根据用户ID获取特定用户的隐私信息。
     *
     * @param userId 要检索隐私信息的用户的ID。
     * @return 如果找到，则返回包含UserPrivacy对象的ResponseEntity，
     *         如果未找到，则返回404 Not Found响应。
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserPrivacy> getUserPrivacy(@PathVariable Integer userId) {
        UserPrivacy userPrivacy = userPrivacyService.getUserPrivacyById(userId);
        if (userPrivacy == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userPrivacy);
    }

    /**
     * 创建并保存新的用户隐私信息。
     *
     * @param userPrivacy 包含要保存的隐私信息的UserPrivacy对象。
     * @return 包含已保存UserPrivacy对象的ResponseEntity。
     */
    @PostMapping("/")
    public ResponseEntity<UserPrivacy> createUserPrivacy(@RequestBody UserPrivacy userPrivacy) {
        UserPrivacy savedUserPrivacy = userPrivacyService.saveUserPrivacy(userPrivacy);
        return ResponseEntity.ok(savedUserPrivacy);
    }

    /**
     * 更新现有用户的隐私信息。
     *
     * @param userId      要更新的用户的ID。
     * @param userPrivacy 包含要更新的隐私信息的UserPrivacy对象。
     * @return 如果成功更新，则返回包含已更新UserPrivacy对象的ResponseEntity，
     *         如果未找到用户，则返回404 Not Found响应。
     */
    @PutMapping("/{userId}")
    public ResponseEntity<UserPrivacy> updateUserPrivacy(@PathVariable Integer userId, @RequestBody UserPrivacy userPrivacy) {
        UserPrivacy updatedUserPrivacy = userPrivacyService.updateUserPrivacy(userId, userPrivacy);
        if (updatedUserPrivacy == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUserPrivacy);
    }

    /**
     * 删除特定用户的隐私信息。
     *
     * @param userId 要删除的用户的ID。
     * @return 如果删除成功，则返回204 No Content响应，
     *         如果未找到用户，则返回404 Not Found响应。
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUserPrivacy(@PathVariable Integer userId) {
        boolean isDeleted = userPrivacyService.deleteUserPrivacy(userId);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}



