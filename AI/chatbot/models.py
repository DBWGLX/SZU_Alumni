import os
import json
import openai
from typing import List, Dict, Optional, Tuple, Generator, Any

class QwenVLLMModel:
    def __init__(
        self, 
        model_name: str = 'Qwen/Qwen2.5-1.5B-Instruct', 
        base_url: str = 'http://localhost:8113/v1', 
        api_key: str = 'token-abc123',
        max_history_length: int = 10
    ):
        """
        初始化 Qwen VLLM 模型客户端
        
        :param model_name: 模型名称
        :param base_url: VLLM 服务器地址
        :param api_key: API 密钥
        :param max_history_length: 最大对话历史长度
        """
        self.client = openai.OpenAI(
            base_url=base_url,
            api_key=api_key
        )
        self.model_name = model_name
        self.max_history_length = max_history_length
        self.conversation_history: List[Dict[str, str]] = []
        self.system_context: Optional[str] = None

    def set_system_context(self, context: str):
        """
        设置系统上下文
        
        :param context: 系统上下文描述
        """
        self.system_context = context
        self.conversation_history = []

    def clear_history(self):
        """
        清空对话历史
        """
        self.conversation_history = []
        self.system_context = None

    def generate_system_prompt(
        self, 
        context: Optional[str] = None
    ) -> Dict[str, str]:
        """
        生成系统提示词
        
        :param context: 额外的上下文信息
        :return: 系统提示词字典
        """
        default_prompt = "你是一个友好、智能的AI助手，可以提供各种帮助和建议。"
        
        if context:
            default_prompt += f"\n额外背景: {context}"
        
        return {"role": "system", "content": default_prompt}

    def prepare_conversation(
        self, 
        user_message: str, 
        history: Optional[List[Dict[str, str]]] = None, 
        context: Optional[str] = None
    ) -> List[Dict[str, str]]:
        """
        准备对话历史
        
        :param user_message: 用户当前消息
        :param history: 历史对话记录
        :param context: 额外的上下文信息
        :return: 完整的对话历史
        """
        # 如果提供了上下文，更新系统上下文
        if context:
            self.set_system_context(context)

        # 准备消息列表
        messages = []

        # 添加系统提示词
        if self.system_context:
            messages.append(self.generate_system_prompt(self.system_context))

        # 添加历史对话记录
        if history:
            messages.extend(history)
        elif self.conversation_history:
            messages.extend(self.conversation_history[-self.max_history_length:])

        # 添加当前用户消息
        messages.append({"role": "user", "content": user_message})
        
        return messages

    def chat(
        self, 
        messages: List[Dict[str, str]], 
        temperature: float = 0.7, 
        max_tokens: int = 1024
    ) -> str:
        """
        生成聊天响应
        
        :param messages: 对话历史消息
        :param temperature: 生成文本的随机性
        :param max_tokens: 最大生成 token 数
        :return: 模型生成的响应
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens
            )
            
            # 获取响应内容
            assistant_response = response.choices[0].message.content.strip()
            
            # 更新对话历史
            messages.append({"role": "assistant", "content": assistant_response})
            self.conversation_history.extend([
                {"role": "user", "content": messages[-2]["content"]},
                {"role": "assistant", "content": assistant_response}
            ])
            
            # 保持历史长度限制
            self.conversation_history = self.conversation_history[-self.max_history_length * 2:]
            
            return assistant_response
        
        except Exception as e:
            print(f"聊天生成错误: {e}")
            return "抱歉，我无法生成回复。"

    def stream_chat(
        self, 
        messages: List[Dict[str, str]], 
        temperature: float = 0.7, 
        max_tokens: int = 1024
    ) -> Tuple[str, List[Dict[str, str]]]:
        """
        流式生成聊天响应
        
        :param messages: 对话历史消息
        :param temperature: 生成文本的随机性
        :param max_tokens: 最大生成 token 数
        :return: 完整响应和更新后的消息历史
        """
        try:
            stream = self.client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                stream=True
            )
            
            full_response = ""
            
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    full_response += content
            
            # 创建新的消息列表副本并追加响应
            updated_messages = messages.copy()
            updated_messages.append({"role": "assistant", "content": full_response})
            
            # 更新对话历史
            self.conversation_history.extend([
                {"role": "user", "content": messages[-1]["content"]},
                {"role": "assistant", "content": full_response}
            ])
            
            # 保持历史长度限制
            self.conversation_history = self.conversation_history[-self.max_history_length * 2:]
            
            return full_response, updated_messages
        
        except Exception as e:
            print(f"聊天生成错误: {e}")
            return "", messages

    def save_conversation(self, file_path: str):
        """
        保存对话历史到文件
        
        :param file_path: 保存文件路径
        """
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump({
                    'system_context': self.system_context,
                    'conversation_history': self.conversation_history
                }, f, ensure_ascii=False, indent=2)
            print(f"对话历史已保存到 {file_path}")
        except Exception as e:
            print(f"保存对话历史失败: {e}")

    def load_conversation(self, file_path: str):
        """
        从文件加载对话历史
        
        :param file_path: 加载文件路径
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.system_context = data.get('system_context')
                self.conversation_history = data.get('conversation_history', [])
            print(f"对话历史已从 {file_path} 加载")
        except Exception as e:
            print(f"加载对话历史失败: {e}")

    def export_conversation(self) -> Dict[str, Any]:
        """
        导出当前对话状态
        
        :return: 包含系统上下文和对话历史的字典
        """
        return {
            'system_context': self.system_context,
            'conversation_history': self.conversation_history
        }
