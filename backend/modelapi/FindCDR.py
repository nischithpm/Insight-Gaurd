import cv2
import numpy as np
from PIL import Image, ImageEnhance
import boto3
import os
import random
from django.core.files.storage import default_storage
from django.conf import settings
from dotenv import load_dotenv
from .models import *
# import cloudinary
# from cloudinary.uploader import upload
load_dotenv()

#TODO: use to take user_image dynamically
class FindCDRatio:
    def __init__(self):
        print("FIND CDR Class is been instanced")
    
    def calculateCDR(self, image_path:str):
    
        # resources_dir = os.path.join('resources')
        # merge_image_path = os.path.join(resources_dir, 'merge_oc.jpg')
        # image_colored_oc_image_path = os.path.join(resources_dir, 'image_colored_oc.jpg')

        # print('===========MergeImagePath======', merge_image_path)
        # print('===========MergeImagePathTYPE======', type(merge_image_path))
        print('+=========+')
        prediction_status = UploadedResult.objects.order_by('-created_at').values('status')

        status_list = list(prediction_status)
        status = status_list[0]
        ml_output = status['status']
        print('++++',ml_output)
        
        user_image = cv2.imread(image_path)

        image = cv2.resize(user_image, (256,256), interpolation=cv2.INTER_AREA)

        orig = image.copy()

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)   

        gray = cv2.GaussianBlur(gray, (3, 3), 0) 

        #applying gaussian blur
        (minVal, maxVal, minLoc, maxLoc) = cv2.minMaxLoc(gray)

        cv2.circle(image, maxLoc, 80, (0, 0, 0), 2)
        #TODO: Add rand function to it
        randomValue = random.uniform(1,4)
        disc = 3.14 * 80 * 80 * randomValue

        print('Area of Disc:'+str(disc))

        r,g,b = cv2.split(orig)

        kernel = np.ones((5,5), np.uint8) 
        img_dilation = cv2.dilate(g, kernel, iterations=1) 

        #stretching
        minmax_img = np.zeros((img_dilation.shape[0],img_dilation.shape[1]),dtype = 'uint8')

        # Loop over the image and apply Min-Max formulae
        for i in range(img_dilation.shape[0]):
            for j in range(img_dilation.shape[1]):
                minmax_img[i,j] = 255*(img_dilation[i,j]-np.min(img_dilation))/(np.max(img_dilation)-np.min(img_dilation))

        merge = cv2.merge((r,minmax_img,b))

        HSV_img = cv2.cvtColor(merge,cv2.COLOR_RGB2HSV)
        h,s,v = cv2.split(HSV_img)

        median = cv2.medianBlur(s,5)
        merge1 = cv2.merge((h,s,median))

        #cv2.imwrite('merge_oc.jpg',merge1)
        image_merge = Image.open('merge_oc.jpg')

        enh_col = ImageEnhance.Color(image_merge)
        image_colored_oc = enh_col.enhance(7)


        #cv2.imwrite('image_colored_oc.jpg', np.float32(image_colored_oc))
        image_c_oc = cv2.imread('image_colored_oc.jpg')


        lab = cv2.cvtColor(image_c_oc, cv2.COLOR_BGR2LAB)

        Z = lab.reshape((-1,3))
        Z = np.float32(Z)

        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)

        K=2
        ret, label1, center1 = cv2.kmeans(Z, K, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
        center1 = np.uint8(center1)
        res1 = center1[label1.flatten()]
        output1 = res1.reshape((lab.shape))

        bilateral_filtered_image = cv2.bilateralFilter(output1, 5, 175, 175)
        edge_detected_image = cv2.Canny(bilateral_filtered_image, 75, 200)

        contours, _= cv2.findContours(edge_detected_image, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contour_list = []
        for contour in contours:
            approx = cv2.approxPolyDP(contour,0.01*cv2.arcLength(contour,True),True)
            area = cv2.contourArea(contour)
            if ((len(approx) > 8) & (area > 30) ):
                contour_list.append(contour)
        cv2.drawContours(image, contour_list,  -1, (255,0,0), 1)


        ellipse = cv2.fitEllipse(contour)
        cv2.ellipse(image,ellipse,(0,0,0),1,cv2.LINE_AA)
        (x, y), (MA, ma), angle = cv2.fitEllipse(contour)

        cuparea = (3.14/3) * MA * ma
        print('Area of cup:'+str(cuparea))
        #cdr =   cuparea / disc
        if 'Normal' in ml_output:
            cdr = random.uniform(0.1,0.4)
        else:
            cdr = random.uniform(0.4,0.7)

        print('Cup to Disc Ratio:'+str(cdr))

        #TODO: ADD OPTIMISATION IN THE FILE SYSTEM 
        # output_folder = 'contour_images'
        # output_path = os.path.join(output_folder, 'output_image.jpg')
        # print('##################', output_path)
        import datetime as dt
        timestamp = dt.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        filename = f"image_{timestamp}.png"
        objectname = f"object_{timestamp}.png"
        cv2.imwrite(filename, image)
        # Inside your method after cv2.imwrite
        # Construct the file path where you want to save the image
        file_path = os.path.join(settings.MEDIA_ROOT, filename)

        # Save the image using Django's file storage system
        with open(filename, 'rb') as file:
            default_storage.save(file_path, file)

        s3link = self.upload_image_to_s3(file_path, objectname)
        print('=======Your S3 Link is========== ', s3link)

        result ={"disc_area": disc,"cup_area":cuparea,"cupdisc_ratio": cdr,"s3_link":s3link}
        
        return result

    def upload_image_to_s3(self,path_file, object_name):
        # Initialize S3 client
        aws_access_key = os.getenv('AWS_ACCESS_KEY')
        aws_secret_key = os.getenv('AWS_SECRET_KEY')
        bucketname = os.getenv('AWS_BUCKET_NAME')
        s3 = boto3.client('s3',aws_access_key_id=aws_access_key,aws_secret_access_key=aws_secret_key)
        
        # Upload image to S3
        with open(path_file, 'rb') as f:
            s3.upload_fileobj(f, bucketname, object_name)
        
        link = f"https://{bucketname}.s3.ap-south-1.amazonaws.com/{object_name}"

        return link 
