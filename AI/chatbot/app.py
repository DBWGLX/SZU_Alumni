import gradio as gr
import argparse
from .models import QwenVLLMModel

def create_chatbot(
    model_name: str = 'Qwen/Qwen2.5-1.5B-Instruct',
    base_url: str = 'http://localhost:8113/v1',
    api_key: str = 'token-abc123'
):
    """
    创建聊天机器人实例
    
    :param model_name: 模型名称
    :param base_url: VLLM 服务器地址
    :param api_key: API 密钥
    :return: Gradio 聊天界面
    """
    model = QwenVLLMModel(
        model_name=model_name, 
        base_url=base_url, 
        api_key=api_key
    )

    def predict(message, history):
        """
        预测聊天响应
        
        :param message: 用户输入消息
        :param history: 聊天历史
        :return: 模型生成的响应
        """
        # 准备对话历史
        messages = model.prepare_conversation(
            user_message=message, 
            history=history,
            context="你是一个友好的Xbox Game Pass内容助手"
        )

        # 生成响应
        response = model.chat(
            messages=messages, 
            temperature=0.7, 
            max_tokens=1024
        )

        return response

    # 创建 Gradio 聊天界面
    return gr.ChatInterface(predict)

def main():
    """
    主程序入口，解析命令行参数并启动聊天机器人
    """
    parser = argparse.ArgumentParser(description='Qwen VLLM 聊天机器人')
    parser.add_argument('--model', default='Qwen/Qwen2.5-1.5B-Instruct', help='模型名称')
    parser.add_argument('--base-url', default='http://localhost:8113/v1', help='VLLM 服务器地址')
    parser.add_argument('--api-key', default='token-abc123', help='API 密钥')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='服务器主机')
    parser.add_argument('--port', type=int, default=8002, help='服务器端口')
    parser.add_argument('--share', action='store_true', help='是否公开分享')

    args = parser.parse_args()

    # 创建并启动聊天机器人
    chatbot = create_chatbot(
        model_name=args.model,
        base_url=args.base_url,
        api_key=args.api_key
    )

    # 启动 Gradio 服务
    chatbot.queue().launch(
        server_name=args.host, 
        server_port=args.port, 
        share=args.share
    )

if __name__ == '__main__':
    main()
