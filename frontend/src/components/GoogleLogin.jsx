import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v1/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        setUserInfo(res.data); // store user info
        setIsLoggedIn(true); // update login status
      } catch (error) {
        console.log(error);
      }
    },
  });

  const logout = () => {
    setIsLoggedIn(false); // update login status
    setUserInfo(null); // clear user info
  };

  return (
    <div className='flex justify-end m-4'>
      {!isLoggedIn ? (
        <button onClick={login} className='bg-white p-3 border-solid rounded'>
          Sign in with Google 🚀
        </button>
      ) : (
        <div className='bg-white'>
          <p className='font-bold'>Welcome, {userInfo ? userInfo.name : 'User'}!</p>
          <button onClick={logout} className='bg-slate-500 p-3'>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginComponent;
