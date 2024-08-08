import os
from firebase_admin import credentials, firestore
import firebase_admin
from pprint import pprint

cred = credentials.Certificate("firebase.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

collection_name = db.collection('users')  #수정하고싶은 문서 이름
docs = collection_name.stream()

for doc in docs:
    doc_id = doc.id
    data = doc.to_dict()
    data['posts'] = []
    collection_name.document(doc_id).update(data)

# updated_docs = collection_name.stream()
# updated_users = []
# for doc in updated_docs:
#     updated_users.append({**doc.to_dict(), "id": doc.id})

# from pprint import pprint
# pprint(updated_users)