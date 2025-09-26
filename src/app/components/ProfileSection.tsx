"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import { fetchProfile, logoutUser } from '../lib/api';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
  interests: { 
    id: string; 
    category: string; 
    child: string; 
  }[];
  custom_interests?: { 
    id: string; 
    name: string; 
  }[];
}

const ProfileSection = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchProfile();
        setUser(response); 
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [router]);

  const handleChangeInterests = () => {
    router.push('/interests');
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed but redirecting anyway.", error);
    } finally {
      window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-lg rounded-2xl bg-[#1D1C2C] p-6 shadow-xl text-white font-sans animate-pulse">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-700"></div>
          <div>
            <div className="h-8 w-32 bg-gray-700 rounded"></div>
            <div className="h-5 w-48 bg-gray-700 rounded mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-lg rounded-2xl bg-[#1D1C2C] p-6 shadow-xl text-white font-sans">
      <div className="flex items-center gap-5 mb-6">
        <img 
          src={user.picture} 
          alt="User Avatar" 
          className="w-20 h-20 rounded-full border-2 border-[#A6A2FF]"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="border-t border-gray-700/50 my-6"></div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-[#E0DFFF]">Your Interests</h3>
        <div className="flex flex-wrap gap-2 overflow-auto max-h-40 pr-2">
          {user.interests.map((interest) => (
            <span key={interest.id} className="bg-[#312E72] text-[#E0DFFF] text-sm font-medium px-3 py-1.5 rounded-full">
              {interest.child}
            </span>
          ))}
          {user.custom_interests?.map((interest) => (
            <span key={interest.id} className="bg-[#4a486d] text-[#E0DFFF] text-sm font-medium px-3 py-1.5 rounded-full">
              {interest.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4 border-t border-gray-700/50 pt-6">
        <button
          onClick={handleChangeInterests}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-white bg-[#5D59AD] rounded-lg hover:bg-[#4844A2] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1D1C2C] focus:ring-[#A6A2FF]"
        >
          <FiEdit />
          <span>Change Interests</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold text-[#E0DFFF] bg-transparent rounded-lg border-2 border-[#5D59AD] hover:bg-[#5D59AD]/20 hover:border-[#A6A2FF] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1D1C2C] focus:ring-[#A6A2FF]"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;