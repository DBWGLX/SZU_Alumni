import requests
import json

# 定义基础URL
base_url = "http://localhost:8080/discuss"

# 插入动态
post_data = {
    "id": "2",
    "time": "2023-10-10T10:10:09",
    "detailTop": "发帖标题",
    "detailAll": "发帖内容正文",
    "dePic": ["1234"]
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
response = requests.get(f"{base_url}/list", json=search_data)
print("查询动态回复:")
print(response.json())

# 根据ID查询具体的帖子正文
search_by_id_data = {
    "id": moment_id,
    "time": "2023-10-10T10:10:14"
}
response = requests.get(f"{base_url}/list/text", json=search_by_id_data)
print("根据ID查询具体的帖子正文回复:")
print(response.json())

# 根据用户ID查询动态
search_by_user_data = {
    "id": "2",
    "time": "2023-10-10T10:10:15"
}
response = requests.get(f"{base_url}/list/byuser", json=search_by_user_data)
print("根据用户ID查询动态回复:")
print(response.json())

# 随机获取动态
response = requests.get(f"{base_url}/list/random",json ={"num":5})
print ("随机获取动态")
print(response.json())

# 删除动态
delete_data = {
    "id": "2",
    "time": "2023-10-10T10:10:17",
    "disId": moment_id
}
response = requests.delete(f"{base_url}/list", json=delete_data)
print("删除动态回复:")
print(response.json())

