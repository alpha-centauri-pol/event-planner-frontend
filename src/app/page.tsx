"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const RootRedirectorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loginStatus = searchParams.get('login');
    const userId = searchParams.get('user_id');

    if (loginStatus === 'success' && userId) {
      console.log('Login successful! Storing user ID:', userId);
      
      localStorage.setItem('user_id', userId);
      router.replace('/home');
    }
   
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161616] text-white">
      <p>Loading...</p>
    </div>
  );
};

export default RootRedirectorPage;