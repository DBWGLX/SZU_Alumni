import os

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait

years = ["2020", "2019", "2018", "2017", "2016"]
units = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]

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
        target_folder = "data/"+year+"_"+unit
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