# Alumni Article Recommendation System

## Overview
This recommendation system provides personalized article recommendations for alumni using multiple recommendation strategies.

## Features
- Multiple recommendation algorithms:
  1. Content-Based Filtering
  2. Collaborative Filtering
  3. Factorization Machines
  4. Embedding + Approximate Nearest Neighbors (ANN)
- Flexible algorithm switching
- Personalized recommendations

## Installation
```bash
# Required dependencies
pip install numpy torch scikit-learn
```

## Usage
```python
from rec_sys import get_top_k_articles

# Get top 5 recommended articles using content-based algorithm
user_id = 'U87523'
content_recommendations = get_top_k_articles(user_id, algorithm='content')

# Switch to collaborative filtering
collab_recommendations = get_top_k_articles(user_id, algorithm='collaborative')

# Or use the RecommendationEngine for more control
from rec_sys.interface import RecommendationEngine

# Initialize with a specific algorithm
engine = RecommendationEngine(algorithm='fm')
fm_recommendations = engine.recommend(user_id)

# Switch algorithms dynamically
engine.switch_algorithm('embedding')
embedding_recommendations = engine.recommend(user_id)
```

## Recommendation Strategies

### 1. Content-Based Filtering
- Recommends articles based on user profile similarities
- Considers major, job, and user characteristics

### 2. Collaborative Filtering
- Recommends articles based on user interaction patterns
- Uses cosine similarity between user interaction vectors

### 3. Factorization Machines
- Advanced matrix factorization technique
- Captures complex feature interactions
- Learns latent factors for users and articles

### 4. Embedding + ANN
- Learns dense vector representations of users and articles
- Uses Approximate Nearest Neighbors for fast retrieval
- Captures semantic relationships

## Project Structure
- `algorithms/`: Different recommendation algorithm implementations
- `utils/`: Utility functions for data loading and processing
- `interface.py`: Unified recommendation interface
- `tests/`: Unit tests for recommendation algorithms

## Requirements
- Python 3.8+
- NumPy
- PyTorch
- Scikit-learn

## Testing
```bash
# Run all tests
python3 -m unittest discover tests
```

## Future Enhancements
- Add more recommendation algorithms
- Improve embedding techniques
- Implement online learning
- Add more sophisticated feature engineering
