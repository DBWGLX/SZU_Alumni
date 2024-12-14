package com.example.backend_login.service;

import com.example.backend_login.entity.UserPrivacy;

public interface UserPrivacyService {

    /**
     * 根据用户ID获取用户隐私信息。
     *
     * @param userId 用户ID
     * @return 如果找到则返回UserPrivacy对象，否则返回null
     */
    UserPrivacy getUserPrivacyById(Integer userId);

    /**
     * 保存新的用户隐私信息。
     *
     * @param userPrivacy 要保存的UserPrivacy对象
     * @return 已保存的UserPrivacy对象
     */
    UserPrivacy saveUserPrivacy(UserPrivacy userPrivacy);

    /**
     * 更新现有用户的隐私信息。
     *
     * @param userId      要更新的用户的ID。
     * @param userPrivacy 包含要更新的详细信息的UserPrivacy对象。
     * @return 如果成功更新，则返回已更新的UserPrivacy对象，否则返回null
     */
    UserPrivacy updateUserPrivacy(Integer userId, UserPrivacy userPrivacy);

    /**
     * 删除特定用户的隐私信息。
     *
     * @param userId 要删除的用户的ID。
     * @return 如果删除成功，则返回true，否则返回false
     */
    boolean deleteUserPrivacy(Integer userId);
}