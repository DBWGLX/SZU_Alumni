import requests
import json
from datetime import datetime
# 定义基础URL
base_url = "http://localhost:8080/discuss"

# 插入动态
post_data = {
    "id": "2",
    "time": "2023-10-10T10:10:09",
    "detailTop": "发帖标题",
    "detailAll": "发帖内容正文",
    "dePic": ["data:image/jepg;Base64,1234"]
}
response = requests.post(f"{base_url}/list", json=post_data)
print("插入动态回复:")
print(response.json())

# 获取插入的动态ID
moment_id = response.json().get("discus")


# 查询动态
search_data = {
    "id": "2",
    "time": "2023-10-10T10:10:13",
    "begin": 0,
    "number": 10
}
response = requests.get(f"{base_url}/list", params=search_data)
print("查询动态回复:")
print(response.json())

# 根据ID查询具体的帖子正文
search_by_id_data = {
    "id": moment_id,
    "time": "2023-10-10T10:10:14"
}
response = requests.get(f"{base_url}/list/text", params=search_by_id_data)
print("根据ID查询具体的帖子正文回复:")
print(response.json())

# 根据用户ID查询动态
search_by_user_data = {
    "id": "2",
    "time": "2023-10-10T10:10:15"
}
response = requests.get(f"{base_url}/list/byuser", params=search_by_user_data)
print("根据用户ID查询动态回复:")
print(response.json())
#根据关键字查询帖子

search = {
    "keyword" : "发帖"
}
response = requests.get(f"{base_url}/api/search", params=search)
print("根据关键字查询帖子:")
print(response.json())
    #发布评论
for i in range(5):
    pdata = {
            "id": 1,
            "time": "2023-10-10T10:10:15",
            "detail": "这是一个测试评论",
            "disId": moment_id
        }
    response = requests.post(f"{base_url}/detail", json=pdata)
    print("评论回复:")
    print(response.json())

    # 获取评论
    params = {
            "disId": moment_id,
            "id": 1,
            "time": "2023-10-10T10:10:15"
        }
    response = requests.get(f"{base_url}/list/detail", params=params)
    # 检查响应状态码
    if response.status_code == 200:
        # 打印响应内容
        print("获取帖子评论回复:")
        print(response.json())
    else:
        print(f"请求失败，状态码: {response.status_code}")
        print(f"响应内容: {response.text}")

# 随机获取动态
response = requests.get(f"{base_url}/list/random",params ={"num":5})
print ("随机获取动态")
print(response.json())



# 删除动态
# delete_data = {
#     "id": "2",
#     "time": "2023-10-10T10:10:17",
#     "disId": moment_id
# }
# response = requests.delete(f"{base_url}/list", json=delete_data)
# print("删除动态回复:")
# print(response.json())

