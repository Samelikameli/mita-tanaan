import firebase_admin
from firebase_admin import credentials, firestore

import argparse
import json
import random


random.seed(42)

parser = argparse.ArgumentParser(prog="Nuke Firebase", description="nuke", epilog="")

parser.add_argument("credentials", type=str, help="path to credentials.json")
args = parser.parse_args()


cred = credentials.Certificate(args.credentials)
firebase_admin.initialize_app(cred)


db = firestore.client()

with open("users.json", "r") as f:
    users = json.loads(f.read())["users"]

print(users)
user_ids = []
first = True
for user in users:
    u = {
        "name": "demo" if first else user["name"],
        "avatar": user["avatar"],
        "location": firestore.GeoPoint(user["latitude"], user["longitude"]),
        "groups": user["groups"],
        "age": user["age"],
    }

    if first:
        db.collection("users").document("demo").set(u)
        user_ids.append("demo")
    else:
        res = db.collection("users").add(u)
        print(res[1].id)
        user_ids.append(res[1].id)
    first = False
    


# Create groups
with open("groups.json", "r") as f:
    groups = json.loads(f.read())["groups"]

group_ids = []
for group in groups:
    # Randomize members of group
    g = {"name": group["name"], "users": [], "days": [], "avatar": group["avatar"]}

    res = db.collection("groups").add(g)

    for i in random.sample(user_ids, group["member_count"]):
        db.collection("users").document(i).update(
            {"groups": firestore.ArrayUnion([res[1].id])}
        )

    print(res[1].id)
    group_ids.append(res[1].id)

# Create challenges
with open("challenges.json", "r") as f:
    challenges = json.loads(f.read())["challenges"]

challenge_ids = []

for challenge in challenges:
    c = {
        "name": challenge["name"],
        "videoURL": challenge["videoURL"],
        "visibility": challenge["visibility"],
        "sharedToGroupIds": [],
        "sharedToUserIds": [],
    }
    if challenge["visibility"] == "group":
        c["sharedToGroupIds"] = random.sample(group_ids, 1)
    elif challenge["visibility"] == "user":
        c["sharedToUserIds"] = random.sample(user_ids, 1)

    res = db.collection("challenges").add(c)
    print(res[1].id)
    challenge_ids.append(res[1].id)


# Create activities

with open("activities.json", "r") as f:
    activities = json.loads(f.read())["activities"]

{
    "name": "Leikki",
    "description": "Tässä videossa näytetään miten tehdään kuperkeikka",
    "location": {"latitude": 60.199, "longitude": 24.9784},
},

for activity in activities:
    group = random.sample(group_ids, 1)
    user_group_ids = db.collection("users").where("groups", "array_contains", group[0]).get()

    userId = random.sample(user_group_ids, 1)[0].id
    votes = {}
    print(user_ids)
    for i in random.sample(user_ids, 8):
        votes[i] = random.choice(["👍", "🔥", "😂", "💻"])

    a = {
        "userId": userId,
        "description": activity["description"] if "description" in activity else "",
        "location": firestore.GeoPoint(
            activity["location"]["latitude"], activity["location"]["longitude"]
        ),
        "group": group,
        "owner": activity["owner"] if "owner" in activity else None,
        "emoji": activity["emoji"] if "emoji" in activity else None,
        "place": activity["place"] if "place" in activity else None,
        "time": activity["time"] if "time" in activity else None,
        "votes": votes,
        "customTime": activity["customTime"] if "customTime" in activity else None,
        "name": activity["name"] if "name" in activity else None,
        "ongoing": False

    }
    res = db.collection("activities").add(a)
    print(res[1].id)
