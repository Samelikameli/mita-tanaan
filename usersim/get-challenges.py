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

# All users
users_ref = db.collection(u'users')
docs = users_ref.stream()
users = {}
for doc in docs:
    users[doc.id] = doc.to_dict()

# Query all challenges visible to user

for user in users:
    data = users[user]

    # Query: visibility = public OR sharedToUserId = user OR sharedToGroupId in user.groups
    public = db.collection(u'challenges').where(u'visibility', u'==', u'public').get()

    sharedToUserId = db.collection(u'challenges').where(u'sharedToUserIds', u'array_contains', user).get()

    if "groups" in data:
        for group in data["groups"]:
            sharedToGroupId = db.collection(u'challenges').where(u'sharedToGroupIds', u'array_contains', group).get()

    print(user)
    print(public, sharedToUserId, sharedToGroupId)