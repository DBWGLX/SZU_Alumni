# 推荐系统 (Recommendation System)

## 项目简介 (Project Overview)

这是一个基于语义嵌入的个性化推荐系统，专为深圳大学校友录设计。系统使用 FlagEmbedding 为用户提供精准的文章推荐，帮助校友发现感兴趣的内容。

This is a personalized recommendation system designed for SZU Alumni, using semantic embedding based on FlagEmbedding technology to provide precise article recommendations.

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
git clone https://github.com/your_username/SZU_Alumni.git
cd SZU_Alumni/AI/rec_sys
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
- 用户画像生成和分析
- 高效的文章检索和排序
- RESTful API接口
- 支持中文语义检索
- 个性化推荐算法

## API 接口 (API Endpoints)

1. 健康检查 (Health Check):
   - `GET /health`
   - 返回系统运行状态

2. 用户资料 (User Profile):
   - `GET /user_profile/<user_id>`
   - 获取指定用户的详细信息和兴趣画像

3. 文章推荐 (Article Recommendation):
   - `GET /recommend/<user_id>`
   - 为指定用户生成个性化文章推荐
   - 支持基于用户历史行为和兴趣的智能推荐

## 系统特点

- 高效的语义检索：使用 FlagEmbedding 进行文本嵌入和相似度计算
- 实时推荐：支持实时更新用户画像和推荐结果
- 可扩展性：模块化设计，易于扩展和维护
- 性能优化：优化的向量检索算法，提供快速响应

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进系统。在提交代码前，请确保：
1. 代码符合 PEP8 规范
2. 添加了必要的单元测试
3. 更新了相关文档
