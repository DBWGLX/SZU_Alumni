import json
import random
from faker import Faker

fake = Faker()

# Generate simulated data for the User table
def generate_user_data():
    return {
        "user_id": f"U{str(random.randint(10000, 99999))}",
        "user_name": fake.first_name(),
        "user_job": random.choice(["Engineer", "Designer", "Manager", "Teacher", "Developer"]),
        "user_major": random.choice(["CS", "Math", "Physics", "History", "Art"]),
        "user_introduce": fake.sentence(nb_words=10),
        "user_sex": random.choice(["M", "F"]),
        "image_url": fake.image_url()
    }

# Generate simulated data for the User_base table
def generate_user_base_data(user_id, user_name):
    return {
        "user_id": user_id,
        "user_name": user_name,
        "image_url": fake.image_url()
    }

# Generate simulated data for the User_privateinformation table
def generate_user_privateinfo_data(user_id):
    return {
        "user_id": user_id,
        "user_homeland": fake.city(),
        "user_stdid": f"ST{str(random.randint(100000000000000, 999999999999999))}",
        "user_schoolyear": fake.date_this_century(),
        "user_state": random.choice([0, 1])
    }
def custom_serializer(obj):
    if isinstance(obj, date):
        return obj.isoformat()  # Convert date to ISO format
    raise TypeError(f"Type {type(obj)} not serializable")
   
# Generate simulated data for articles using user IDs from user.json
def generate_article_data_with_user(user_ids):
    return {
        "post_id": f"P{random.randint(10000, 99999)}",
        "text": fake.paragraph(nb_sentences=5),
        "user_id": random.choice(user_ids),  # Randomly select a user_id from user.json
        "date": fake.date_this_decade().isoformat(),  # Publish date
        "title": fake.sentence(nb_words=6)  # Title
    }
# Generate simulated data for the User_Connect table
def generate_user_connect_data(user_id):
    return {
        "user_id": user_id,
        "user_phone": fake.phone_number(),
        "user_email": fake.email(),
        "user_wechat": fake.user_name(),
        "user_qq": str(random.randint(10000000, 999999999))
    }
def user():
    # Generate data for all tables
    user_data = [generate_user_data() for _ in range(10)]
    user_base_data = [generate_user_base_data(user["user_id"], user["user_name"]) for user in user_data]
    user_privateinfo_data = [generate_user_privateinfo_data(user["user_id"]) for user in user_data]
    user_connect_data = [generate_user_connect_data(user["user_id"]) for user in user_data]

    data = {
        "User": user_data,
        "User_base": user_base_data,
        "User_privateinformation": user_privateinfo_data,
        "User_Connect": user_connect_data
    }
    from datetime import date

    # Custom serializer to handle date objects

    # Serialize JSON with the custom serializer
    json_data = json.dumps(data, indent=4, default=custom_serializer)
    file_path = "/home/aiscuser/SZU_Alumni/AI/data/user.json"

    with open(file_path, "w") as json_file:
        json_file.write(json_data)
        

def article():
    article_file_path = "/home/aiscuser/SZU_Alumni/AI/data/article.json"
    user_file_path = "/home/aiscuser/SZU_Alumni/AI/data/user.json"
    try:
        with open(user_file_path, "r") as user_file:
            user_data = json.load(user_file)
            user_ids = [user["user_id"] for user in user_data["User"]]  # Extract user IDs from the JSON
    except FileNotFoundError:
        user_ids = []  # If user.json is missing, use an empty list
        raise FileNotFoundError(f"The file {user_file_path} was not found.")


    # Generate 10 articles with valid user_id references
    articles_data_with_users = [generate_article_data_with_user(user_ids) for _ in range(10)]

    # Serialize to JSON
    article_json_data_with_users = json.dumps({"Articles": articles_data_with_users}, indent=4, default=custom_serializer)

    # Save to specified file path
    try:
        with open(article_file_path, "w") as json_file:
            json_file.write(article_json_data_with_users)
        article_file_path
    except Exception as e:
        str(e)

# user()
article()