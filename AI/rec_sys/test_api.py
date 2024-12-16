import urllib.request
import json

BASE_URL = 'http://127.0.0.1:5000'
user_id = 'U26543'
# U26543 U87523
def test_health_check():
    """测试健康检查接口"""
    try:
        with urllib.request.urlopen(f'{BASE_URL}/health') as response:
            data = json.loads(response.read().decode('utf-8'))
            print("健康检查结果:")
            print(json.dumps(data, indent=2))
            assert response.status == 200, "健康检查失败"
    except Exception as e:
        print(f"健康检查错误: {e}")

def test_user_profile():
    """测试用户资料获取"""

    try:
        with urllib.request.urlopen(f'{BASE_URL}/user_profile/{user_id}') as response:
            data = json.loads(response.read().decode('utf-8'))
            print(f"\n用户 {user_id} 的资料:")
            print(json.dumps(data, indent=2))
            assert response.status == 200, f"获取用户 {user_id} 资料失败"
    except Exception as e:
        print(f"获取用户资料错误: {e}")

def test_article_recommendation():
    """测试文章推荐"""
    try:
        with urllib.request.urlopen(f'{BASE_URL}/recommend/{user_id}') as response:
            recommendations = json.loads(response.read().decode('utf-8'))
            print(f"\n为用户 {user_id} 推荐的文章:")
            for idx, article in enumerate(recommendations, 1):
                print(f"{idx}. 标题: {article.get('title', '无标题')}")
                print(f"   文章ID: {article.get('post_id', '无ID')}")
                print(f"   摘要: {article.get('text', '无内容')[:100]}...\n")
            assert response.status == 200, f"获取用户 {user_id} 推荐文章失败"
    except Exception as e:
        print(f"获取文章推荐错误: {e}")

def main():
    """执行所有API测试"""
    try:
        test_health_check()
        test_user_profile()
        test_article_recommendation()
        print("所有API测试通过！")
    except AssertionError as e:
        print(f"API测试失败: {e}")

if __name__ == '__main__':
    main()
