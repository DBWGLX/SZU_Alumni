package com.example.backend_login;

import com.example.backend_login.entity.User;
import com.example.backend_login.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class UserControllerTest {

    @Autowired
    private UserService us;

    /**
     * 测试用户未注册，未认证的情况
     */
    @Test
    void TestStatus0() {
        String openid = "s1";
        User user1 = new User();
        user1.setIs_verified(false);

        int temp = us.returnStatus(openid);
        assertEquals(0, temp);
    }
    /**
     * 测试用户已注册，未认证的情况
     */
    @Test
    void TestStatus1() {
        String openid = "wx123456789";
        User user1 = new User();
        user1.setIs_verified(false);

        int temp = us.returnStatus(openid);
        assertEquals(1, temp);
    }

    /**
     * 测试用户已注册，已认证的情况
     */
    @Test
    void TestStatus2() {
        String openid = "lxXuan123456789";
        User user1 = new User();
        user1.setIs_verified(true);

        int temp = us.returnStatus(openid);
        assertEquals(2, temp);
    }
}