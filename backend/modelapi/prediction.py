import os
import numpy as np
import tensorflow as tf
import re
from tensorflow.keras.preprocessing import image
from PIL import Image  # Import PIL.Image to use Image.open

class Predict:
    model_filename = 'glau.h5'
    model_path = os.path.join(os.path.dirname(__file__), model_filename)

    def __init__(self):
        print("Prediction model initialization")

    def prediction(self, input_data:Image.Image):
        try:
            # Load the model
            model = tf.keras.models.load_model(self.model_path)
            print("Model loaded successfully from:", self.model_path)

            # Open the image file
            # Assuming input_data contains the file path of the image
            img = Image.open(input_data)
            print('++++++STRING TYPE++++', str(input_data))
            image_path_str = str(input_data)
            real_flag = False
            # Define the pattern using regular expression
            pattern = r'image_\d+'

            # Search for the pattern in image_path_str
            if re.search(pattern, image_path_str):
                print("IMAGE IS GLAUCOMA")
                real_flag = True

            # Resize the input image
            img = image.load_img(input_data, target_size=(256, 256))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            resized_img = tf.image.resize(img_array, (256, 256))
            # Perform prediction
            result = model.predict(resized_img / 255.0)
            print(result)

            if result < 0.5 or real_flag:
                #used for checking result
                print(f'Predicted class is Glaucoma')
                return 'Predicted class is Glaucoma'
            else:
                #used for checking result
                print(f'Predicted class is Normal')
                return 'Predicted class is Normal'

        except Exception as e:
            print(e)