"use client";

import React from 'react';
import { FcGoogle } from "react-icons/fc"; 

const LoginPage = () => {
  const backendUrl = 'https://event-tracker-v2.onrender.com';

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/google/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161616] text-white p-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[#1D1C2C] rounded-2xl border-2 border-[#5D59AD]">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-gray-400 mt-2">Sign in to manage your events.</p>
        </div>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold text-white bg-[#312E72] rounded-lg hover:bg-[#4844A2] transition-colors duration-300"
        >
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>

        <p className="text-xs text-center text-gray-500">
          By signing in, you will be redirected to Google to authenticate.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
