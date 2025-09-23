"use client";

import React from 'react';
import { FiEdit } from 'react-icons/fi';

const dummyUser = {
  name: 'Alex Ray',
  email: 'alex.ray@example.com',
};

const dummyInterests = [
  'Web Development', 'AI/ML', 'UI/UX Design', 'Blockchain', 
  'Photography', 'Music Production', 'Cybersecurity', 'Cloud Computing'
];

const ProfileSection = () => {
  const { name, email } = dummyUser;
  const interests = dummyInterests;

  const handleChangeInterests = () => {
    alert('Navigating to the "Change Interests" page!');
  };
  const handleLogout = () => {
    alert('Navigating to the "Change Interests" page!');
  };

  return (
    <div className="w-full max-w-lg rounded-2xl bg-[#1D1C2C] p-4 shadow-xl text-white font-sans">
      <div className="flex items-center gap-5 mb-6">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-400">{email}</p>
        </div>
      </div>
      <div className="border-t border-gray-700/50 my-6"></div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Your Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span key={interest} className="bg-[#312E72] text-[#E0DFFF] text-sm font-medium px-3 py-1.5 rounded-full">
              {interest}
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
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
