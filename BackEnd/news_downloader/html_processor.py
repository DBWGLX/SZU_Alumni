import os
import json
import re

# 设置源目录和目标文件路径
source_directory = r"D:\homework\2023-1l\IR\final_ex\data"
target_json_path = r"D:\homework\2023-1l\IR\final_ex\gwt_data\output.json"


# 读取指定路径下 _msg.txt 中的映射信息
def parse_msg_file(msg_file_path):
    mapping = {}
    with open(msg_file_path, 'r', encoding='utf-8') as f:
        for line in f:
            parts = line.strip().split()
            if len(parts) >= 6:
                index, category, create_time, update_time = parts[0], parts[1], parts[2] + " " + parts[3], parts[
                    4] + " " + parts[5]
                mapping[index] = {
                    "category": category,
                    "create_time": create_time,
                    "update_time": update_time
                }
    return mapping


# 递归处理所有 txt 文件
def process_txt_files(source_dir):
    data = []
    for root, _, files in os.walk(source_dir):
        # 在当前目录中查找 _msg.txt 文件
        msg_file_path = os.path.join(root, "_msg.txt")
        if os.path.isfile(msg_file_path):
            mapping = parse_msg_file(msg_file_path)
        else:
            mapping = {}

        for file_name in files:
            # 只处理以 .txt 结尾的文件，排除 _msg.txt 文件本身
            if file_name.endswith(".txt") and file_name != "_msg.txt":
                source_file_path = os.path.join(root, file_name)

                # 读取文件内容并切割
                with open(source_file_path, "r", encoding="utf-8") as file:
                    content = file.read().replace(" ", "")  # 去掉特殊空格字符
                    # 使用分隔符进行分割
                    if "—深圳大学内部网" in content:
                        last_index = content.rindex("—深圳大学内部网")
                        title = content[:last_index + 1].strip()
                        body = content[last_index + len("—深圳大学内部网"):].strip()
                    else:
                        # 如果没有分隔符，整个内容作为标题，内容为空
                        title = content
                        body = ""
                # 获取文件名中的 index（假设文件名格式是 `511834.txt`）
                doc_id = re.match(r"(\d+)\.txt", file_name).group(1)

                # 查找 index 对应的映射信息
                additional_info = mapping.get(doc_id, {
                    "category": "未知",
                    "create_time": "未知",
                    "update_time": "未知"
                })

                # 构建 JSON 数据结构
                file_data = {
                    "title": title.strip("— "),
                    "content": body,
                    "index": doc_id,
                    "directory": os.path.relpath(root, source_dir),
                    "category": additional_info["category"],
                    "create_time": additional_info["create_time"],
                    "update_time": additional_info["update_time"]
                }
                data.append(file_data)

    return data


# 主函数，执行文件处理并保存为 JSON 文件
def main():
    # 处理所有 txt 文件
    data = process_txt_files(source_directory)
    # 将数据保存为 JSON 文件
    with open(target_json_path, "w", encoding="utf-8") as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
    print("所有文件已处理完毕，并保存为 JSON 格式。")


# 执行主函数
main()
