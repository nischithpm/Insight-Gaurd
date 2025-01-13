import React, { useState } from 'react';
import axios from 'axios';
import LoaderIcon from './LoaderIcon/Loader';

const ImageUploadComponent = ({ backendUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      setIsLoading(true); // Start loading
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const response = await axios.post(`${backendUrl}/api/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload successful:', response.data);
        setUploadStatus('success');
        setErrorMessage(null); // Clear any previous error messages

        // Extract the image ID from the response
        const imageId = response.data.id;
        // Now make a GET request to fetch the result for the uploaded image
        const resultResponse = await axios.get(`${backendUrl}/api/result/${imageId}/`);
        console.log('Result:', resultResponse.data);
        setResultData(resultResponse.data);
      } catch (error) {
        console.error('Error uploading image:', error);
        if (error.response && error.response.data) {
          // If error response contains data, extract the message
          const errorMessage = error.response.data.image[0]; // Assuming the error message is in "image" field
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage('Error uploading image. Please try again.');
        }
        setUploadStatus('error');
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <div className="md:col-span-2 text-center">
          <p className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Try our Eye Testing Below !!!</p>
          <input type="file" accept="image/*" onChange={handleImageChange} className="md:col-span-2 mb-4 mx-auto appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4" />
          <button onClick={handleUpload} className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 py-3">
            Upload Image
          </button>
        </div>

        {uploadStatus === 'success' && (
          <div className="md:col-span-2 text-green-600 text-center md:text-2xl sm:text-2xl text-xl font-semibold py-2">File uploaded successfully!</div>
        )}

        {uploadStatus === 'error' && (
          <div className="md:col-span-2 text-red-600 text-center md:text-xl sm:text-2xl text-xl font-bold py-2">{errorMessage}</div>
        )}

        {/* Conditionally render loader icon when uploading */}
        {isLoading && (
          <div className="md:col-span-2 text-center">
            <LoaderIcon />
          </div>
        )}

        {!isLoading && resultData && (
          <div className="md:col-span-2">
            <h3 className="text-center mb-4">Result for Uploaded Image</h3>
            <p className='text-center mb-4'>Status: {resultData.status}</p>
            {/* Display additional result data as needed */}
          </div>
        )}
      </div>
    </div>
  );

};

export default ImageUploadComponent;


//CLIENT ID: 830534639173-5dq481qkrm457r2m6epos7g9gna1n3ou.apps.googleusercontent.com
//CLIENT SECRET: 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