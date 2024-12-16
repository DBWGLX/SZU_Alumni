import gradio as gr
import argparse
from typing import List, Dict, Optional, Tuple
from .models import QwenVLLMModel
import uuid

class ChatbotManager:
    """
    多用户聊天机器人管理器
    管理独立的聊天会话和模型实例
    """
    def __init__(
        self, 
        model_name: str = 'Qwen/Qwen2.5-72B-Instruct',
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
        self.user_histories: Dict[str, List[List[str]]] = {}  # 存储用户对话历史
    
    def get_or_create_model(self, user_id: Optional[str] = None) -> Tuple[str, QwenVLLMModel]:
        """
        获取或创建特定用户的模型实例
        
        :param user_id: 用户唯一标识
        :return: (user_id, QwenVLLMModel 实例)
        """
        if user_id is None:
            user_id = str(uuid.uuid4())
        
        if user_id not in self.user_models:
            self.user_models[user_id] = QwenVLLMModel(
                model_name=self.model_name,
                base_url=self.base_url,
                api_key=self.api_key
            )
            self.user_histories[user_id] = []  # 初始化用户历史记录
        
        return user_id, self.user_models[user_id]
    
    def chat(
        self, 
        message: str, 
        history: List[List[str]], 
        user_id: Optional[str] = None
    ) -> Tuple[str, List[List[str]]]:
        """
        处理用户聊天请求
        
        :param message: 用户消息
        :param history: 聊天历史
        :param user_id: 用户唯一标识
        :return: (AI响应, 更新后的历史记录)
        """
        user_id, model = self.get_or_create_model(user_id)
        
        # 获取或初始化用户历史
        if user_id not in self.user_histories:
            self.user_histories[user_id] = []
        current_history = self.user_histories[user_id]
        
        # 准备对话消息
        messages = []
        for h in current_history:
            messages.append({"role": "user", "content": h[0]})
            if len(h) > 1:  # 确保有响应
                messages.append({"role": "assistant", "content": h[1]})
        
        # 添加当前消息
        messages.append({"role": "user", "content": message})
        
        # 生成响应
        try:
            response = model.chat(
                messages=messages,
                temperature=0.7,
                max_tokens=1024
            )
            # 更新历史记录
            current_history.append([message, response])
            self.user_histories[user_id] = current_history
            return response, current_history
        except Exception as e:
            print(f"聊天生成错误: {e}")
            error_msg = "抱歉，我无法生成回复。"
            current_history.append([message, error_msg])
            self.user_histories[user_id] = current_history
            return error_msg, current_history
    
    def clear_history(self, user_id: Optional[str] = None) -> List[List[str]]:
        """
        清空特定用户的聊天历史
        
        :param user_id: 用户唯一标识
        :return: 空的聊天历史
        """
        if user_id and user_id in self.user_histories:
            self.user_histories[user_id] = []
            if user_id in self.user_models:
                self.user_models[user_id].clear_history()
        return []

def create_chatbot(
    model_name: str = 'Qwen/Qwen2.5-1.5B-Instruct',
    base_url: str = 'http://localhost:8113/v1',
    api_key: str = 'token-abc123'
) -> gr.Blocks:
    """
    创建聊天机器人界面
    
    :param model_name: 模型名称
    :param base_url: VLLM 服务器地址
    :param api_key: API 密钥
    :return: Gradio Blocks 界面
    """
    chatbot_manager = ChatbotManager(model_name, base_url, api_key)
    user_id = str(uuid.uuid4())  # 为每个会话创建唯一ID
    
    with gr.Blocks() as demo:
        chatbot = gr.Chatbot()
        msg = gr.Textbox()
        clear = gr.Button("Clear")

        def user(user_message, history):
            return "", history + [[user_message, None]]

        def bot(history):
            user_message = history[-1][0]
            response, updated_history = chatbot_manager.chat(user_message, history[:-1], user_id)
            history[-1][1] = response
            return history

        msg.submit(user, [msg, chatbot], [msg, chatbot], queue=False).then(
            bot, chatbot, chatbot
        )
        clear.click(lambda: chatbot_manager.clear_history(user_id), None, chatbot, queue=False)
    
    return demo

def main():
    """
    主程序入口，解析命令行参数并启动聊天机器人
    """
    parser = argparse.ArgumentParser(description='启动聊天机器人服务')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='服务器地址')
    parser.add_argument('--port', type=int, default=8002, help='服务器端口')
    parser.add_argument('--model-name', type=str, default='Qwen/Qwen2.5-1.5B-Instruct', help='模型名称')
    parser.add_argument('--base-url', type=str, default='http://localhost:8113/v1', help='VLLM 服务器地址')
    parser.add_argument('--api-key', type=str, default='token-abc123', help='API 密钥')
    
    args = parser.parse_args()
    
    demo = create_chatbot(
        model_name=args.model_name,
        base_url=args.base_url,
        api_key=args.api_key
    )
    demo.launch(server_name=args.host, server_port=args.port, share=True)

if __name__ == '__main__':
    main()
