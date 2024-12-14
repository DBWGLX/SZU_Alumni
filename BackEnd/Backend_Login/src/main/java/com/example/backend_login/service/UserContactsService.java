package com.example.backend_login.service;

import com.example.backend_login.entity.UserContacts;

public interface UserContactsService {

    /**
     * 根据用户ID获取用户联系信息。
     *
     * @param userId 用户ID
     * @return 如果找到则返回UserContacts对象，否则返回null
     */
    UserContacts getUserContactsById(Integer userId);

    /**
     * 保存新的用户联系信息。
     *
     * @param userContacts 要保存的UserContacts对象
     * @return 已保存的UserContacts对象
     */
    UserContacts saveUserContacts(UserContacts userContacts);

    /**
     * 更新现有用户的联系信息。
     *
     * @param userId       要更新的用户的ID。
     * @param userContacts 包含要更新的详细信息的UserContacts对象。
     * @return 如果成功更新，则返回已更新的UserContacts对象，否则返回null
     */
    UserContacts updateUserContacts(Integer userId, UserContacts userContacts);

    /**
     * 删除特定用户的联系信息。
     *
     * @param userId 要删除的用户的ID。
     * @return 如果删除成功，则返回true，否则返回false
     */
    boolean deleteUserContacts(Integer userId);
}