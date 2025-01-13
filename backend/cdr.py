import os
import cv2
import numpy as np

def img_to_polygons(image):
    cordnt_list = []

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to create a binary image
    _, th2 = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Find contours in the binary image
    contours, _ = cv2.findContours(th2, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)

    # Extract coordinates of white regions
    white_regions_coordinates = []
    for contour in contours:
        coordinates = contour.squeeze().astype(float).tolist()
        white_regions_coordinates.append(coordinates)

    # Print the coordinates of each white region
    for i, region in enumerate(white_regions_coordinates):
        if type(region[0]) is list:
            if len(region) > 2:
                # Calculate the area of the contour
                area = cv2.contourArea(np.around(np.array([[pnt] for pnt in region])).astype(np.int32))
                if area > 100:
                    # Convert coordinates to the required format
                    crdnts = [{'x': i[0], 'y': i[1]} for i in region]
                    cordnt_list.append(crdnts)

    return cordnt_list, th2

# Set the current working directory
path = os.getcwd()

# Define input and output directories
inputdir = os.path.join(path, "input")
outPut_dir = os.path.join(path, 'output')

# Create the output directory if it doesn't exist
os.makedirs(outPut_dir, exist_ok=True)

# List all files in the input directory
files = os.listdir(inputdir)

# Process each file in the input directory
for file in files:
    # Input and output file paths
    fitem = os.path.join(inputdir, file)
    fout = os.path.join(outPut_dir, file)

    # Read the image using OpenCV
    img = cv2.imread(fitem)

    # Extract polygons from the image
    polygons, th2 = img_to_polygons(img)

    # Get the height and width of the image
    height, width = img.shape[:2]

    # Create a black image with the same dimensions as the input
    black_image = np.zeros((height, width, 3), dtype=np.uint8)

    # Draw polygons on the black image
    for ply in polygons:
        ply_list = [[pnt['x'], pnt['y']] for pnt in ply]

        # Define the vertices of the polygon
        vertices = np.array(ply_list, dtype=np.int32)

        # Draw the polygon on the black image
        cv2.polylines(black_image, [vertices], isClosed=True, color=(0, 255, 0), thickness=2)

    # Find contours in the binary image
    contours, _ = cv2.findContours(th2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Check if contours list is not empty
    if contours:  
        # Find the contour representing the outermost region (disc)
        outer_contour = max(contours, key=cv2.contourArea)
        ellipse = cv2.fitEllipse(outer_contour)

        # Draw ellipse for "Disc"
        cv2.ellipse(img, ellipse, (0, 0, 0), 2)  # Dark black ellipse for "Disc"

        # Scale down the major and minor axes to get the ellipse for "Cup"
        (x, y), (major_axis, minor_axis), angle = ellipse
        cup_ellipse = ((x, y), (major_axis * 0.5, minor_axis * 0.5), angle)
        cv2.ellipse(img, cup_ellipse, (0, 0, 0), 2)  # Dark black ellipse for "Cup"

    # Save the output image with ellipses drawn
    cv2.imwrite(fout, img)
