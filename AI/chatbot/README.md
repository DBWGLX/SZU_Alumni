# SZU Alumni 智能助手

## 项目简介

这是一个基于 VLLM 和 Qwen 模型的智能助手系统，专为深圳大学校友录设计。系统能够回答校友关于校友录应用的各种问题，提供智能化的交互体验。

## 系统要求
- Python 3.8+
- CUDA 支持的 GPU
- 推荐使用虚拟环境

## 安装依赖

1. 安装 VLLM
```bash
pip install https://vllm-wheels.s3.us-west-2.amazonaws.com/nightly/vllm-1.0.0.dev-cp38-abi3-manylinux1_x86_64.whl
```

2. 安装项目依赖
```bash
pip install -r requirements.txt
```

## 启动服务

### 1. 启动 VLLM 模型服务
```bash
vllm serve Qwen/Qwen2.5-72B-Instruct \
  --api-key token-abc123 \
  --gpu-memory-utilization 0.98 \
  --port 8113 \
  --max-model-len 16000 \
  --enforce-eager \
  --tensor-parallel-size 4 \
  --trust-remote-code
```

### 2. 启动 Gradio 聊天机器人
```bash
python -m chatbot.app \
  --model Qwen/Qwen2.5-72B-Instruct \
  --base-url http://localhost:8113/v1 \
  --api-key token-abc123 \
  --host 0.0.0.0 \
  --port 8002 \
  --share
```

## 功能特点

- 基于 Qwen 72B 大模型，提供强大的自然语言理解能力
- 专门针对校友录应用场景进行优化
- 支持多用户并发对话
- 对话历史管理
- 实时流式响应
- 可配置的系统参数

## 配置参数

### VLLM 服务参数
- `--api-key`: API 密钥
- `--gpu-memory-utilization`: GPU 内存利用率 (0.0 - 1.0)
- `--port`: 服务器端口
- `--max-model-len`: 最大 token 长度
- `--enforce-eager`: 强制使用 eager 模式
- `--tensor-parallel-size`: 张量并行大小
- `--trust-remote-code`: 信任远程代码

### Gradio 聊天机器人参数
- `--model`: 模型名称
- `--base-url`: VLLM 服务器地址
- `--api-key`: API 密钥
- `--host`: 服务器主机
- `--port`: 服务器端口
- `--share`: 是否公开分享

## 项目结构
```
chatbot/
├── models.py       # VLLM 模型客户端
├── app.py         # Gradio 聊天应用
└── requirements.txt # 项目依赖
```

## 系统特点

- 高性能：使用 VLLM 进行高效推理
- 多用户支持：每个用户独立的对话历史管理
- 实时响应：流式输出，提供即时反馈
- 易于部署：完整的部署文档和配置说明
- 可扩展性：模块化设计，易于添加新功能

## 使用建议

1. 根据实际 GPU 显存大小调整 `gpu-memory-utilization` 参数
2. 使用 `tensor-parallel-size` 进行多 GPU 并行
3. 适当调整 `max-model-len` 以平衡性能和响应长度
4. 在生产环境中建议使用反向代理和负载均衡

## 开发指南

1. 代码风格遵循 PEP8 规范
2. 新功能开发请创建新分支
3. 提交前请运行测试用例
4. 及时更新文档

## 故障排除

- 如果遇到 CUDA 内存不足，尝试降低 `gpu-memory-utilization`
- 如果响应过慢，可以调整 `max-model-len` 和批处理参数
- 日志文件位于应用根目录下的 logs 文件夹
