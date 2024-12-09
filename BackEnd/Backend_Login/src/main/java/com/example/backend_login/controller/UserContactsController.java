package com.example.backend_login.controller;

import com.example.backend_login.entity.UserContacts;
import com.example.backend_login.service.UserContactsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 处理与用户联系信息相关的HTTP请求的控制器类。
 */
@RestController
@RequestMapping("/api/userContacts")
public class UserContactsController {

    @Autowired
    private UserContactsService userContactsService;

    /**
     * 根据用户ID获取特定用户的联系信息。
     *
     * @param userId 要检索联系信息的用户的ID。
     * @return 如果找到，则返回包含UserContacts对象的ResponseEntity，
     *         如果未找到，则返回404 Not Found响应。
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserContacts> getUserContacts(@PathVariable Integer userId) {
        UserContacts userContacts = userContactsService.getUserContactsById(userId);
        if (userContacts == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userContacts);
    }

    /**
     * 创建并保存新的用户联系信息。
     *
     * @param userContacts 包含要保存的联系信息的UserContacts对象。
     * @return 包含已保存UserContacts对象的ResponseEntity。
     */
    @PostMapping("/")
    public ResponseEntity<UserContacts> createUserContacts(@RequestBody UserContacts userContacts) {
        UserContacts savedUserContacts = userContactsService.saveUserContacts(userContacts);
        return ResponseEntity.ok(savedUserContacts);
    }

    /**
     * 更新现有用户的联系信息。
     *
     * @param userId       要更新的用户的ID。
     * @param userContacts 包含要更新的联系信息的UserContacts对象。
     * @return 如果成功更新，则返回包含已更新UserContacts对象的ResponseEntity，
     *         如果未找到用户，则返回404 Not Found响应。
     */
    @PutMapping("/{userId}")
    public ResponseEntity<UserContacts> updateUserContacts(@PathVariable Integer userId, @RequestBody UserContacts userContacts) {
        UserContacts updatedUserContacts = userContactsService.updateUserContacts(userId, userContacts);
        if (updatedUserContacts == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUserContacts);
    }

    /**
     * 删除特定用户的联系信息。
     *
     * @param userId 要删除的用户的ID。
     * @return 如果删除成功，则返回204 No Content响应，
     *         如果未找到用户，则返回404 Not Found响应。
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUserContacts(@PathVariable Integer userId) {
        boolean isDeleted = userContactsService.deleteUserContacts(userId);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}



