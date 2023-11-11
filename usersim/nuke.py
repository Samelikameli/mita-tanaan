import firebase_admin
from firebase_admin import credentials, firestore

import argparse

parser = argparse.ArgumentParser(
                    prog='Nuke Firebase',
                    description='nuke',
                    epilog='🤯')

parser.add_argument("credentials", type=str, help='path to credentials.json')
args = parser.parse_args()


cred = credentials.Certificate(args.credentials)
firebase_admin.initialize_app(cred)

# Get a database reference to our users
db = firestore.client()
users_ref = db.collection(u'users')
docs = users_ref.stream()
# Delete all users
for doc in docs:
    doc.reference.delete()


groups_ref = db.collection(u'groups')
docs = groups_ref.stream()
# Delete all groups
for doc in docs:
    doc.reference.delete()