# VLLM Qwen 聊天机器人

## 系统要求
- Python 3.8+
- CUDA 支持的 GPU
- 推荐使用虚拟环境

## 安装依赖

1. 安装 VLLM 轮子
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
vllm serve Qwen/Qwen2.5-1.5B-Instruct \
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
  --model Qwen/Qwen2.5-1.5B-Instruct \
  --base-url http://localhost:8113/v1 \
  --api-key token-abc123
```

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

## 开发和贡献

### 目录结构
```
chatbot/
├── models.py       # VLLM 模型客户端
├── app.py          # Gradio 聊天应用
└── requirements.txt # 项目依赖
```

### 注意事项
- 确保 GPU 驱动和 CUDA 正确安装
- 建议使用虚拟环境隔离依赖
- 根据实际情况调整 GPU 和模型参数

## 许可证
[待添加]
