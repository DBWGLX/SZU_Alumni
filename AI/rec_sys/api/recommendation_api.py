from flask import Flask, jsonify, request
from algorithms.recommendation_pipeline import RecommendationPipeline

app = Flask(__name__)
recommendation_pipeline = RecommendationPipeline()

@app.route('/user_profile/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    """
    获取用户详细资料
    
    :param user_id: 用户ID
    :return: JSON格式的用户资料
    """
    try:
        user_profile = recommendation_pipeline.get_user_profile(user_id)
        return jsonify(user_profile), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@app.route('/recommend/<user_id>', methods=['GET'])
def recommend_articles(user_id):
    """
    为用户推荐文章
    
    :param user_id: 用户ID
    :return: JSON格式的推荐文章列表
    """
    try:
        top_k = int(request.args.get('top_k', 5))
        recommendations = recommendation_pipeline.recommend_articles(user_id, top_k)
        return jsonify(recommendations), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "内部服务器错误"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    健康检查接口
    
    :return: JSON格式的健康状态
    """
    return jsonify({
        "status": "healthy",
        "message": "推荐系统API正常运行"
    }), 200

def create_app():
    """
    创建并配置Flask应用
    
    :return: 配置好的Flask应用
    """
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
