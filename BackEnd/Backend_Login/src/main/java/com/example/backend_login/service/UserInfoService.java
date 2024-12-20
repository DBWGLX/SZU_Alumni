package com.example.backend_login.service;

import com.example.backend_login.entity.UserInfo;
import com.example.backend_login.entity.dto.UserDTO;

public interface UserInfoService {

    /**
     * 根据用户ID获取用户信息。
     *
     * @param userId 用户ID
     * @return 如果找到则返回UserInfo对象，否则返回null
     */
    UserInfo getUserInfoById(Integer userId);

    /**
     * 保存新的用户信息。
     *
     * @param userInfo 要保存的UserInfo对象
     * @return 已保存的UserInfo对象
     */
    UserInfo saveUserInfo(UserDTO userInfo);

    /**
     * 更新现有用户的详细信息。
     *
     * @param userId   要更新的用户的ID。
     * @param userInfo 包含要更新的详细信息的UserInfo对象。
     * @return 如果成功更新，则返回已更新的UserInfo对象，否则返回null
     */
    UserInfo updateUserInfo(Integer userId, UserInfo userInfo);

    /**
     * 删除特定用户的详细信息。
     *
     * @param userId 要删除的用户的ID。
     * @return 如果删除成功，则返回true，否则返回false
     */
    boolean deleteUserInfo(Integer userId);
}