import numpy as np
from typing import List, Dict
from ..utils import cosine_similarity

class CollaborativeFilteringRecommender:
    def __init__(self, users: List[Dict], articles: List[Dict]):
        """
        Initialize Collaborative Filtering Recommender
        
        Args:
            users (List[Dict]): List of user profiles
            articles (List[Dict]): List of articles
        """
        self.users = users
        self.articles = articles
        self._build_user_interaction_matrix()
    
    def _build_user_interaction_matrix(self):
        """
        Build user-article interaction matrix
        """
        # Create mappings
        self.user_id_to_index = {user['user_id']: idx for idx, user in enumerate(self.users)}
        self.article_id_to_index = {article['post_id']: idx for idx, article in enumerate(self.articles)}
        
        # Initialize interaction matrix
        self.interaction_matrix = np.zeros((len(self.users), len(self.articles)))
        
        # Populate interaction matrix (for this example, we'll use dummy interactions)
        for idx, user in enumerate(self.users):
            # Simulate interactions based on user's major and job
            for j, article in enumerate(self.articles):
                if (article['user_id'] in [u['user_id'] for u in self.users if 
                                           u.get('user_major') == user.get('user_major') or 
                                           u.get('user_job') == user.get('user_job')]):
                    self.interaction_matrix[idx, j] = 1.0
    
    def recommend(self, user_id: str, top_k: int = 5) -> List[Dict]:
        """
        Recommend articles using user-based collaborative filtering
        
        Args:
            user_id (str): Target user ID
            top_k (int, optional): Number of recommendations. Defaults to 5.
        
        Returns:
            List[Dict]: Top k recommended articles
        """
        # Find user index
        if user_id not in self.user_id_to_index:
            return []
        
        user_idx = self.user_id_to_index[user_id]
        
        # Compute similarities with other users
        user_similarities = []
        for other_idx in range(len(self.users)):
            if other_idx != user_idx:
                sim = cosine_similarity(
                    self.interaction_matrix[user_idx], 
                    self.interaction_matrix[other_idx]
                )
                user_similarities.append((other_idx, sim))
        
        # Sort similar users
        user_similarities.sort(key=lambda x: x[1], reverse=True)
        
        # Collect top similar users' interactions
        candidate_articles = {}
        for similar_user_idx, similarity in user_similarities[:5]:  # Top 5 similar users
            for article_idx, interaction in enumerate(self.interaction_matrix[similar_user_idx]):
                if interaction > 0:
                    article_id = self.articles[article_idx]['post_id']
                    candidate_articles[article_id] = candidate_articles.get(article_id, 0) + similarity
        
        # Sort candidate articles and return top k
        sorted_candidates = sorted(
            candidate_articles.items(), 
            key=lambda x: x[1], 
            reverse=True
        )
        
        # Convert to full article dictionaries
        recommended_articles = []
        for article_id, _ in sorted_candidates[:top_k]:
            article = next(a for a in self.articles if a['post_id'] == article_id)
            recommended_articles.append(article)
        
        return recommended_articles
