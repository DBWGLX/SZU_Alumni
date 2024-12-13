import sys
import os

# 确保项目根目录在 Python 路径中
project_root = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, project_root)

from algorithms.embedding_retriever import UserQueryEmbedder

def main():
    try:
        # 初始化嵌入检索器
        embedder = UserQueryEmbedder()
        
        # 测试用户特征
        user_features = {
            'age': 25,
            'gender': '男',
            'interests': ['技术', '旅行', '音乐']
        }
        
        # 生成用户查询嵌入
        user_query_embedding = embedder.generate_user_query_embedding(user_features)
        print("用户查询嵌入向量维度:", user_query_embedding.shape)
        
        # 模拟文档语料库
        corpus = [
            "关于技术创新的文章",
            "旅行经验分享",
            "音乐产业发展趋势",
            "年轻人职场成长",
            "城市生活指南"
        ]
        
        # 召回文档
        recalled_docs = embedder.recall_documents(user_query_embedding, corpus, top_k=3)
        
        print("\n召回的文档:")
        for i, doc in enumerate(recalled_docs, 1):
            print(f"{i}. {doc}")
        
        print("\n测试通过！")
    
    except Exception as e:
        print(f"测试出错: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
