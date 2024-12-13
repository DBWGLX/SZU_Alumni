# 推荐系统 (Recommendation System)

## 项目简介 (Project Overview)

这是一个基于语义嵌入的个性化推荐系统，使用 FlagEmbedding 为用户提供精准的文章推荐。

This is a personalized recommendation system based on semantic embedding, using FlagEmbedding technology to provide precise article recommendations.

## 技术栈 (Tech Stack)

- Python 3.8+
- Flask
- FlagEmbedding
- NumPy
- Transformers

## 项目结构 (Project Structure)

```
rec_sys/
│
├── algorithms/                # 核心算法实现
│   ├── __init__.py
│   ├── embedding_retriever.py     # 嵌入检索器
│   └── recommendation_pipeline.py # 推荐流水线
│
├── api/                       # API接口
│   ├── __init__.py
│   └── recommendation_api.py  # RESTful API实现
│
├── tests/                     # 单元测试
│   └── test_embedding_retriever.py
│
├── requirements.txt           # 项目依赖
└── test_api.py                # API测试脚本
```

## 安装 (Installation)

1. 克隆仓库 (Clone the repository):
```bash
git clone https://github.com/your_username/rec_sys.git
cd rec_sys
```

2. 创建虚拟环境 (Create virtual environment):
```bash
python3 -m venv venv
source venv/bin/activate
```

3. 安装依赖 (Install dependencies):
```bash
pip install -r requirements.txt
```

## 运行 (Running)

### 启动 API 服务器 (Start API Server)
```bash
python -m api.recommendation_api
```

### 运行测试 (Run Tests)
```bash
python test_api.py
```

## 主要功能 (Main Features)

- 基于语义嵌入的文章推荐
- 用户画像生成
- RESTful API接口
- 支持中文语义检索

## API 接口 (API Endpoints)

1. 健康检查 (Health Check):
   - `GET /health`
   - 返回系统运行状态

2. 用户资料 (User Profile):
   - `GET /user_profile/<user_id>`
   - 获取指定用户的详细信息

3. 文章推荐 (Article Recommendation):
   - `GET /recommend/<user_id>`
   - 为指定用户生成个性化文章推荐

## 聊天机器人 (Chatbot)

### 功能特点
- 基于 OpenAI 兼容的 VLLM 模型
- 支持 Xbox Game Pass 内容咨询
- 可配置的聊天参数
- 支持并行推理

### 启动聊天机器人
```bash
python -m chatbot.app --host 0.0.0.0 --port 8002 --temp 0.8
```

#### 可选参数
- `--host`: 服务器主机地址
- `--port`: 服务器端口
- `--temp`: 文本生成温度
- `--api-key`: 模型 API 密钥
- `--model-url`: 模型服务器地址

## 配置 (Configuration)

可以通过修改 `algorithms/recommendation_pipeline.py` 中的参数调整推荐系统行为。

## 性能优化 (Performance Optimization)

- 使用 FP16 加速计算
- GPU 加速支持
- 语义嵌入检索

## 未来计划 (Future Roadmap)

- 添加缓存机制
- 支持更多推荐算法
- 增强错误处理
- 添加用户反馈学习机制

## 许可证 (License)

[待添加许可证信息]

## 贡献 (Contribution)

欢迎提交 Pull Request 和 Issue！
