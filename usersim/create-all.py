import firebase_admin
from firebase_admin import credentials, firestore

import argparse
import json
import random


random.seed(42)

parser = argparse.ArgumentParser(
                    prog='Nuke Firebase',
                    description='nuke',
                    epilog='🤯')

parser.add_argument("credentials", type=str, help='path to credentials.json')
args = parser.parse_args()


cred = credentials.Certificate(args.credentials)
firebase_admin.initialize_app(cred)


db = firestore.client()

with open("users.json", "r") as f:
    users = json.loads(f.read())["users"]

print(users)
user_ids = []
for user in users:

    u = {
        "name": user["name"],
        "avatar": user["avatar"],
        "location": firestore.GeoPoint(user["latitude"], user["longitude"]),
        "groups": user["groups"],
        "age":user["age"]
    }

    res = db.collection(u'users').add(u)

    print(res[1].id)
    user_ids.append(res[1].id)


# Create groups
with open("groups.json", "r") as f:
    groups = json.loads(f.read())["groups"]

group_ids = []
for group in groups:
    # Randomize members of group
    g = {
        "name": group["name"],
        "users": [],
        "days":[]
    }

    res = db.collection(u'groups').add(g)


    for i in random.sample(user_ids, group["member_count"]):
        db.collection(u'users').document(i).update({
            "groups": firestore.ArrayUnion([res[1].id])
        })


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
        "sharedToGroupIds":[],
        "sharedToUserIds":[],
    }
    if challenge["visibility"] == "group":
        c["sharedToGroupIds"] = random.sample(group_ids, 1)
    elif challenge["visibility"] == "user":
        c["sharedToUserIds"] = random.sample(user_ids, 1)
    
    res = db.collection(u'challenges').add(c)
    print(res[1].id)
    challenge_ids.append(res[1].id)