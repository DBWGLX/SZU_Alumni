from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import os


def login(driver, username, password, key="ssasfasa"):
    login_url = "https://www1.szu.edu.cn/board/infolist.asp?"
    driver.get(login_url)
    import time  # 导入time模块
    time.sleep(30)


def search(driver, year, unit):
    select_day = Select(driver.find_element(By.NAME, 'dayy'))
    select_day.select_by_value(year)
    select_unit = Select(driver.find_element(By.NAME, 'from_username'))
    select_unit.select_by_value(unit)
    search_button = driver.find_element(By.NAME, 'searchb1')
    search_button.click()


def init():
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    login(driver, "", "")
    return driver


driver = init()

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
from bs4 import BeautifulSoup

# 确保在代码开头已设置 driver 的隐式等待时间
driver.implicitly_wait(1)
years = ["2024", "2023"]  # "2023", "2022","2021, 2020, 2019, 2018 "
units = [
    "党政办公室", "组织部", "统战部", "宣传部", "纪检（监察）室", "校工会", "妇女委员会", "校团委",
    "教务部", "招生办公室", "创新创业教育中心", "继续教育管理办公室", "研究生院", "发展规划部", "社会科学部",
    "学报社科版", "科学技术发展研究院", "学报理工版", "学生部", "党委学工部", "沧海学生社区管理委员会",
    "时光学生社区管理委员会", "文山湖学生社区管理委员会", "惟品学生社区管理委员会", "洗星学生社区管理委员会",
    "国际交流与合作部", "人力资源部", "党委教师工作部", "计划财务部", "招投标管理中心", "实验室与国有资产管理部",
    "审计室", "后勤保障部", "后勤保障部党委", "安全保卫部", "离退休办公室", "校友联络部（教育发展基金会）",
    "机关党委", "丽湖校区管理办公室", "合规建设领导小组办公室", "教育学部", "艺术学部", "医学部",
    "马克思主义学院", "经济学院", "法学院", "心理学院", "体育学院", "人文学院", "外国语学院",
    "传播学院", "数学科学学院", "物理与光电工程学院", "化学与环境工程学院", "生命与海洋科学学院",
    "机电与控制工程学院", "材料学院", "电子与信息工程学院", "计算机与软件学院", "建筑与城市规划学院",
    "土木与交通工程学院", "管理学院", "政府管理学院", "高等研究院", "金融科技学院", "国际交流学院",
    "继续教育学院", "图书馆", "图书馆党总支", "档案馆", "信息中心", "信息中心党总支", "资产经营公司",
    "技术转化中心", "深大总医院", "深大附属华南医院", "深大直属口腔医院筹建办公室", "校医院",
    "附属教育集团", "深大附属中学", "深大附属实验中学", "射频异质异构集成全国重点实验室",
    "人工智能与数字经济广东省实验室（深圳）", "深圳香蜜湖国际金融科技研究院",
    "大数据系统计算技术国家工程实验室", "微纳光电子学研究院", "中国经济特区研究中心",
    "港澳基本法研究中心", "文化产业研究院", "美学与文艺批评研究院", "饶宗颐文化研究院",
    "区域国别与国际传播研究院", "创新技术研究院", "心理健康教育与咨询中心"
]

# 遍历年份和单位
for year in years:
    for unit in units:
        base_url = "https://www1.szu.edu.cn/board/"
        driver.get(base_url)
        search(driver, year, unit)

        # 使用显式等待，等待页面中的表格加载完成
        WebDriverWait(driver, 1).until(
            EC.presence_of_element_located((By.TAG_NAME, "table"))
        )

        html_content = driver.page_source
        soup = BeautifulSoup(html_content, 'html.parser')

        # 创建目标文件夹
        target_folder = "data/" + year + "_" + unit
        if not os.path.exists(target_folder):
            os.makedirs(target_folder)

        news_links = []
        news_classes = []
        for tr in soup.find_all("tr"):
            tds = tr.find_all("td")
            if len(tds) == 6:
                a_class = tds[1].find("a")
                if a_class:
                    news_classes.append(a_class["href"][-2:])
                a_tag = tds[3].find("a")
                try:
                    news_links.append(a_tag["href"])
                except:
                    continue

        # 写入链接和类别信息
        with open(os.path.join(target_folder, "_msg.txt"), 'w', encoding='utf-8') as f:
            for index, link in enumerate(news_links[:40]):
                f.write(link.split("id=")[-1] + " " + news_classes[index] + "\n")

        # 下载每个链接对应的页面
        for index, link in enumerate(news_links[:40]):
            download_url = base_url + link
            driver.get(download_url)

            # 等待页面加载完成
            WebDriverWait(driver, 1).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )

            # 保存页面源代码
            file_name = os.path.join(target_folder, link.split("id=")[-1] + ".html")
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(driver.page_source)
            print(f"Downloaded {download_url} to {file_name}")
