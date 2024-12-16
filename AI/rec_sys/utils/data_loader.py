import os
import json
from typing import List, Dict, Tuple, Optional

def load_mock_data() -> Tuple[List[Dict], List[Dict]]:
    """
    Load mock data for testing recommendation algorithms
    
    Returns:
        Tuple[List[Dict], List[Dict]]: Mock users and articles data
    """
    mock_users = [
        {'user_id': f'user_{i}', 'name': f'User {i}', 'interests': ['tech', 'science']} 
        for i in range(10)
    ]
    
    mock_articles = [
        {'post_id': f'article_{i}', 'title': f'Article {i}', 'category': 'tech', 'user_id': f'user_{i%10}'} 
        for i in range(20)
    ]
    
    return mock_users, mock_articles

class DataLoader:
    @staticmethod
    def load_data(data_type: str, custom_path: Optional[str] = None) -> List[Dict]:
        """
        Load data from JSON files
        
        Args:
            data_type (str): Type of data to load ('users', 'articles')
            custom_path (Optional[str]): Custom path to data file
        
        Returns:
            List[Dict]: Loaded data
        """
        # If custom path is provided, use it
        if custom_path:
            file_path = custom_path
        else:
            # Default path
            base_path = os.path.join(os.path.dirname(__file__), '..', '..', 'data')
            
            file_mapping = {
                'users': 'user.json',
                'articles': 'article.json'
            }
            
            if data_type not in file_mapping:
                raise ValueError(f"Invalid data type: {data_type}")
            
            file_path = os.path.join(base_path, file_mapping[data_type])
        
        # Validate file exists
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Data file not found: {file_path}")
        
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        # Return the list of items based on the first key in the JSON
        key = list(data.keys())[0]
        return data[key]
    
    @staticmethod
    def preprocess_data(users: List[Dict], articles: List[Dict]) -> Tuple[List[Dict], List[Dict]]:
        """
        Preprocess and clean data for recommendation algorithms
        
        Args:
            users (List[Dict]): List of user data
            articles (List[Dict]): List of article data
        
        Returns:
            Tuple of preprocessed users and articles
        """
        # Basic preprocessing: remove invalid entries
        valid_users = [u for u in users if u.get('user_id')]
        valid_articles = [a for a in articles if a.get('post_id') and a.get('user_id')]
        
        return valid_users, valid_articles
