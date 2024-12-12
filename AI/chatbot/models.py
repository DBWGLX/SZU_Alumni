import os
import openai
from typing import List, Dict, Optional

class QwenVLLMModel:
    def __init__(
        self, 
        model_name: str = 'Qwen/Qwen2.5-1.5B-Instruct', 
        base_url: str = 'http://localhost:8113/v1', 
        api_key: str = 'token-abc123'
    ):
        """
        初始化 Qwen VLLM 模型客户端
        
        :param model_name: 模型名称
        :param base_url: VLLM 服务器地址
        :param api_key: API 密钥
        """
        self.client = openai.OpenAI(
            base_url=base_url,
            api_key=api_key
        )
        self.model_name = model_name

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
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"聊天生成错误: {e}")
            return "抱歉，我无法生成回复。"

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
        history: List[Dict[str, str]] = None, 
        context: Optional[str] = None
    ) -> List[Dict[str, str]]:
        """
        准备对话历史
        
        :param user_message: 用户当前消息
        :param history: 历史对话记录
        :param context: 额外的上下文信息
        :return: 完整的对话历史
        """
        messages = [self.generate_system_prompt(context)]
        
        if history:
            messages.extend(history)
        
        messages.append({"role": "user", "content": user_message})
        
        return messages

    def stream_chat(
        self, 
        messages: List[Dict[str, str]], 
        temperature: float = 0.7, 
        max_tokens: int = 1024
    ):
        """
        流式生成聊天响应
        
        :param messages: 对话历史消息
        :param temperature: 生成文本的随机性
        :param max_tokens: 最大生成 token 数
        :yield: 逐 token 生成的响应
        """
        full_response = ""
        try:
            stream = self.client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                stream=True
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield content
            
            # 在流式生成结束后，追加完整的响应
            messages.append({"role": "assistant", "content": full_response})
        except Exception as e:
            print(f"流式聊天生成错误: {e}")
            yield "抱歉，我无法生成回复。"
