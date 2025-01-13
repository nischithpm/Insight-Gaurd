from django.urls import path
from . import views

urlpatterns = [
    path('hello-world', views.HelloWorldView.as_view(), name='HelloWorldView'),
    path('upload/', views.UploadImageView.as_view(), name='upload_image'),
    path('result/<int:image_id>/', views.UploadedResultAPIView.as_view(),name='prediction_result'),
    path('image-process/', views.ImageProcessingView.as_view(), name='ImageProcessingView'),
    path('latest-image/', views.LatestUploadedImageView.as_view(), name='latest_uploaded_image')
] 