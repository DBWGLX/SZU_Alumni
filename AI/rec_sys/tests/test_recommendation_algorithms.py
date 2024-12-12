import pytest
import torch
import numpy as np
from algorithms.embedding_recommender import EmbeddingRecommender
from algorithms.fm_recommender import FactorizationMachineRecommender
from utils.data_loader import load_mock_data

class TestRecommendationAlgorithms:
    @classmethod
    def setup_class(cls):
        """
        Setup test data and recommendation models
        """
        # Load mock data
        cls.users, cls.articles = load_mock_data()
        
        # Initialize recommenders
        cls.embedding_recommender = EmbeddingRecommender(
            users=cls.users, 
            articles=cls.articles, 
            embedding_dim=50
        )
        
        cls.fm_recommender = FactorizationMachineRecommender(
            users=cls.users, 
            articles=cls.articles, 
            embedding_dim=10
        )
        
        # Test user IDs
        cls.test_user_ids = [user['user_id'] for user in cls.users[:5]]
    
    def test_embedding_recommender_basic(self):
        """
        Test basic functionality of Embedding Recommender
        """
        # Test with first user
        recommendations = self.embedding_recommender.recommend(self.test_user_ids[0])
        
        # Check recommendations
        assert len(recommendations) > 0, "Embedding recommender should return recommendations"
        assert len(recommendations) <= 5, "Default recommendations should be limited to 5"
        
        # Verify recommendation structure
        for article in recommendations:
            assert 'post_id' in article, "Each recommendation should be an article dictionary"
    
    def test_embedding_recommender_top_k(self):
        """
        Test top_k parameter for Embedding Recommender
        """
        # Test with different k values
        for k in [1, 3, 10]:
            max_recommendations = self.embedding_recommender.recommend(
                self.test_user_ids[0], 
                top_k=k
            )
            assert 0 < len(max_recommendations) <= k, \
                f"Embedding recommender should respect top_k={k} parameter"
    
    def test_embedding_recommender_no_user(self):
        """
        Test Embedding Recommender with non-existent user
        """
        no_user_recommendations = self.embedding_recommender.recommend('non_existent_user')
        assert len(no_user_recommendations) == 0, \
            "Recommender should return empty list for non-existent user"
    
    def test_fm_recommender_basic(self):
        """
        Test basic functionality of Factorization Machine Recommender
        """
        # Test with first user
        recommendations = self.fm_recommender.recommend(self.test_user_ids[0])
        
        # Check recommendations
        assert len(recommendations) > 0, "FM recommender should return recommendations"
        assert len(recommendations) <= 5, "Default recommendations should be limited to 5"
        
        # Verify recommendation structure
        for article in recommendations:
            assert 'post_id' in article, "Each recommendation should be an article dictionary"
    
    def test_fm_recommender_top_k(self):
        """
        Test top_k parameter for Factorization Machine Recommender
        """
        # Test with different k values
        for k in [1, 3, 10]:
            max_recommendations = self.fm_recommender.recommend(
                self.test_user_ids[0], 
                top_k=k
            )
            assert 0 < len(max_recommendations) <= k, \
                f"FM recommender should respect top_k={k} parameter"
    
    def test_fm_recommender_no_user(self):
        """
        Test Factorization Machine Recommender with non-existent user
        """
        no_user_recommendations = self.fm_recommender.recommend('non_existent_user')
        assert len(no_user_recommendations) == 0, \
            "Recommender should return empty list for non-existent user"
    
    def test_recommender_determinism(self):
        """
        Test that recommendations are somewhat consistent across multiple calls
        """
        # Get initial recommendations
        initial_recommendations = self.embedding_recommender.recommend(self.test_user_ids[0])
        
        # Repeat recommendations
        repeated_recommendations = self.embedding_recommender.recommend(self.test_user_ids[0])
        
        # Check similarity (not exact match due to randomness in training)
        assert len(initial_recommendations) == len(repeated_recommendations), \
            "Number of recommendations should be consistent"
        
        # Check some overlap in recommendations
        initial_post_ids = {rec['post_id'] for rec in initial_recommendations}
        repeated_post_ids = {rec['post_id'] for rec in repeated_recommendations}
        
        assert len(initial_post_ids.intersection(repeated_post_ids)) > 0, \
            "Some recommendations should be consistent across multiple calls"
    
    def test_embedding_model_training(self):
        """
        Test that embedding models have been trained
        """
        # Check user embedding model parameters
        user_params = list(self.embedding_recommender.user_model.parameters())
        assert len(user_params) > 0, "User embedding model should have trainable parameters"
        
        # Check article embedding model parameters
        article_params = list(self.embedding_recommender.article_model.parameters())
        assert len(article_params) > 0, "Article embedding model should have trainable parameters"
    
    def test_feature_mapping(self):
        """
        Test feature mapping functionality
        """
        # Check embedding recommender feature mapping
        embedding_features = self.embedding_recommender.feature_to_index
        assert len(embedding_features) > 0, "Feature mapping should not be empty"
        
        # Check FM recommender feature mapping
        fm_features = self.fm_recommender.feature_to_index
        assert len(fm_features) > 0, "Feature mapping should not be empty"
        
        # Verify feature names
        sample_user = self.users[0]
        expected_major_feature = f"major_{sample_user.get('user_major', 'unknown')}"
        expected_job_feature = f"job_{sample_user.get('user_job', 'unknown')}"
        
        assert expected_major_feature in embedding_features, "Major feature should be in mapping"
        assert expected_job_feature in embedding_features, "Job feature should be in mapping"
