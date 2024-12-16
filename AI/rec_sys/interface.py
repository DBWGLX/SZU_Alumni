import os
import sys
import importlib
from typing import List, Dict, Optional

# Add the parent directory to the Python path to enable absolute imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Dynamically import recommender algorithms
try:
    from rec_sys.algorithms.fm_recommender import FactorizationMachineRecommender
    from rec_sys.algorithms.embedding_ann_recommender import EmbeddingANNRecommender
    from rec_sys.algorithms.content_based import ContentBasedRecommender
    from rec_sys.algorithms.collaborative_filtering import CollaborativeFilteringRecommender
    RECOMMENDER_MODULES = {
        'fm': FactorizationMachineRecommender,
        'embedding': EmbeddingANNRecommender,
        'content': ContentBasedRecommender,
        'collaborative': CollaborativeFilteringRecommender
    }
except ImportError:
    # Fallback if torch is not available
    RECOMMENDER_MODULES = {}

class RecommendationEngine:
    """
    A flexible recommendation engine that supports multiple recommendation algorithms
    """
    def __init__(self, 
                 users_path: Optional[str] = None, 
                 articles_path: Optional[str] = None,
                 algorithm: str = 'content'):
        """
        Initialize the recommendation engine
        
        Args:
            users_path (Optional[str]): Path to users data
            articles_path (Optional[str]): Path to articles data
            algorithm (str, optional): Initial recommendation algorithm. Defaults to 'content'.
        """
        # Load data
        from rec_sys.utils.data_loader import DataLoader
        users = DataLoader.load_data('users', users_path)
        articles = DataLoader.load_data('articles', articles_path)
        
        # Preprocess data
        users, articles = DataLoader.preprocess_data(users, articles)
        
        # Initialize recommender
        self.users = users
        self.articles = articles
        self.current_algorithm = algorithm
        self._init_recommender()
    
    def _init_recommender(self):
        """
        Initialize recommender based on current algorithm
        """
        if not RECOMMENDER_MODULES:
            raise ImportError("No recommendation algorithms available")
        
        # Get recommender class for current algorithm
        recommender_class = RECOMMENDER_MODULES.get(self.current_algorithm)
        if not recommender_class:
            raise ValueError(f"Algorithm {self.current_algorithm} not found")
        
        # Initialize recommender
        self.recommender = recommender_class(
            users=self.users, 
            articles=self.articles
        )
    
    def switch_algorithm(self, algorithm: str):
        """
        Switch recommendation algorithm
        
        Args:
            algorithm (str): Target algorithm name
        """
        if algorithm not in RECOMMENDER_MODULES:
            raise ValueError(f"Algorithm {algorithm} not available")
        
        self.current_algorithm = algorithm
        self._init_recommender()
    
    def recommend(self, user_id: str, top_k: int = 5) -> List[Dict]:
        """
        Get top k recommendations for a user
        
        Args:
            user_id (str): Target user ID
            top_k (int, optional): Number of recommendations. Defaults to 5.
        
        Returns:
            List[Dict]: Top k recommended articles
        """
        return self.recommender.recommend(user_id, top_k)

def get_top_k_articles(user_id: str, 
                       algorithm: str = 'content', 
                       users_path: Optional[str] = None, 
                       articles_path: Optional[str] = None,
                       top_k: int = 5) -> List[Dict]:
    """
    Get top k articles for a user using a specific algorithm
    
    Args:
        user_id (str): Target user ID
        algorithm (str, optional): Recommendation algorithm. Defaults to 'content'.
        users_path (Optional[str]): Path to users data
        articles_path (Optional[str]): Path to articles data
        top_k (int, optional): Number of recommendations. Defaults to 5.
    
    Returns:
        List[Dict]: Top k recommended articles
    """
    # Load data
    from rec_sys.utils.data_loader import DataLoader
    users = DataLoader.load_data('users', users_path)
    articles = DataLoader.load_data('articles', articles_path)
    
    # Preprocess data
    users, articles = DataLoader.preprocess_data(users, articles)
    
    # Get recommender class
    recommender_class = RECOMMENDER_MODULES.get(algorithm)
    if not recommender_class:
        raise ValueError(f"Algorithm {algorithm} not available")
    
    # Initialize and recommend
    recommender = recommender_class(users=users, articles=articles)
    return recommender.recommend(user_id, top_k)

# Example usage
if __name__ == '__main__':
    # Example of using different recommendation algorithms
    sample_user_id = 'U87523'
    
    print("Content-Based Recommendations:")
    content_recs = get_top_k_articles(sample_user_id, algorithm='content')
    for article in content_recs:
        print(f"Title: {article['title']}")
    
    print("\nCollaborative Filtering Recommendations:")
    collab_recs = get_top_k_articles(sample_user_id, algorithm='collaborative')
    for article in collab_recs:
        print(f"Title: {article['title']}")
    
    print("\nFactorization Machine Recommendations:")
    fm_recs = get_top_k_articles(sample_user_id, algorithm='fm')
    for article in fm_recs:
        print(f"Title: {article['title']}")
    
    print("\nEmbedding + ANN Recommendations:")
    embedding_recs = get_top_k_articles(sample_user_id, algorithm='embedding')
    for article in embedding_recs:
        print(f"Title: {article['title']}")
