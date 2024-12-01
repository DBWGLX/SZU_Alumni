# 微信登录后端服务

这是一个基于Spring Boot的后端服务，实现了微信小程序的登录功能，并生成JWT token用于用户身份验证。



## 功能

- **微信登录**：通过微信小程序获取临时登录凭证code，使用code换取用户的OpenID、UnionID（如果已绑定）和session_key。
- **生成JWT Token**：根据用户的OpenID生成一个JWT token，用于后续的身份验证。
- **用户管理**：包括用户注册、查询等基本操作。

## API文档

### 微信登录

- **URL**: `/users/wechat/login`
- **Method**: `POST`
- **Parameters**:
  - `code`: 微信登录的临时登录凭证code
- **Response**:
  - `success`: 登录是否成功
  - `message`: 错误信息（如果失败）
  - `user`: 用户信息
  - `token`: 生成的JWT token
    
## 运行项目

1. **克隆仓库**：
   ```bash
   git clone https://github.com/your-repo/your-project.git
   cd your-project
   ```

2. **构建项目**：
   ```bash
   mvn clean instal
   ```

3. **启动应用**：
   - 使用IDE直接运行 `BackendApplication.java`。
   - 或者使用Maven命令：
     ```bash
     mvn spring-boot:run

4. **访问API**：
   - 启动成功后，可以通过 `http://localhost:8080/users/wechat/login` 访问微信登录接口。



