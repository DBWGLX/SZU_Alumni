import numpy as np
from typing import Dict, List, Any
from FlagEmbedding import FlagAutoModel

class UserQueryEmbedder:
    def __init__(self, model_name='BAAI/bge-large-zh-v1.5'):
        """
        初始化用户查询嵌入模型
        
        :param model_name: 预训练模型名称
        """
        try:
            self.model = FlagAutoModel.from_finetuned(
                model_name, 
                query_instruction_for_retrieval="为这个句子生成表示以用于检索相关文章：",
                use_fp16=True,
                devices=['cuda:0']  # 根据GPU情况调整
            )
        except Exception as e:
            print(f"模型加载失败: {e}")
            self.model = None
    
    def generate_user_query_embedding(self, user_features: Dict[str, Any]) -> np.ndarray:
        """
        根据用户特征生成查询嵌入
        
        :param user_features: 用户特征字典
        :return: 查询嵌入向量
        """
        if not self.model:
            raise ValueError("模型未正确初始化")
        
        # 灵活拼接用户特征
        feature_parts = []
        for key, value in user_features.items():
            if isinstance(value, list):
                value = ','.join(map(str, value))
            feature_parts.append(f"{key}:{value}")
        
        user_query = " ".join(feature_parts)
        query_embedding = self.model.encode_queries([user_query])[0]
        return query_embedding
    
    def recall_documents(self, 
                         user_query_embedding: np.ndarray, 
                         corpus: List[str], 
                         top_k: int = 100) -> List[str]:
        """
        根据查询嵌入召回文档
        
        :param user_query_embedding: 用户查询嵌入
        :param corpus: 文档语料库
        :param top_k: 返回的top-k文档数量
        :return: 召回的文档列表
        """
        if not self.model:
            raise ValueError("模型未正确初始化")
        
        # 对语料库编码
        self.corpus_embeddings = self.model.encode_corpus(corpus)
        
        # 计算相似度并排序
        scores = user_query_embedding @ self.corpus_embeddings.T
        top_indices = scores.argsort()[-top_k:][::-1]
        
        return top_indices

def test_user_query_embedding():
    """
    测试用户查询嵌入功能
    """
    embedder = UserQueryEmbedder()
    
    # 测试用户特征
    user_features = {
        'age': 25,
        'gender': '男',
        'interests': ['技术', '旅行', '音乐']
    }
    
    # 生成用户查询嵌入
    user_query_embedding = embedder.generate_user_query_embedding(user_features)
    
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
    
    print("召回的文档:", recalled_docs)
    assert len(recalled_docs) == 3, "召回文档数量不正确"

if __name__ == "__main__":
    test_user_query_embedding()
