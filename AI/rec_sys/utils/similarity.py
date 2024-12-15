from typing import Dict

def calculate_user_similarity(user1: Dict, user2: Dict) -> float:
    """
    Calculate similarity between two users based on their profiles.
    
    Args:
        user1 (Dict): First user's profile
        user2 (Dict): Second user's profile
    
    Returns:
        float: Similarity score between 0 and 1
    """
    similarity_score = 0.0
    
    # Major similarity (high weight)
    if user1.get('user_major') == user2.get('user_major'):
        similarity_score += 0.4
    
    # Job similarity (medium weight)
    if user1.get('user_job') == user2.get('user_job'):
        similarity_score += 0.3
    
    # Sex similarity (low weight)
    if user1.get('user_sex') == user2.get('user_sex'):
        similarity_score += 0.1
    
    return min(similarity_score, 1.0)

def cosine_similarity(vec1, vec2):
    """
    Compute cosine similarity between two vectors
    
    Args:
        vec1 (List[float]): First vector
        vec2 (List[float]): Second vector
    
    Returns:
        float: Cosine similarity score
    """
    import numpy as np
    
    # Convert to numpy arrays
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    
    # Compute cosine similarity
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    
    # Avoid division by zero
    if norm_vec1 == 0 or norm_vec2 == 0:
        return 0.0
    
    return dot_product / (norm_vec1 * norm_vec2)
