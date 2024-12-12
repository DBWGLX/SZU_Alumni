import torch
import torch.nn as nn
import faiss
import numpy as np
from typing import List, Dict, Optional

# Ensure the code can run without CUDA by using default device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class EmbeddingRecommender:
    def __init__(self, users: List[Dict], articles: List[Dict], embedding_dim: int = 50):
        """
        Initialize Embedding Recommender with Faiss ANN search
        
        Args:
            users (List[Dict]): List of user profiles
            articles (List[Dict]): List of articles
            embedding_dim (int, optional): Dimension of embeddings. Defaults to 50.
        """
        self.users = users
        self.articles = articles
        self.embedding_dim = embedding_dim
        
        # Feature mapping
        self.feature_to_index = self._prepare_feature_mappings()
        
        # Embedding models
        self.user_model = UserEmbeddingModel(len(self.feature_to_index), embedding_dim).to(device)
        self.article_model = ArticleEmbeddingModel(len(self.feature_to_index), embedding_dim).to(device)
        
        # Train embeddings
        self._train_embeddings()
        
        # Build Faiss index
        self._build_faiss_index()
    
    def _prepare_feature_mappings(self) -> Dict[str, int]:
        """Create feature to index mapping"""
        features = set()
        for user in self.users:
            features.add(f"major_{user.get('user_major', 'unknown')}")
            features.add(f"job_{user.get('user_job', 'unknown')}")
        
        for article in self.articles:
            features.add(f"article_{article['post_id']}")
        
        return {feature: idx for idx, feature in enumerate(sorted(features))}
    
    def _create_feature_vector(self, item: Dict, item_type: str) -> torch.Tensor:
        """Create feature vector for a user or article"""
        feature_vector = torch.zeros(len(self.feature_to_index))
        
        if item_type == 'user':
            major_feature = f"major_{item.get('user_major', 'unknown')}"
            job_feature = f"job_{item.get('user_job', 'unknown')}"
        else:  # article
            major_feature = f"article_{item['post_id']}"
            job_feature = None
        
        feature_vector[self.feature_to_index[major_feature]] = 1
        if job_feature and job_feature in self.feature_to_index:
            feature_vector[self.feature_to_index[job_feature]] = 1
        
        return feature_vector.unsqueeze(0).to(device)
    
    def _train_embeddings(self, epochs: int = 50):
        """Train embedding models"""
        optimizer_user = torch.optim.Adam(self.user_model.parameters())
        optimizer_article = torch.optim.Adam(self.article_model.parameters())
        criterion = nn.BCELoss()
        
        for _ in range(epochs):
            for user in self.users:
                user_vector = self._create_feature_vector(user, 'user')
                user_embedding = self.user_model(user_vector)
                
                # Dummy loss to train embeddings
                loss = criterion(user_embedding, torch.rand_like(user_embedding))
                optimizer_user.zero_grad()
                loss.backward()
                optimizer_user.step()
            
            for article in self.articles:
                article_vector = self._create_feature_vector(article, 'article')
                article_embedding = self.article_model(article_vector)
                
                # Dummy loss to train embeddings
                loss = criterion(article_embedding, torch.rand_like(article_embedding))
                optimizer_article.zero_grad()
                loss.backward()
                optimizer_article.step()
    
    def _build_faiss_index(self):
        """Build Faiss index for fast nearest neighbor search"""
        article_embeddings = []
        
        for article in self.articles:
            article_vector = self._create_feature_vector(article, 'article')
            embedding = self.article_model(article_vector).detach().cpu().numpy()
            article_embeddings.append(embedding.flatten())
        
        # Create Faiss index
        index = faiss.IndexFlatL2(self.embedding_dim)
        index.add(np.array(article_embeddings))
        self.faiss_index = index
    
    def recommend(self, user_id: str, top_k: int = 5) -> List[Dict]:
        """
        Recommend articles for a user using embedding similarity
        
        Args:
            user_id (str): Target user ID
            top_k (int, optional): Number of recommendations. Defaults to 5.
        
        Returns:
            List[Dict]: Top k recommended articles
        """
        user = next((u for u in self.users if u['user_id'] == user_id), None)
        if not user:
            return []
        
        # Get user embedding
        user_vector = self._create_feature_vector(user, 'user')
        user_embedding = self.user_model(user_vector).detach().cpu().numpy()
        
        # Find nearest neighbors
        distances, indices = self.faiss_index.search(user_embedding, top_k)
        
        recommended_articles = [
            self.articles[idx] for idx in indices[0]
        ]
        
        return recommended_articles

class UserEmbeddingModel(nn.Module):
    def __init__(self, input_dim: int, embedding_dim: int):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),
            nn.Linear(64, embedding_dim),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        return self.network(x)

class ArticleEmbeddingModel(nn.Module):
    def __init__(self, input_dim: int, embedding_dim: int):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),
            nn.Linear(64, embedding_dim),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        return self.network(x)
