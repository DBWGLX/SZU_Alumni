package com.example.backend_login;

import com.example.backend_login.entity.User;
import com.example.backend_login.entity.UserContacts;
import com.example.backend_login.entity.UserInfo;
import com.example.backend_login.entity.UserPrivacy;
import com.example.backend_login.entity.dto.UserDTO;
import com.example.backend_login.repository.UserContactsRepository;
import com.example.backend_login.repository.UserInfoRepository;
import com.example.backend_login.repository.UserPrivacyRepository;
import com.example.backend_login.repository.UserRepository;
import com.example.backend_login.service.UserService;
import com.example.backend_login.service.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest
class userServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserContactsRepository userContactsRepository;
    @Mock
    private UserInfoRepository userInfoRepository;
    @Mock
    private UserPrivacyRepository userPrivacyRepository;

    @InjectMocks
    private UserServiceImpl userService; // 将这里替换为实际包含saveUserAllInfo方法的服务类名

    // 测试保存新用户信息成功的情况
    @Test
    void saveUserAllInfo_success() {
        // 模拟传入的UserDTO对象
        UserDTO userDTO = new UserDTO();
        userDTO.setOpenid("testOpenid");

        // 模拟userRepository.findByOpenid方法返回Optional.empty，表示不存在重复openid的用户
        Mockito.when(userRepository.findByOpenid("testOpenid")).thenReturn(Optional.empty());

        // 模拟userRepository.save方法并返回一个模拟的已保存User对象
        User savedUser = new User();
        Mockito.when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // 调用要测试的方法
        userService.saveUserAllInfo(userDTO);

        // 验证相关方法是否按预期被调用
        verify(userRepository, times(1)).findByOpenid("testOpenid");
        verify(userRepository, times(1)).save(any(User.class));
        verify(userContactsRepository, times(1)).save(any(UserContacts.class));
        verify(userInfoRepository, times(1)).save(any(UserInfo.class));
        verify(userPrivacyRepository, times(1)).save(any(UserPrivacy.class));
    }

    // 测试保存用户信息时openid已存在抛出异常的情况
    @Test
    void saveUserAllInfo_openidExists() {
        // 模拟传入的UserDTO对象
        UserDTO userDTO = new UserDTO();
        userDTO.setOpenid("existingOpenid");

        // 模拟userRepository.findByOpenid方法返回一个包含用户的Optional，表示openid已存在
        User existingUser = new User();
        Mockito.when(userRepository.findByOpenid("existingOpenid")).thenReturn(Optional.of(existingUser));

        // 断言调用方法会抛出IllegalArgumentException异常
        assertThrows(IllegalArgumentException.class, () -> {
            userService.saveUserAllInfo(userDTO);
        });

        // 验证userRepository.findByOpenid方法是否按预期被调用
        verify(userRepository, times(1)).findByOpenid("existingOpenid");
    }
}