import json
import os
from typing import List, Dict, Any
import numpy as np

from .embedding_retriever import UserQueryEmbedder

class RecommendationPipeline:
    def __init__(self, 
                 user_data_path: str = '/home/aiscuser/SZU_Alumni/AI/data/user.json',
                 article_data_path: str = '/home/aiscuser/SZU_Alumni/AI/data/article.json'):
        """
        初始化推荐流水线
        
        :param user_data_path: 用户数据路径
        :param article_data_path: 文章数据路径
        """
        # 加载数据
        with open(user_data_path, 'r', encoding='utf-8') as f:
            self.user_data = json.load(f)
        
        with open(article_data_path, 'r', encoding='utf-8') as f:
            self.article_data = json.load(f)
        
        # 初始化嵌入模型
        self.embedder = UserQueryEmbedder()
        
        # 预处理文章语料库
        self.corpus = [
            f"{article['title']} {article['text']}" 
            for article in self.article_data.get('Articles', [])
        ]
    
    def generate_user_embedding(self, user_id: str) -> np.ndarray:
        """
        为特定用户生成嵌入向量
        
        :param user_id: 用户ID
        :return: 用户嵌入向量
        """
        # 找到用户信息
        user = next(
            (u for u in self.user_data.get('User', []) if u['user_id'] == user_id), 
            None
        )
        
        if not user:
            raise ValueError(f"未找到用户 {user_id}")
        
        # 构建用户特征
        user_features = {
            'job': user.get('user_job', ''),
            'major': user.get('user_major', ''),
            'sex': user.get('user_sex', ''),
            'introduce': user.get('user_introduce', '')
        }
        
        return self.embedder.generate_user_query_embedding(user_features)
    
    def recommend_articles(self, user_id: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        为用户推荐文章
        
        :param user_id: 用户ID
        :param top_k: 推荐文章数量
        :return: 推荐文章列表
        """
        # 生成用户嵌入
        user_embedding = self.generate_user_embedding(user_id)
        
        # 召回文档
        recalled_corpus_indices = self.embedder.recall_documents(
            user_embedding, 
            self.corpus, 
            top_k=top_k
        )
        
        # 获取原始文章信息
        recommendations = []
        for recalled_text in recalled_corpus_indices:
            matching_articles = [
                article for article in self.article_data.get('Articles', [])
                if recalled_text in f"{article['title']} {article['text']}"
            ]
            recommendations.extend(matching_articles)
        
        return recommendations[:top_k]
    
    def get_user_profile(self, user_id: str) -> Dict[str, Any]:
        """
        获取用户详细信息
        
        :param user_id: 用户ID
        :return: 用户详细信息
        """
        user = next(
            (u for u in self.user_data.get('User', []) if u['user_id'] == user_id), 
            None
        )
        
        private_info = next(
            (p for p in self.user_data.get('User_privateinformation', []) if p['user_id'] == user_id), 
            {}
        )
        
        if not user:
            raise ValueError(f"未找到用户 {user_id}")
        
        # 合并公开和私密信息
        user_profile = {**user, **private_info}
        return user_profile

def main():
    """
    演示推荐流水线使用
    """
    pipeline = RecommendationPipeline()
    
    # 选择一个示例用户
    example_user_id = "U87523"
    
    # 获取用户资料
    user_profile = pipeline.get_user_profile(example_user_id)
    print("用户资料:")
    for key, value in user_profile.items():
        print(f"{key}: {value}")
    
    # 推荐文章
    recommendations = pipeline.recommend_articles(example_user_id)
    
    print("\n为用户推荐的文章:")
    for idx, article in enumerate(recommendations, 1):
        print(f"{idx}. 标题: {article['title']}")
        print(f"   文章ID: {article['post_id']}")
        print(f"   摘要: {article['text'][:100]}...\n")

if __name__ == "__main__":
    main()
