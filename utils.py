import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

# Load the model
model = tf.keras.models.load_model('glau_Experimental.h5')
print("======Model loaded Successfully 🚀=====")

# Load and preprocess the test image
img_path = 'glau.png'
img = image.load_img(img_path, target_size=(256, 256))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
resized_img = tf.image.resize(img_array, (256, 256))

# Perform prediction
result = model.predict(resized_img / 255.0)
print(result)

if result < 0.5:
    print(f'Predicted class is Glaucoma')
else:
    print(f'Predicted class is Normal')
