import React, { useState } from 'react';
import LoaderIcon from './LoaderIcon/Loader';
import axios from 'axios';

const ImageProcessingComponent = ({ backendUrl }) => {
  const [postResponse, setPostResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const handlePostClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${backendUrl}/api/image-process/`);
      setPostResponse(response.data.status);
    } catch (error) {
      console.error('Error posting image:', error);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="text-center bg-gray-300 pb-16 border-b-0 pt-16">
      <button onClick={handlePostClick} className="bg-black text-[#00df9a] rounded-md font-medium py-3 px-6 mb-4 inline-block">Calculate CDR Ratio</button>
      {
        isLoading &&(
          <div className="md:col-span-2 text-center">
          <LoaderIcon />
        </div>
        )
      }
      {postResponse && !isLoading &&(
        <div className="text-gray-950">
          <h3 className="mb-2">Your Cup Disc Ratio Stats:</h3>
          <ul className="list-disc text-center text-lg font-semibold">
            <li>ID: {postResponse.id}</li>
            <li>Uploaded Image: {postResponse.uploaded_image}</li>
            <li>Disc Area: {postResponse.disc_area}</li>
            <li>Cup Area: {postResponse.cup_area}</li>
            <li>Cup/Disc Ratio: {postResponse.cupdisc_ratio}</li>
          </ul>
          <img src={postResponse.s3_link} alt="Processed Image" className="mt-4 mx-auto" />
        </div>
      )}
    </div>
  );
  
    
};


export default ImageProcessingComponent;


// Disc Area: 20096

// Cup Area: 7095.574941871676

// Cup/Disc Ratio: 0.3530839441616081