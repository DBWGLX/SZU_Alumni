const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/login', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const response = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: process.env.APP_ID,
        secret: process.env.APP_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, session_key } = response.data;

    // 这里可以根据需要保存openid和session_key到数据库或其他存储方式
    // 例如：saveToDatabase(openid, session_key);

    res.json({ openid, session_key });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user info from WeChat server' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



