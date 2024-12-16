package org.example.entity;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

import org.json.JSONObject;
public class User {
    public static String[] getUser(long id) {
        // 替换为实际的用户ID
        String userId = String.valueOf(id);
        // 替换为实际的接口URL
        String urlString = "http://localhost:8080/users/nameAndImageUrl/?id=" + userId;

        try {
            // 创建URL对象
            URL url = new URL(urlString);
            // 打开连接
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            // 设置请求方法为GET
            conn.setRequestMethod("GET");
            // 设置请求头
            conn.setRequestProperty("Accept", "application/json");

            // 检查响应码
            if (conn.getResponseCode() != 200) {
                System.out.println("无法连接用户信息后端");
                return null;
            }

            // 读取响应内容
            BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
            StringBuilder response = new StringBuilder();
            String output;
            while ((output = br.readLine()) != null) {
                response.append(output);
            }

            // 关闭连接
            conn.disconnect();

            // 解析JSON响应
            JSONObject jsonObject = new JSONObject(response.toString());
            String userName = jsonObject.getString("user_name");
            String imageUrl = jsonObject.getString("image_url");

            // 输出结果
            System.out.println("User Name: " + userName);
            System.out.println("Image URL: " + imageUrl);
            String[] cnt = new String[2];
            cnt[0] = userName;

            String parten  = imageUrl.substring(imageUrl.lastIndexOf("."));
            String image = "data:image/"+parten+";base64"+ Base64.getEncoder().encodeToString(Files.readAllBytes(Paths.get(imageUrl)));
            System.out.println("用户头像base64编码成功:"+userName);
            cnt[1] = image;
            return cnt;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
