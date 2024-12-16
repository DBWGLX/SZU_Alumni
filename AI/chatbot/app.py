import gradio as gr
import argparse
from typing import List, Dict, Optional
from .models import QwenVLLMModel
import uuid

class ChatbotManager:
    """
    多用户聊天机器人管理器
    管理独立的聊天会话和模型实例
    """
    def __init__(
        self, 
        model_name: str = 'Qwen/Qwen2.5-1.5B-Instruct',
        base_url: str = 'http://localhost:8113/v1',
        api_key: str = 'token-abc123'
    ):
        """
        初始化聊天管理器
        
        :param model_name: 模型名称
        :param base_url: VLLM 服务器地址
        :param api_key: API 密钥
        """
        self.model_name = model_name
        self.base_url = base_url
        self.api_key = api_key
        self.user_models: Dict[str, QwenVLLMModel] = {}
    
    def get_or_create_model(self, user_id: Optional[str] = None) -> QwenVLLMModel:
        """
        获取或创建特定用户的模型实例
        
        :param user_id: 用户唯一标识
        :return: QwenVLLMModel 实例
        """
        if user_id is None:
            user_id = str(uuid.uuid4())
        
        if user_id not in self.user_models:
            self.user_models[user_id] = QwenVLLMModel(
                model_name=self.model_name,
                base_url=self.base_url,
                api_key=self.api_key
            )
        
        return self.user_models[user_id]
    
    def chat(
        self, 
        message: str, 
        history: List[List[str]], 
        user_id: Optional[str] = None
    ) -> str:
        """
        处理用户聊天请求
        
        :param message: 用户消息
        :param history: 聊天历史
        :param user_id: 用户唯一标识
        :return: AI 响应
        """
        model = self.get_or_create_model(user_id)
        
        # 转换历史记录为 OpenAI 格式
        messages = model.prepare_conversation(
            user_message=message, 
            history=[
                {"role": "user", "content": h[0]} if i % 2 == 0 else {"role": "assistant", "content": h[1]} 
                for i, h in enumerate(history)
            ],
            context="你是一个友好的Xbox Game Pass内容助手"
        )

        # 生成响应
        try:
            response = model.chat(
                messages=messages, 
                temperature=0.7, 
                max_tokens=1024
            )
            return response
        except Exception as e:
            print(f"聊天生成错误: {e}")
            return "抱歉，我无法生成回复。"
    
    def clear_history(self, user_id: Optional[str] = None) -> List[List[str]]:
        """
        清空特定用户的聊天历史
        
        :param user_id: 用户唯一标识
        :return: 空的聊天历史
        """
        model = self.get_or_create_model(user_id)
        model.clear_history()
        return []

def create_chatbot(
    model_name: str = 'Qwen/Qwen2.5-1.5B-Instruct',
    base_url: str = 'http://localhost:8113/v1',
    api_key: str = 'token-abc123'
):
    """
    创建多用户聊天机器人界面
    
    :param model_name: 模型名称
    :param base_url: VLLM 服务器地址
    :param api_key: API 密钥
    :return: Gradio 聊天界面
    """
    chatbot_manager = ChatbotManager(
        model_name=model_name,
        base_url=base_url,
        api_key=api_key
    )

    with gr.Blocks() as demo:
        # 用户状态管理
        user_id = gr.State(value=None)
        
        # 聊天界面组件
        chatbot = gr.Chatbot(label="Xbox Game Pass 助手")
        msg = gr.Textbox(label="输入你的消息")
        clear = gr.Button("清空历史")
        
        # 发送消息事件
        msg.submit(
            fn=lambda message, history, user_id: (
                chatbot_manager.chat(message, history, user_id),
                history + [[message, chatbot_manager.chat(message, history, user_id)]]
            ),
            inputs=[msg, chatbot, user_id],
            outputs=[chatbot, chatbot]
        )
        
        # 清空历史事件
        clear.click(
            fn=lambda user_id: ([], user_id),
            inputs=[user_id],
            outputs=[chatbot, user_id]
        )

    return demo

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
    chatbot.launch(
        server_name=args.host, 
        server_port=args.port, 
        share=args.share
    )

if __name__ == '__main__':
    main()
