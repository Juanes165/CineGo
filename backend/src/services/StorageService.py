import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import os

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred, {'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET')})

class StorageService:
    
    @classmethod
    def upload_file(cls, file, filename):
        bucket = storage.bucket()
        blob = bucket.blob('images/' + filename)
        blob.upload_from_file(file, content_type=file.content_type)
        blob.make_public()
        return blob.public_url
    

    @classmethod
    def get_file_url(cls, filename):
        bucket = storage.bucket()
        blob = bucket.blob(filename)
        return blob.public_url
    
    
    @classmethod
    def delete_file(cls, filename):
        bucket = storage.bucket()
        blob = bucket.blob(filename)
        blob.delete()
