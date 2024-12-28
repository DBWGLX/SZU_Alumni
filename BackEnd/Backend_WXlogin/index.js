const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 打印每个请求的 IP 地址和请求时间
app.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`[${new Date().toISOString()}] Incoming request from IP: ${clientIp}, URL: ${req.originalUrl}`);//
  next(); // 确保继续处理请求
});

app.post('/login', async (req, res) => {
  const { code } = req.body;
  console.log('Request body:', req.body);//
  console.log('Request headers:', req.headers);//
  if (!code) {
    return res.status(400).json({ success: false, error: 'Code is required' });
  }
  
  console.log('Request to WeChat API:', {
    appid: process.env.APP_ID,
    secret: process.env.APP_SECRET,
    js_code: code,
    grant_type: 'authorization_code'
  });
  

  try {
    const response = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: process.env.APP_ID,
        secret: process.env.APP_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, session_key, errmsg  } = response.data;
    console.log('WeChat API response:', JSON.stringify(response.data, null, 2));
    console.log(`User ${openid} logged in`);//
    res.json({ success: true, openid, session_key });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to get user info from WeChat server' });
  }
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});



