from typing import List, Dict
from datetime import datetime
from ..utils import calculate_user_similarity

class ContentBasedRecommender:
    def __init__(self, users: List[Dict], articles: List[Dict]):
        """
        Initialize Content-Based Recommender
        
        Args:
            users (List[Dict]): List of user profiles
            articles (List[Dict]): List of articles
        """
        self.users = users
        self.articles = articles
    
    def recommend(self, user_id: str, top_k: int = 5) -> List[Dict]:
        """
        Recommend articles based on content similarity
        
        Args:
            user_id (str): Target user ID
            top_k (int, optional): Number of recommendations. Defaults to 5.
        
        Returns:
            List[Dict]: Top k recommended articles
        """
        # Find the target user
        target_user = next((u for u in self.users if u['user_id'] == user_id), None)
        if not target_user:
            return []
        
        def score_article(article):
            """
            Score an article based on multiple factors
            """
            score = 0.0
            
            # Find article's author
            article_user = next((u for u in self.users if u['user_id'] == article['user_id']), None)
            
            if article_user:
                # User similarity component
                user_similarity = calculate_user_similarity(target_user, article_user)
                score += user_similarity * 0.5
                
                # Major and job relevance
                if article_user.get('user_major') == target_user.get('user_major'):
                    score += 0.3
                if article_user.get('user_job') == target_user.get('user_job'):
                    score += 0.2
            
            # Recency bonus
            try:
                article_date = datetime.fromisoformat(article['date'])
                days_since_publication = (datetime.now() - article_date).days
                recency_score = max(0, 1 - (days_since_publication / 365))  # Decay over a year
                score += recency_score * 0.2
            except:
                pass
            
            return score
        
        # Sort articles by score and return top k
        scored_articles = sorted(self.articles, key=score_article, reverse=True)
        return scored_articles[:top_k]
