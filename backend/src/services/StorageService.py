import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from dotenv import load_dotenv
import os

load_dotenv()
cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred, {'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET')})

class StorageService:
    
    @classmethod
    def upload_file(cls, file_path):
        bucket = storage.bucket() # storage bucket
        blob = bucket.blob('images/'+file_path)
        blob.upload_from_filename(file_path)
    
    @classmethod
    def delete_file(cls, filename):
        bucket = firebase_admin.storage.bucket()
        blob = bucket.blob(filename)
        blob.delete()


if __name__ == '__main__':
    print(os.getenv('FIREBASE_STORAGE_BUCKET'))
    try:
        StorageService.upload_file('hola.txt')
    except Exception as e:
        print(e)