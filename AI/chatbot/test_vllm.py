import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from chatbot.models import QwenVLLMModel

def test_vllm_model():
    """
    测试 VLLM 模型基本功能
    """
    # 初始化模型
    model = QwenVLLMModel(
        model_name='Qwen/Qwen2.5-1.5B-Instruct', 
        base_url='http://localhost:8113/v1', 
        api_key='token-abc123'
    )

    # 测试对话历史准备
    messages = model.prepare_conversation(
        user_message="介绍一下 Xbox Game Pass 的特点",
        context="你是一个游戏推荐助手"
    )

    # 测试聊天功能
    print("测试普通聊天:")
    response = model.chat(messages=messages)
    print(response)
    print("\n" + "-"*50 + "\n")

    # 测试流式生成
    print("测试流式生成:")
    stream_generator, full_response, updated_messages = model.stream_chat(messages=messages)
    for chunk in stream_generator:
        print(chunk, end='', flush=True)
    print("\n完整响应:", full_response)
    print("更新后的对话历史:", updated_messages)

def test_conversation_context():
    """
    测试多轮对话上下文保持
    """
    model = QwenVLLMModel(
        model_name='Qwen/Qwen2.5-1.5B-Instruct', 
        base_url='http://localhost:8113/v1', 
        api_key='token-abc123'
    )

    # 第一轮对话
    messages = model.prepare_conversation(
        user_message="我想了解 Xbox Game Pass 有什么游戏",
        context="你是一个游戏推荐助手"
    )

    # 第一次聊天
    first_response = model.chat(messages=messages)
    print("第一轮对话:")
    print(first_response)
    print("\n" + "-"*50 + "\n")

    # 更新对话历史
    messages.append({"role": "assistant", "content": first_response})
    
    # 第二轮对话
    messages = model.prepare_conversation(
        user_message="能推荐几款好玩的游戏吗？",
        history=messages,
        context="你是一个游戏推荐助手"
    )

    # 第二次聊天
    second_response = model.chat(messages=messages)
    print("第二轮对话:")
    print(second_response)

def main():
    print("开始测试 VLLM 模型...")
    test_vllm_model()
    print("\n\n多轮对话上下文测试:")
    test_conversation_context()

if __name__ == '__main__':
    main()
