# from utils import *
# import bcrypt
import oci
import os

def setup_oci():
    config = oci.config.from_file(".oci/config","ADMIN_USER")
    object_storage_client = oci.object_storage.ObjectStorageClient(config)
    return object_storage_client

def get_profile_pic(data):

    '''
    ```
    /get_profile_pic [POST]
    Request:
    {
        user_id: number
    }
    Response:
    {
        status: boolean,

        if status is True:
            
            file_exists: boolean

            if file_exists is True:
                profile_pic_url: string

        else:
            data: string (containing an error message)
    }
    ```
    '''
    object_storage_client = setup_oci()
    try:
        user = data["user_id"]
        extensions = [".jpg", ".jpeg", ".png"]
        for i in extensions:
            image_name = str(user)+"_profile_pic"+i
            profile_pic_objects=object_storage_client.list_objects(namespace_name="bmxazmlclnlu",bucket_name="edu-setu",prefix="profile_pic/" + image_name)
            if(len(profile_pic_objects.data.objects)>0):
                return {"status": True, "file_exists": True, "resume_url":"https://objectstorage.ap-mumbai-1.oraclecloud.com/n/bmxazmlclnlu/b/edu-setu/o/profile_pic/" + image_name}
            else:
                continue
        return {"status": True, "file_exists": False}
    except Exception as e:
        return {"status": False, "data": str(e)}

def upload_profile_pic(request):

    
    '''
    ```
    /upload_image [POST]
    Request: form-data
    {
        image_file: file (type = .jpg or .jpeg or .png),
        user_id: number
    }
    Response:
    {
        status: boolean,

        if status is True:
            data: string (Upload Successful)
        else:
            data: string (containing an error message)
    }
    ```
    '''
    object_storage_client = setup_oci()

    try:
        image_data = request.files['image_file']
        user = request.form.get("user_id")
        check_image_exists = get_profile_pic({"user_id": user})
        if(check_image_exists["status"] == True and check_image_exists["file_exists"] == True):
            url = check_image_exists.resume_url
            file_to_delete = url[url.index(str(user)):]
            delete_object_response = object_storage_client.delete_object("bmxazmlclnlu","edu-setu","profile_pic/"+file_to_delete)

        if('.jpg' in image_data.filename):
            filename = str(user) + "_profile_pic.jpg"
        elif('.jpeg' in image_data.filename):
            filename = str(user) + "_profile_pic.jpeg"
        elif('.png' in image_data.filename):
            filename = str(user) + "_profile_pic.png"
        else:
            return {"status": False, "data": "Unsupported filetype. You should only upload .jpg, .jpeg or .png"}
        obj = object_storage_client.put_object("bmxazmlclnlu","edu-setu","profile_pic/"+filename,image_data)
        return {"status": True, "data": "Upload successful"}
    except Exception as e:
        print(e)
        return {"status": False, "data": str(e)}

def get_resume(data):

    '''
    ```
    /get_resume [POST]
    Request:
    {
        user_id: number
    }
    Response:
    {
        status: boolean,

        if status is True:
            
            file_exists: boolean

            if file_exists is True:
                resume_url: string

        else:
            data: string (containing an error message)
    }
    ```
    '''
    object_storage_client = setup_oci()

    try:
        user = data["user_id"]
        resume_name = str(user)+"_resume.pdf"
        resume_objects=object_storage_client.list_objects(namespace_name="bmxazmlclnlu",bucket_name="edu-setu",prefix="resume/" + resume_name)
        if(len(resume_objects.data.objects)>0):
            return {"status": True, "file_exists": True, "resume_url":"https://objectstorage.ap-mumbai-1.oraclecloud.com/n/bmxazmlclnlu/b/edu-setu/o/resume/" + resume_name}
        else:
            return {"status": True, "file_exists": False}
    except Exception as e:
        return {"status": False, "data": str(e)}

def upload_resume(request):

    
    '''
    ```
    /upload_image [POST]
    Request: form-data
    {
        resume_file: file (type = .pdf),
        user_id: number
    }
    Response:
    {
        status: boolean,

        if status is True:
            data: string (Upload Successful)
        else:
            data: string (containing an error message)
    }
    ```
    '''
    object_storage_client = setup_oci()

    try:
        resume_data = request.files['resume_file']
        user = request.form.get("user_id")
        if('.pdf' in resume_data.filename):
            filename = str(user) + "_resume.pdf"
        else:
            return {"status": False, "data": "Unsupported filetype. You should only upload .pdf"}
        check_resume_exists = get_resume({"user_id": user})
        if(check_resume_exists["status"] == True and check_resume_exists["file_exists"] == True):
            delete_object_response = object_storage_client.delete_object("bmxazmlclnlu","edu-setu","resume/" + filename)
        obj = object_storage_client.put_object("bmxazmlclnlu","edu-setu","resume/"+filename,resume_data)
        return {"status": True, "data": "Upload successful"}
    except Exception as e:
        print(e)
        return {"status": False, "data": str(e)}
        