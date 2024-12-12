import torch
import torch.nn as nn
import numpy as np
from typing import List, Dict, Optional

# Ensure the code can run without CUDA by using default device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class FactorizationMachineRecommender:
    def __init__(self, users: List[Dict], articles: List[Dict], embedding_dim: int = 10):
        """
        Initialize Factorization Machines Recommender
        
        Args:
            users (List[Dict]): List of user profiles
            articles (List[Dict]): List of articles
            embedding_dim (int, optional): Dimension of latent factors. Defaults to 10.
        """
        self.users = users
        self.articles = articles
        self.embedding_dim = embedding_dim
        
        # Feature mapping
        self.feature_to_index = self._prepare_feature_mappings()
        
        # FM Model
        self.model = FactorizationMachineModel(
            num_features=len(self.feature_to_index), 
            embedding_dim=embedding_dim
        ).to(device)
        
        # Train the model
        self._train_model()
    
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
        
        return feature_vector.to(device)
    
    def _train_model(self, epochs: int = 100):
        """Train Factorization Machine model"""
        optimizer = torch.optim.Adam(self.model.parameters())
        criterion = nn.BCELoss()
        
        for _ in range(epochs):
            for user in self.users:
                for article in self.articles:
                    # Create feature vector
                    user_vector = self._create_feature_vector(user, 'user')
                    article_vector = self._create_feature_vector(article, 'article')
                    
                    # Combine vectors
                    combined_vector = torch.cat([user_vector, article_vector])
                    
                    # Predict interaction probability
                    prediction = self.model(combined_vector)
                    
                    # Dummy training with random labels
                    target = torch.rand(1).to(device)
                    loss = criterion(prediction, target)
                    
                    optimizer.zero_grad()
                    loss.backward()
                    optimizer.step()
    
    def recommend(self, user_id: str, top_k: int = 5) -> List[Dict]:
        """
        Recommend articles using Factorization Machines
        
        Args:
            user_id (str): Target user ID
            top_k (int, optional): Number of recommendations. Defaults to 5.
        
        Returns:
            List[Dict]: Top k recommended articles
        """
        user = next((u for u in self.users if u['user_id'] == user_id), None)
        if not user:
            return []
        
        # Create user feature vector
        user_vector = self._create_feature_vector(user, 'user')
        
        # Score articles
        article_scores = []
        for article in self.articles:
            article_vector = self._create_feature_vector(article, 'article')
            combined_vector = torch.cat([user_vector, article_vector])
            score = self.model(combined_vector).cpu().item()
            article_scores.append((article, score))
        
        # Sort and return top k articles
        recommended_articles = sorted(article_scores, key=lambda x: x[1], reverse=True)[:top_k]
        return [article for article, _ in recommended_articles]

class FactorizationMachineModel(nn.Module):
    def __init__(self, num_features: int, embedding_dim: int):
        """
        Factorization Machine Model
        
        Args:
            num_features (int): Total number of features
            embedding_dim (int): Dimension of latent factors
        """
        super().__init__()
        
        # Linear terms
        self.linear = nn.Linear(num_features, 1)
        
        # Embedding for pairwise interactions
        self.embeddings = nn.Embedding(num_features, embedding_dim)
        
        # Sigmoid for binary classification
        self.sigmoid = nn.Sigmoid()
    
    def forward(self, x):
        """
        Forward pass
        
        Args:
            x (torch.Tensor): Input feature tensor
        
        Returns:
            torch.Tensor: Predicted interaction probability
        """
        # Linear terms
        linear_term = self.linear(x)
        
        # Pairwise interactions
        embedding_term = self.embeddings(torch.arange(x.size(0), device=x.device))
        interaction_term = torch.sum(
            torch.pow(torch.sum(embedding_term * x.unsqueeze(1), dim=0), 2) - 
            torch.sum(torch.pow(embedding_term * x.unsqueeze(1), 2), dim=0)
        ) * 0.5
        
        # Combine terms
        output = linear_term + interaction_term
        return self.sigmoid(output)
