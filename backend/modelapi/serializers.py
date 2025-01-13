from rest_framework import serializers
from .models import UploadedImage, UploadedResult,ProcessedImage
from PIL import Image
from pathlib import Path
from .prediction import Predict

class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ('id', 'image', 'uploaded_at')
    
    def validate_image(self, value):
        try:
            img = Image.open(value)
            print(f'Image is of type {value}')
        except Exception as e:
            raise serializers.ValidationError(e)
        
        valid_formats = ['PNG', 'JPEG', 'JPG']
        print('====IMGAGE Format===', img.format)
        if img.format not in valid_formats:
            raise serializers.ValidationError("Only PNG & JPEG formats are supported")
        
        return value
    
    def create(self, validated_data):
        image = validated_data.pop('image')
        instance = UploadedImage.objects.create(image=image, **validated_data)
        saved_image_path = instance.image.path
        saved_image_path_obj = Path(saved_image_path)

        predictor = Predict()  
        result = predictor.prediction(saved_image_path_obj)
        print(f'MODEL PREDICTION RESULT IS => {result}')

        uploaded_result_instance = UploadedResult.objects.create(uploaded_image=instance, status = result)
        print('===== Data Saved to the Uploaded Result Table 🚀 =======')

        return instance
    
class UploadedResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedResult
        fields = ('__all__')
class ProcessedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessedImage
        fields = ('id', 'uploaded_image', 'disc_area','cup_area','cupdisc_ratio','s3_link')
